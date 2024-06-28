function CerrarSesion() {
    // Eliminar la cookie de JWT
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Redirigir al usuario a la página de inicio
    document.location.href = "/";
}

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

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const contenedorTarjetas = document.getElementById("productos-container");
    const suggestionsDiv = document.getElementById("suggestions");

    let productos = []; // Almacenará todos los productos

    // Función para crear las tarjetas de productos en el contenedor
    function crearTarjetasProductos(productos) {
        contenedorTarjetas.innerHTML = ''; // Limpiar contenedor antes de añadir nuevos productos
        productos.forEach(producto => {
            const nuevaBicicleta = document.createElement("div");
            nuevaBicicleta.classList = "tarjeta-producto";
            nuevaBicicleta.innerHTML = `
                <img src="${producto.urlImagen}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <h3 class="${producto.deleted ? 'estado-inactivo' : 'estado-activo'}">Estado: ${producto.deleted ? 'Inactivo' : 'Activo'}</h3>
                ${producto.deleted === 0 ? `<button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>` : ''}
                ${producto.deleted === 1 ? `<button class="activar-producto" data-id="${producto.id}">Activar</button>` : ''}
            `;
            contenedorTarjetas.appendChild(nuevaBicicleta);

            // Agregar controlador de eventos al botón "Eliminar" si el producto no está eliminado
            if (producto.deleted === 0) {
                const botonEliminar = nuevaBicicleta.querySelector(".eliminar-producto");
                botonEliminar.addEventListener("click", () => eliminarProducto(producto.id));
            }

            // Agregar controlador de eventos al botón "Activar" si el producto está eliminado
            if (producto.deleted === 1) {
                const botonActivar = nuevaBicicleta.querySelector(".activar-producto");
                botonActivar.addEventListener("click", () => activarProducto(producto.id));
            }
        });
    }

    // Función para mostrar suggestions de productos que coinciden con la cadena de búsqueda
    function mostrarsuggestions(textoBusqueda) {
        if (!suggestionsDiv) return; // Verificar que suggestionsDiv no sea null

        suggestionsDiv.innerHTML = ''; // Limpiar suggestions antes de mostrar nuevas
        const productosSugeridos = productos.filter(producto => {
            const nombre = producto.nombre ? producto.nombre.toLowerCase() : "";
            return nombre.includes(textoBusqueda.toLowerCase());
        });

        productosSugeridos.forEach(producto => {
            const sugerencia = document.createElement("div");
            sugerencia.textContent = producto.nombre;
            sugerencia.classList.add("sugerencia");
            sugerencia.addEventListener("click", () => {
                searchInput.value = producto.nombre;
                suggestionsDiv.innerHTML = ''; // Limpiar suggestions al seleccionar una
            });
            suggestionsDiv.appendChild(sugerencia);
        });
    }

    // Evento input para actualizar las suggestions mientras se escribe en el input de búsqueda
    searchInput.addEventListener("input", function() {
        const textoBusqueda = searchInput.value.trim();
        if (textoBusqueda === '') {
            suggestionsDiv.innerHTML = ''; // Limpiar suggestions si no hay texto de búsqueda
        } else {
            mostrarsuggestions(textoBusqueda);
        }
    });

    // Evento click para realizar la búsqueda y mostrar los productos filtrados
    searchBtn.addEventListener("click", function() {
        const searchText = searchInput.value.toLowerCase().trim();
        const productosFiltrados = productos.filter(producto => {
            const nombre = producto.nombre ? producto.nombre.toLowerCase() : "";
            return nombre.includes(searchText);
        });
        crearTarjetasProductos(productosFiltrados);
    });

    // Llamar a la función getBicicletas y pasar la función crearTarjetasProductos como callback
    getBicicletas().then(bicicletas => {
        productos = bicicletas; // Guardar productos
        crearTarjetasProductos(bicicletas);
    });

    // Función para enviar la solicitud POST al servidor para eliminar el producto
    async function eliminarProducto(idProducto) {
        try {
            const res = await fetch("/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: idProducto })
            });

            if (res.ok) {
                // Producto eliminado correctamente, actualizar la interfaz de usuario si es necesario
                alert("Producto eliminado correctamente");
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } else {
                // Manejar el caso en el que la eliminación falla
                alert("La eliminación del producto falló");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    // Función para enviar la solicitud POST al servidor para activar el producto
    async function activarProducto(idProducto) {
        try {
            const res = await fetch("/activar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: idProducto })
            });

            if (res.ok) {
                // Producto activado correctamente, mostrar mensaje de éxito
                alert("Producto activado correctamente");
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } else {
                // Manejar el caso en el que la activación falla
                alert("La activación del producto falló");
            }
        } catch (error) {
            console.error("Error al activar el producto:", error);
        }
    }

    // Función para cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", CerrarSesion);

    function CerrarSesion() {
        // Eliminar la cookie de JWT
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // Redirigir al usuario a la página de inicio
        document.location.href = "/";
    }
});
