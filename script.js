let registros = [];

function guardarRegistro(event) {
  event.preventDefault();

  const form = document.getElementById("medicalForm");

  if (!form.checkValidity()) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const rut = document.getElementById("rut").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const comentarios = sanitizeInput(
    document.getElementById("comentarios").value
  );

  // Validación RUT (formato simple)
  const rutRegex = /^\d{7,8}-[kK\d]$/;
  if (!rutRegex.test(rut)) {
    alert(
      "El RUT ingresado no es válido. Formato esperado: 12345678-9 o 12345678-K."
    );
    return;
  }

  // Validación teléfono
  const telefonoRegex = /^\d{7,15}$/;
  if (!telefonoRegex.test(telefono)) {
    alert("El teléfono debe contener solo números (7 a 15 dígitos).");
    return;
  }

  let existe = registros.some((registro) => registro.rut === rut);

  if (existe) {
    if (confirm("El registro ya existe, ¿desea sobrescribirlo?")) {
      registros = registros.map((registro) => {
        if (registro.rut === rut) {
          return {
            rut,
            nombres,
            apellidos,
            direccion,
            ciudad,
            telefono,
            email,
            fechaNacimiento,
            estadoCivil,
            comentarios,
          };
        }
        return registro;
      });
      alert("Registro actualizado correctamente.");
    }
  } else {
    registros.push({
      rut,
      nombres,
      apellidos,
      direccion,
      ciudad,
      telefono,
      email,
      fechaNacimiento,
      estadoCivil,
      comentarios,
    });
    alert("Registro guardado correctamente.");
  }

  form.reset();
}

function buscarPorApellido() {
  const apellidoBusqueda = document
    .getElementById("buscarApellido")
    .value.trim()
    .toLowerCase();
  const resultadosBusqueda = document.getElementById("resultadosBusqueda");
  resultadosBusqueda.innerHTML = "";

  if (!apellidoBusqueda) {
    alert("Por favor ingrese un apellido para buscar.");
    return;
  }

  const resultados = registros.filter((registro) =>
    registro.apellidos.toLowerCase().includes(apellidoBusqueda)
  );

  if (resultados.length > 0) {
    resultados.forEach((registro) => {
      const li = document.createElement("li");
      li.textContent = `RUT: ${registro.rut}, Nombres: ${registro.nombres}, Apellidos: ${registro.apellidos}`;
      resultadosBusqueda.appendChild(li);
    });
  } else {
    resultadosBusqueda.innerHTML = "<li>No se encontraron resultados.</li>";
  }
}

function cerrarFormulario() {
  if (confirm("¿Desea cerrar el formulario?")) {
    window.close();
  }
}

// Sanitiza texto para prevenir XSS
function sanitizeInput(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
