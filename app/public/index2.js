  document.addEventListener('DOMContentLoaded', function() {
    const privacyNotice = document.getElementById('privacy-notice');
    const acceptPrivacyBtn = document.getElementById('accept-privacy');

    // Comprobar si el aviso de privacidad ya ha sido aceptado
    if (!localStorage.getItem('privacyAccepted')) {
        privacyNotice.style.display = 'block';
    }

    // Manejar la aceptación del aviso de privacidad
    acceptPrivacyBtn.addEventListener('click', function() {
        localStorage.setItem('privacyAccepted', 'true');
        privacyNotice.style.display = 'none';
    });
  document.addEventListener("DOMContentLoaded", function() {
    // Modo oscuro
    const checkbox = document.getElementById("checkbox");

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

    // Consentimiento de cookies
    const cookieConsent = document.getElementById("cookie-consent");
    const acceptCookiesButton = document.getElementById("accept-cookies");

    if (!localStorage.getItem("cookies-accepted")) {
        cookieConsent.style.display = "block";
    }

    acceptCookiesButton.addEventListener("click", function() {
        localStorage.setItem("cookies-accepted", true);
        cookieConsent.style.display = "none";
    });

    // Pantalla de carga
    const loadingScreen = document.getElementById("loading-screen");

    function mostrarPantallaCarga() {
        loadingScreen.style.display = "flex";
    }

    function ocultarPantallaCarga() {
        loadingScreen.style.display = "none";
    }

    // Crear tarjetas de productos
    const contenedorTarjetas = document.getElementById("productos-container");
    let productos = []; // Almacenará todos los productos

    function crearTarjetasProductosInicio(productos) {
        contenedorTarjetas.innerHTML = ''; // Limpiar contenedor antes de añadir nuevos productos
        productos.forEach(producto => {
            if (producto.deleted !== 1) {
                const nuevaBicicleta = document.createElement("div");
                nuevaBicicleta.classList = "tarjeta-producto";
                const precioTexto = producto.precio === 0 ? "Free to play" : `${producto.precio}€`;

                nuevaBicicleta.innerHTML = `
                    <img src="${producto.urlImagen}">
                    <h3>${producto.nombre}</h3>
                    <p>${precioTexto}</p>
                    <button>Agregar al carrito</button>
                    <button class="view-game">Ver Juego</button>
                `;
                contenedorTarjetas.appendChild(nuevaBicicleta);
                nuevaBicicleta.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
                nuevaBicicleta.getElementsByClassName("view-game")[0].addEventListener("click", () => mostrarDetallesProducto(producto));
            }
        });
        ocultarPantallaCarga(); // Ocultar la pantalla de carga una vez que los productos se han cargado
    }

    mostrarPantallaCarga(); // Mostrar la pantalla de carga antes de iniciar la carga de productos

    getBicicletas().then(bicicletas => {
        productos = bicicletas; // Guardar productos
        crearTarjetasProductosInicio(bicicletas);
    });

    // Evento de búsqueda dinámica
    const searchInput = document.getElementById("searchInput");
    const suggestionsContainer = document.getElementById("suggestions");
    const searchBtn = document.getElementById("searchBtn");

    searchInput.addEventListener("input", function() {
        const searchText = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = "";

        if (searchText.length > 0) {
            const sugerencias = productos
                .filter(producto => producto.nombre.toLowerCase().includes(searchText))
                .map(producto => producto.nombre);

            sugerencias.forEach(nombre => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.textContent = nombre;
                suggestionItem.addEventListener("click", function() {
                    searchInput.value = nombre;
                    suggestionsContainer.innerHTML = "";
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        }
    });

    searchBtn.addEventListener("click", function() {
        const searchText = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto => {
            const nombre = producto.nombre ? producto.nombre.toLowerCase() : "";
            const descripcion = producto.descripcion ? producto.descripcion.toLowerCase() : "";
            return nombre.includes(searchText) || descripcion.includes(searchText);
        });
        crearTarjetasProductosInicio(productosFiltrados);
    });

    // Modal de ajustes
    const settingsButton = document.querySelector(".button");
    const settingsModal = document.getElementById("settingsModal");
    const closeButton = document.querySelector(".close");

    if (settingsButton) {
        settingsButton.addEventListener("click", function() {
            settingsModal.style.display = "block";
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function() {
            settingsModal.style.display = "none";
        });
    }

    window.addEventListener("click", function(event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
    });

    // Ajustes de configuración
    document.getElementById("fontSize").addEventListener("input", function() {
        document.body.style.fontSize = this.value + "%";
    });

    document.getElementById("bgColor").addEventListener("input", function() {
        document.body.style.backgroundColor = this.value;
    });

    document.getElementById("zoomLevel").addEventListener("input", function() {
        document.body.style.zoom = this.value + "%";
    });

    // Reproducción de audio
    const audioPlayer = document.getElementById("audioPlayer");
    const myButton = document.getElementById("myButton");

    myButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            myButton.textContent = "Pausar Audio";
        } else {
            audioPlayer.pause();
            myButton.textContent = "Audio Ayuda!";
        }
    });

    // Ver detalles del producto
    const productDetailsModal = document.getElementById("productDetailsModal");
    const productDetailsCloseButton = productDetailsModal.querySelector(".close");

    function mostrarDetallesProducto(producto) {
        const productDetails = document.getElementById("product-details");
        productDetails.innerHTML = `
            <div class="product-details-content" style="height: 300%;">
                ${producto.urlyoutube}
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio === 0 ? "Free to play" : `${producto.precio}€`}</p>
                <p>Descripción: ${producto.descripcion}</p>
                <!-- Agrega más detalles del producto aquí -->
            </div>
        `;

        // Ajuste del ancho del iframe
        const iframe = productDetails.querySelector("iframe");
        if (iframe) {
            iframe.style.width = "100%";
            iframe.style.height = "500px";
        }

        productDetailsModal.style.display = "block";
    }

    if (productDetailsCloseButton) {
        productDetailsCloseButton.addEventListener("click", function() {
            productDetailsModal.style.display = "none";
        });
    }

    window.addEventListener("click", function(event) {
        if (event.target === productDetailsModal) {
            productDetailsModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  // Modo oscuro
  const checkbox = document.getElementById("checkbox");

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

  // Consentimiento de cookies
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  if (!localStorage.getItem("cookies-accepted")) {
      cookieConsent.style.display = "block";
  }

  acceptCookiesButton.addEventListener("click", function() {
      localStorage.setItem("cookies-accepted", true);
      cookieConsent.style.display = "none";
  });

  // Crear tarjetas de productos
  const contenedorTarjetas = document.getElementById("productos-container");
  let productos = []; // Almacenará todos los productos

  function crearTarjetasProductosInicio(productos) {
    contenedorTarjetas.innerHTML = ''; // Limpiar contenedor antes de añadir nuevos productos
    productos.forEach(producto => {
      if (producto.deleted !== 1) {
        const nuevaBicicleta = document.createElement("div");
        nuevaBicicleta.classList = "tarjeta-producto";
        const precioTexto = producto.precio === 0 ? "Free to play" : `${producto.precio}€`;

        nuevaBicicleta.innerHTML = `
          <img src="${producto.urlImagen}">
          <h3>${producto.nombre}</h3>
          <p>${precioTexto}</p>
          <button>Agregar al carrito</button>
          <button class="view-game">Ver Juego</button>
        `;
        contenedorTarjetas.appendChild(nuevaBicicleta);
        nuevaBicicleta.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
        nuevaBicicleta.getElementsByClassName("view-game")[0].addEventListener("click", () => mostrarDetallesProducto(producto));
      }
    });
  }

  getBicicletas().then(bicicletas => {
    productos = bicicletas; // Guardar productos
    crearTarjetasProductosInicio(bicicletas);
  });

  // Evento de búsqueda dinámica
  const searchInput = document.getElementById("searchInput");
  const suggestionsContainer = document.getElementById("suggestions");
  const searchBtn = document.getElementById("searchBtn");

  searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = "";

    if (searchText.length > 0) {
      const sugerencias = productos
        .filter(producto => producto.nombre.toLowerCase().includes(searchText))
        .map(producto => producto.nombre);

      sugerencias.forEach(nombre => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.textContent = nombre;
        suggestionItem.addEventListener("click", function() {
          searchInput.value = nombre;
          suggestionsContainer.innerHTML = "";
        });
        suggestionsContainer.appendChild(suggestionItem);
      });
    }
  });

  searchBtn.addEventListener("click", function() {
    const searchText = searchInput.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => {
      const nombre = producto.nombre ? producto.nombre.toLowerCase() : "";
      const descripcion = producto.descripcion ? producto.descripcion.toLowerCase() : "";
      return nombre.includes(searchText) || descripcion.includes(searchText);
    });
    crearTarjetasProductosInicio(productosFiltrados);
  });

  // Modal de ajustes
  const settingsButton = document.querySelector(".button");
  const settingsModal = document.getElementById("settingsModal");
  const closeButton = document.querySelector(".close");

  if (settingsButton) {
    settingsButton.addEventListener("click", function() {
      settingsModal.style.display = "block";
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function() {
      settingsModal.style.display = "none";
    });
  }

  window.addEventListener("click", function(event) {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none";
    }
  });

  // Ajustes de configuración
  document.getElementById("fontSize").addEventListener("input", function() {
    document.body.style.fontSize = this.value + "%";
  });

  document.getElementById("bgColor").addEventListener("input", function() {
    document.body.style.backgroundColor = this.value;
  });

  document.getElementById("zoomLevel").addEventListener("input", function() {
    document.body.style.zoom = this.value + "%";
  });

  // Reproducción de audio
  const audioPlayer = document.getElementById("audioPlayer");
  const myButton = document.getElementById("myButton");

  myButton.addEventListener("click", function() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      myButton.textContent = "Pausar Audio";
    } else {
      audioPlayer.pause();
      myButton.textContent = "Audio Ayuda!";
    }
  });

  // Ver detalles del producto
  const productDetailsModal = document.getElementById("productDetailsModal");
  const productDetailsCloseButton = productDetailsModal.querySelector(".close");

  function mostrarDetallesProducto(producto) {
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = `
      <div class="product-details-content" style="height: 300%;">
        ${producto.urlyoutube}
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio === 0 ? "Free to play" : `${producto.precio}€`}</p>
        <p>Descripción: ${producto.descripcion}</p>
        <!-- Agrega más detalles del producto aquí -->
      </div>
    `;

    // Ajuste del ancho del iframe
    const iframe = productDetails.querySelector("iframe");
    if (iframe) {
      iframe.style.width = "100%";
      iframe.style.height = "500px";
    }

    productDetailsModal.style.display = "block";
  }

  if (productDetailsCloseButton) {
    productDetailsCloseButton.addEventListener("click", function() {
      productDetailsModal.style.display = "none";
    });
  }

  window.addEventListener("click", function(event) {
    if (event.target === productDetailsModal) {
      productDetailsModal.style.display = "none";
    }
  });
});
