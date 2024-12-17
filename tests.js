// Variables globales
let asignaturas = [];
let asignaturaActual = null;
let preguntasSeleccionadas = [];

// Función para cargar las asignaturas disponibles
function cargarAsignaturas() {
    fetch('tests/asignaturas.json')
        .then(response => response.json())
        .then(data => {
            asignaturas = data;
            const select = document.getElementById('asignatura-select');
            select.innerHTML = '<option value="">Selecciona una asignatura</option>';
            asignaturas.forEach(asignatura => {
                const option = document.createElement('option');
                option.value = asignatura;
                option.textContent = asignatura;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar asignaturas:', error));
}

// Función para cargar los temas de una asignatura
function cargarTemas(asignatura) {
    const nombreArchivo = asignatura.toLowerCase()
    fetch(`tests/${nombreArchivo}.json`)
        .then(response => response.json())
        .then(data => {
            asignaturaActual = data;
            const temasContainer = document.getElementById('temas-container');
            temasContainer.innerHTML = ''; // Limpiar temas anteriores

            // Iterar sobre los temas de la asignatura
            Object.keys(data.temas).forEach(nombreTema => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `tema-${nombreTema}`;
                checkbox.value = nombreTema;

                const label = document.createElement('label');
                label.htmlFor = `tema-${nombreTema}`;
                label.textContent = nombreTema;

                const div = document.createElement('div');
                div.className = 'tema-checkbox';
                div.appendChild(checkbox);
                div.appendChild(label);

                temasContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al cargar temas:', error);
            alert(`No se pudieron cargar los temas para la asignatura ${asignatura}`);
        });
}

// Función para generar el test
function generarTest() {
    const temasSeleccionados = Array.from(document.querySelectorAll('#temas-container input:checked')).map(cb => cb.value);
    const numPreguntas = parseInt(document.getElementById('num-preguntas').value);

    if (temasSeleccionados.length === 0 || isNaN(numPreguntas) || numPreguntas <= 0) {
        alert('Por favor, selecciona al menos un tema y especifica un número válido de preguntas.');
        return;
    }

    let todasLasPreguntas = [];
    temasSeleccionados.forEach(tema => {
        todasLasPreguntas = todasLasPreguntas.concat(asignaturaActual.temas[tema].preguntas);
    });

    // Determinar cuántas preguntas seleccionar
    const totalPreguntasASeleccionar = Math.min(numPreguntas, todasLasPreguntas.length);
    
    // Seleccionar preguntas aleatorias según la cantidad determinada
    preguntasSeleccionadas = seleccionarPreguntasAleatorias(todasLasPreguntas, totalPreguntasASeleccionar);

    // Mostrar el test generado
    mostrarTest(preguntasSeleccionadas);
}

// Función para seleccionar preguntas aleatorias sin repetición
function seleccionarPreguntasAleatorias(preguntas, n) {
    const shuffled = [...preguntas];
    
    // Usar Fisher-Yates shuffle para mezclar las preguntas
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, n); // Devuelve solo las n preguntas seleccionadas
}


// Función para mostrar el test generado
function mostrarTest(preguntas) {
    const testContainer = document.getElementById('test-container');
    testContainer.innerHTML = '';
    preguntas.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta';
        preguntaDiv.innerHTML = `<p><strong>Pregunta ${index + 1}:</strong> ${pregunta.enunciado}</p>`;
        
        const opcionesDiv = document.createElement('div');
        opcionesDiv.className = 'opciones';
        
        const opciones = [...pregunta.opciones, pregunta.solucion];
        opciones.sort(() => 0.5 - Math.random());

        opciones.forEach(opcion => {
            const opcionDiv = document.createElement('div');
            opcionDiv.className = 'opcion';
            opcionDiv.innerHTML = `
                <input type="radio" name="pregunta${index}" value="${opcion}">
                <label>${opcion}</label>
            `;
            opcionesDiv.appendChild(opcionDiv);
        });

        preguntaDiv.appendChild(opcionesDiv);
        testContainer.appendChild(preguntaDiv);
    });
}

// Función para corregir el test
function corregirTest() {
    const preguntas = preguntasSeleccionadas;
    let aciertos = 0;
    let fallos = 0;
    let sinContestar = 0;

    preguntas.forEach((pregunta, index) => {
        const opciones = document.getElementsByName(`pregunta${index}`);
        let contestada = false;
        opciones.forEach(opcion => {
            if (opcion.checked) {
                contestada = true;
                if (opcion.value === pregunta.solucion) {
                    aciertos++;
                    opcion.nextElementSibling.style.color = 'green'; // Marca la opción correcta en verde
                } else {
                    fallos++;
                    opcion.nextElementSibling.style.color = 'red'; // Marca la opción incorrecta en rojo
                    // Marca la opción correcta en verde
                    opciones.forEach(op => {
                        if (op.value === pregunta.solucion) {
                            op.nextElementSibling.style.color = 'green';
                        }
                    });
                }
            }
        });
        if (!contestada) {
            sinContestar++;
        }
    });

    // Mostrar resultados
    const resultadosDiv = document.createElement('div');
    resultadosDiv.innerHTML = `
        <p>Aciertos: ${aciertos}</p>
        <p>Fallos: ${fallos}</p>
        <p>Sin contestar: ${sinContestar}</p>
    `;
    document.getElementById('test-container').appendChild(resultadosDiv);
}

// Función para terminar el test
function terminarTest() {
    // Limpiar el contenedor del test
    const testContainer = document.getElementById('test-container');
    testContainer.innerHTML = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', cargarAsignaturas);
document.getElementById('asignatura-select').addEventListener('change', (e) => cargarTemas(e.target.value));
document.getElementById('generar-test').addEventListener('click', generarTest);
document.getElementById('corregir-test').addEventListener('click', corregirTest);
document.getElementById('terminar-test').addEventListener('click', terminarTest);
