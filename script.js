let registros = [];

// Función para guardar un nuevo registro
function guardarRegistro() {
    const rut = document.getElementById('rut').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const estadoCivil = document.getElementById('estadoCivil').value;
    const comentarios = document.getElementById('comentarios').value;

    // Verificar si el RUT ya existe
    let existe = registros.some(registro => registro.rut === rut);

    if (existe) {
        // Preguntar si desea sobrescribir el registro
        if (confirm("El registro ya existe, ¿desea sobrescribirlo?")) {
            // Actualizar el registro
            registros = registros.map(registro => {
                if (registro.rut === rut) {
                    return { rut, nombres, apellidos, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil, comentarios };
                }
                return registro;
            });
            alert("Registro actualizado correctamente.");
        }
    } else {
        // Guardar el nuevo registro
        registros.push({ rut, nombres, apellidos, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil, comentarios });
        alert("Registro guardado correctamente.");
    }

    // Limpiar el formulario
    document.getElementById('medicalForm').reset();
}

// Función para buscar por apellido
function buscarPorApellido() {
    const apellidoBusqueda = document.getElementById('buscarApellido').value.trim().toLowerCase();

    if (!apellidoBusqueda) {
        alert("Por favor ingrese un apellido para buscar.");
        return;
    }

    // Filtrar los registros por apellido
    const resultados = registros.filter(registro => registro.apellidos.toLowerCase().includes(apellidoBusqueda));

    // Mostrar los resultados en una lista
    const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    resultadosBusqueda.innerHTML = "";  // Limpiar resultados previos

    if (resultados.length > 0) {
        resultados.forEach(registro => {
            const li = document.createElement('li');
            li.textContent = `RUT: ${registro.rut}, Nombres: ${registro.nombres}, Apellidos: ${registro.apellidos}`;
            resultadosBusqueda.appendChild(li);
        });
    } else {
        resultadosBusqueda.innerHTML = "<li>No se encontraron resultados.</li>";
    }
}

// Función para cerrar el formulario
function cerrarFormulario() {
    if (confirm("¿Desea cerrar el formulario?")) {
        window.close();
    }
}
