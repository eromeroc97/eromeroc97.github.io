import json
from collections import defaultdict
import os
import sys

if len(sys.argv) != 2:
    print("Usage: python find_duplicates.py <json_file>")
    sys.exit(1)

input_file = sys.argv[1]

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Navigate to preguntas list
preguntas = []
try:
    temas = data.get('temas', {})
    for tema_name, tema in temas.items():
        preguntas.extend(tema.get('preguntas', []))
except Exception:
    pass

def canonicalize_question(q: dict) -> str:
    """Return a canonical JSON string for a question dict ignoring the 'imagen' field.
    The serialization uses sorted keys so equal content maps to same string.
    """
    # create a shallow copy excluding 'imagen'
    obj = {k: v for k, v in q.items() if k != 'imagen'}
    # If opciones exists and is a list, sort it so order of options doesn't affect equality
    if 'opciones' in obj and isinstance(obj['opciones'], list):
        try:
            # sort preserving duplicates; convert items to strings for consistent ordering
            obj['opciones'] = sorted([str(x) for x in obj['opciones']])
        except Exception:
            # fallback: leave as-is if not sortable
            pass
    # To ensure deterministic representation, sort keys when dumping
    return json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(',', ':'))

index_by_canon = defaultdict(list)
for i, p in enumerate(preguntas):
    key = canonicalize_question(p)
    index_by_canon[key].append((i, p))

# collect duplicates where the canonicalized object appears more than once
dups = {k: v for k, v in index_by_canon.items() if len(v) > 1}

# prepare report
report = {
    'object_duplicates': [],
    'unique_objects': len(index_by_canon),
    'total_original_questions': len(preguntas)
}

for k, items in dups.items():
    # parse canonical JSON back to a python object for display
    obj = json.loads(k)
    report['object_duplicates'].append({
        'object_without_imagen': obj,
        'occurrences': len(items),
        'indices': [idx for idx, _ in items],
        # include a small sample of the original objects (with imagen if present)
        'examples': [it for _, it in items]
    })

# write report
base = os.path.splitext(os.path.basename(input_file))[0]
out_dir = os.path.dirname(input_file) or os.getcwd()
OUT = os.path.join(out_dir, f"{base}.duplicates.report.json")
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

# produce deduped JSON keeping first occurrence per canonical object within each tema
new_data = {'nombre': data.get('nombre'), 'temas': {}}
for tema_name, tema in data.get('temas', {}).items():
    preguntas = tema.get('preguntas', [])
    seen = set()
    new_preguntas = []
    for p in preguntas:
        key = canonicalize_question(p)
        if key not in seen:
            seen.add(key)
            new_preguntas.append(p)
    new_tema = dict(tema)
    new_tema['preguntas'] = new_preguntas
    new_data['temas'][tema_name] = new_tema

OUT2 = os.path.join(out_dir, f"{base}.dedup.json")
with open(OUT2, 'w', encoding='utf-8') as f:
    json.dump(new_data, f, indent=2, ensure_ascii=False)

print('Report written to:', OUT)
print('Deduplicated JSON written to:', OUT2)
