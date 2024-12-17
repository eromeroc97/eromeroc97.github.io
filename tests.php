<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test de Asignaturas</title>
    <link rel="icon" href="test.ico" type="image/x-icon"> <!-- Añadir favicon -->
    <link rel="stylesheet" href="tests.css">
</head>
<body>
    <div id="last-update">
        Última actualización: <?php include 'last_update.php'; ?>
    </div>

    <div class="container">
        <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" />
                <div class="slider round"></div>
            </label>
            <em>Cambiar tema</em>
        </div>
        <h1>Test de Asignaturas</h1>
        <div class="selector-container">
            <select id="asignatura-select">
                <option value="">Selecciona una asignatura</option>
                <!-- Las opciones se cargarán dinámicamente con JavaScript -->
            </select>
            <div id="temas-container">
                <!-- Los checkboxes de temas se cargarán dinámicamente -->
            </div>
            <input type="number" id="num-preguntas" min="1" value="10" placeholder="Número de preguntas">
            <button id="generar-test">Generar Test</button>
        </div>
        <div id="test-container">
            <!-- Aquí se generará el test dinámicamente -->
        </div>
    </div>

    <script src="test_theme.js"></script>
    <script src="tests.js"></script>

</body>
</html>
