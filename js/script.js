                                                    // JAVASCRIPT PARA SIMULAR EL ENVIO
const correoElectronico = document.getElementById('floatingInput');
const error = document.getElementById('error');

correoElectronico.onblur = function() {
    if (!correoElectronico.value.includes('@')) {
        correoElectronico.classList.add('invalido');
        error.innerHTML = "Ingresa un correo válido";
    }
};

correoElectronico.onfocus = function() {
    if (this.classList.contains('invalido')) {
        this.classList.remove('invalido');
        error.innerHTML = "";
    }
};

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (!correoElectronico.value.includes('@')) {
        error.innerHTML = "Por favor, ingresa un correo válido antes de continuar.";
        return; 
    }

    const password = document.getElementById('floatingPassword').value;

   
    alert(`GRACIAS POR INICIAR SESIÓN EN SERVIRALIA`);
});
