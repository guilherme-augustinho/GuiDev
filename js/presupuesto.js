
document.addEventListener("DOMContentLoaded", function () {
  // Referências
  const form = document.querySelector("form");
  const producto = document.getElementById("producto");
  const extras = document.querySelectorAll("input[name='extras[]']");
  const plazo = document.getElementById("plazo");
  const resultado = document.getElementById("presupuesto");

  // Precios base
  const preciosBase = {
    "Desarrollo Web": 500,
    "Aplicaciones Web": 700,
    "Mantenimiento y soporte técnico": 300
  };

  const precioExtra = 50; // cada extra
  const precioPorMes = 20; // valor extra por mes

  // Validación del formulario
  function validarFormulario(evento) {
    evento.preventDefault(); // Evita el envío si hay errores

    let mensajes = '';
    let ok = true;

    // Expresiones regulares (no aceptan números)
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/;
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
    const regexTelefono = /^[0-9]{9}$/;
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    // Obtener los valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validar nombre
    if (!regexNombre.test(nombre)) {
      ok = false;
      mensajes += 'El nombre solo puede contener letras y hasta 15 caracteres.\n';
    }

    // Validar apellidos
    if (!regexApellidos.test(apellidos)) {
      ok = false;
      mensajes += 'Los apellidos solo pueden contener letras y hasta 40 caracteres.\n';
    }

    // Validar teléfono
    if (!regexTelefono.test(telefono)) {
      ok = false;
      mensajes += 'El teléfono debe contener exactamente 9 dígitos numéricos.\n';
    }

    // Validar email
    if (!regexEmail.test(email)) {
      ok = false;
      mensajes += 'El correo electrónico no es válido.\n';
    }

    // Mostrar errores o enviar
    if (ok) {
      form.submit();
    } else {
      alert(mensajes);
      return false;
    }
  }

  // Calcular presupuesto
  function calcularPresupuesto() {
    const productoSeleccionado = producto.value;
    const precioBase = preciosBase[productoSeleccionado] || 0;

    let total = precioBase;

    // Sumar extras
    extras.forEach(extra => {
      if (extra.checked) {
        total += precioExtra;
      }
    });

    // Sumar por mes
    const meses = parseInt(plazo.value);
    if (!isNaN(meses) && meses > 0) {
      total += meses * precioPorMes;
    }

    // Mostrar resultado
    resultado.value = `€${total.toFixed(2)}`;
  }

  // Asociar eventos
  form.addEventListener("submit", validarFormulario);
  producto.addEventListener("change", calcularPresupuesto);
  extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));
  plazo.addEventListener("input", calcularPresupuesto);
});

