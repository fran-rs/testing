let registros = [];

function guardarRegistro() {
  const rut = document.getElementById("rut").value;
  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const direccion = document.getElementById("direccion").value;
  const ciudad = document.getElementById("ciudad").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const comentarios = document.getElementById("comentarios").value;

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

  document.getElementById("medicalForm").reset();
}

function buscarPorApellido() {
  const apellidoBusqueda = document
    .getElementById("buscarApellido")
    .value.trim()
    .toLowerCase();

  if (!apellidoBusqueda) {
    alert("Por favor ingrese un apellido para buscar.");
    return;
  }

  const resultados = registros.filter((registro) =>
    registro.apellidos.toLowerCase().includes(apellidoBusqueda)
  );
  const resultadosBusqueda = document.getElementById("resultadosBusqueda");
  resultadosBusqueda.innerHTML = "";

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
