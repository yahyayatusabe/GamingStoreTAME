function CerrarSesion() {
    // Eliminar la cookie de JWT
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Redirigir al usuario a la página de inicio
    document.location.href = "/";
}
// Función para obtener los nombres de los productos existentes
async function obtenerNombresProductos() {
    try {
        const response = await fetch('/productos');
        if (response.ok) {
            const data = await response.json();
            return data.map(producto => producto.nombre);
        } else {
            console.error('Error al obtener los nombres de los productos');
            return [];
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return [];
    }
}


var label = document.getElementsByTagName('label');
var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('blur', function(e) {
    hasValue(e.target);
  });
}
//Funcion dinamica del formulario fucsia
function hasValue(el) {
  var inpPos = el.getAttribute('data-inp');
  if (el.value.trim() && label[inpPos].className.indexOf('has_value') < 0) {
    label[inpPos].className += 'has_value';
    el.className += 'inp_hasvalue';
  }
  if (!el.value.trim()) {
    label[inpPos].className = label[inpPos].className.replace(/has_value/, '');
    el.className = el.className.replace(/inp_hasvalue/, '');
  }
}

document.getElementById('urlimagen').addEventListener('change', function() {
    var imageUrl = this.value;
    var imageDiv = document.querySelector('.image');
    imageDiv.style.backgroundImage = 'url(' + imageUrl + ')';
});
//Validacion input nombre
document.getElementById('nombre').addEventListener('blur', function() {
    var nombreInput = this;
    var nombreValue = nombreInput.value.trim(); // Eliminar espacios en blanco al principio y al final

    // Validar longitud mínima y caracteres especiales
    if (nombreValue.length < 3 || nombreValue.length > 45 || !/^[a-zA-Z0-9 ]+$/.test(nombreValue)) {
        alert("El nombre debe tener entre 3 y 45 caracteres y no debe contener caracteres especiales.");
        nombreInput.value = ''; // Limpiar el valor del input
        return;
    }

    // Eliminar espacios en blanco adicionales después del nombre
    nombreInput.value = nombreValue.replace(/\s+/g, ' ');
});

//Validacion input precio
//Validacion input precio
document.getElementById('precio').addEventListener('input', function() {
    var precioInput = this;
    var precioValue = precioInput.value;

    // Validar si el valor es un número
    var parsedValue = parseFloat(precioValue);
    if (isNaN(parsedValue)) {
        alert("El precio debe ser un número válido.");
        precioInput.value = ''; // Limpiar el valor del input
        return;
    }

    // Validar si es un número positivo
    if (parsedValue < 0) {
        alert("El precio no puede ser un número negativo.");
        precioInput.value = ''; // Limpiar el valor del input
        return;
    }

    // Validar la longitud máxima del número antes del punto decimal
    var parts = precioValue.split('.');
    var integerPart = parts[0];
    if (integerPart.length > 10) {
        alert("El precio debe tener un máximo de 10 dígitos antes del punto decimal.");
        precioInput.value = ''; // Limpiar el valor del input
        return;
    }
});


//Validacion input url
document.getElementById('urlimagen').addEventListener('blur', function() {
    var urlInput = this;
    var urlValue = urlInput.value.trim(); // Eliminar espacios en blanco al principio y al final

    // Expresión regular para validar la URL
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Validar la URL y la longitud máxima
    if (!urlRegex.test(urlValue) || urlValue.length > 256) {
        alert("Por favor, introduce una URL válida (máximo 256 caracteres).");
        urlInput.value = ''; // Limpiar el valor del input
        return;
    }
});
//Boton añadir productos
document.getElementById('submitBtn').addEventListener('click', async function() {
    // Obtener los valores de los inputs
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const urlimagen = document.getElementById('urlimagen').value.trim();

    // Validar que todos los campos estén completos
    if (!nombre || !precio || !urlimagen) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Obtener los nombres de los productos existentes
    const nombresExistente = await obtenerNombresProductos();

    // Verificar si el nombre del nuevo producto ya existe
    if (nombresExistente.includes(nombre)) {
        alert("Este producto ya existe.");
        return;
    }

    // Realizar la llamada POST al servidor para agregar el producto
    try {
        const response = await fetch('/agregar-producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                precio: precio,
                urlimagen: urlimagen
            })
        });

        if (response.ok) {
            // El producto se agregó correctamente, puedes mostrar un mensaje de éxito o redirigir al usuario a otra página
            alert("Producto añadido correctamente");
            // Redirigir a otra página
            window.location.href = '/admin';
        } else {
            // Si la respuesta no es ok, mostrar un mensaje de error
            alert("Error al agregar el producto. Por favor inténtalo de nuevo más tarde.");
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert("Error al agregar el producto. Por favor inténtalo de nuevo más tarde.");
    }
});


