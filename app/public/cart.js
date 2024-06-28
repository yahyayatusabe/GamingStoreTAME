const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

document.addEventListener("DOMContentLoaded", function() {
  const checkbox = document.getElementById("checkbox");

  // Revisar el almacenamiento local para ver si el modo oscuro está activado
  if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
      checkbox.checked = true;
  }

  checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
          document.body.classList.add("dark-mode");
          localStorage.setItem("dark-mode", "enabled");
      } else {
          document.body.classList.remove("dark-mode");
          localStorage.setItem("dark-mode", "disabled");
      }
  });
});


/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaBicicleta = document.createElement("div");
      nuevaBicicleta.classList = "tarjeta-producto";
      nuevaBicicleta.innerHTML = `
      <img src="${producto.urlImagen}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>
    `;
      contenedorTarjetas.appendChild(nuevaBicicleta);
      nuevaBicicleta
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevaBicicleta
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("bicicletas"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}

document.getElementById("comprar").addEventListener("click", async () => {
  const res = await comprarCarrito();
  if (res) {
    reiniciarCarrito();
    window.location.href = "http://localhost:4000/compra-exitosa";
  }
});

myButton.addEventListener("click", function() {
  if (audioPlayer.paused) {
      audioPlayer.play();
      myButton.textContent = "Pausar Audio";
  } else {
      audioPlayer.pause();
      myButton.textContent = "Audio Ayuda!";
  }
});