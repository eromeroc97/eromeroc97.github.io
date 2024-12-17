async function obtenerArchivoMasReciente() {
    try {
        // Permitir al usuario seleccionar una carpeta
        const directorio = await window.showDirectoryPicker();
        let archivoMasReciente = null;

        // Iterar sobre los archivos en el directorio
        for await (const entrada of directorio.values()) {
            if (entrada.kind === 'file') {
                const archivo = await entrada.getFile();
                
                // Comparar fechas de modificación
                if (!archivoMasReciente || archivo.lastModified > archivoMasReciente.lastModified) {
                    archivoMasReciente = archivo;
                }
            }
        }

        // Mostrar la fecha de última modificación
        if (archivoMasReciente) {
            const fecha = new Date(archivoMasReciente.lastModified);
            const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            document.getElementById('last-update').textContent = `Última actualización del archivo más reciente: ${fechaFormateada}`;
        } else {
            document.getElementById('last-update').textContent = "No se encontraron archivos en la carpeta seleccionada.";
        }
    } catch (error) {
        console.error('Error al acceder a los archivos:', error);
    }
}

// Llamar a la función cuando se carga la página
window.onload = obtenerArchivoMasReciente;
