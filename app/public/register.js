const mensajeError = document.getElementsByClassName("error")[0];
console.log("Js cargado correctamente");

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = e.target.user.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    console.log('Datos enviados:', { user, email, password });

    // Validar que el nombre de usuario contenga solo minúsculas, sin espacios ni caracteres especiales
    const usernamePattern = /^[a-z]+$/;
    if (!usernamePattern.test(user)) {
        alert('El nombre de usuario debe contener solo letras minúsculas, sin espacios ni caracteres especiales.');
        return;
    }

    // Validar que el email esté bien escrito
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('El correo electrónico no es válido.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, email, password })
        });

        if (!res.ok) {
            const errorRes = await res.json();
            console.error('Error en la respuesta:', errorRes);
            if (mensajeError) {
                mensajeError.innerText = errorRes.message;
            }
            return mensajeError.classList.toggle("escondido", false);
        }

        const resJson = await res.json();
        console.log('Respuesta del servidor:', resJson);

        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

const app = new Vue({
    el: "#app",
    data: {
        password: '',
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        valid_password: false
    },
    methods: {
        checkPassword() {
            const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            this.contains_eight_characters = this.password.length >= 8;
            this.contains_number = /\d/.test(this.password);
            this.contains_uppercase = /[A-Z]/.test(this.password);
            this.contains_special_character = format.test(this.password);
            this.valid_password = this.contains_eight_characters &&
                                  this.contains_number &&
                                  this.contains_uppercase &&
                                  this.contains_special_character;
        }
    }
});
