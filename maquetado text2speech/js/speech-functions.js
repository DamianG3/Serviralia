/**
 * Funciones para manejo de voz (text-to-speech y speech-to-text)
 */

// Verificar compatibilidad del navegador
const speechCompatible = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
const speechSynthesisCompatible = 'speechSynthesis' in window;

// Reconocimiento de voz (Speech to Text)
function startRecognition(inputId, messageId = null) {
  if (!speechCompatible) {
    alert("Tu navegador no soporta reconocimiento de voz. Intenta con Chrome o Edge.");
    return;
  }

  const input = document.getElementById(inputId);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  recognition.lang = 'es-MX';
  recognition.interimResults = false;
  
  recognition.start();
  
  if (messageId) {
    document.getElementById(messageId).innerText = "Escuchando...";
  }
  
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    input.value = result;
    
    if (messageId) {
      document.getElementById(messageId).innerText = `Texto reconocido: ${result}`;
    }
    
  };
  
  recognition.onerror = (event) => {
    console.error("Error en reconocimiento de voz:", event.error);
    if (messageId) {
      document.getElementById(messageId).innerText = `Error: ${event.error}`;
    }
  };
}

// Lectura en voz alta (Text to Speech)
function leerTexto(texto, lang = 'es-MX') {
  if (!speechSynthesisCompatible) {
    alert("Tu navegador no soporta síntesis de voz. Intenta con Chrome o Edge.");
    return;
  }
  
  // Detener cualquier lectura en curso
  window.speechSynthesis.cancel();
  
  const speech = new SpeechSynthesisUtterance(texto);
  speech.lang = lang;
  window.speechSynthesis.speak(speech);
  
  return speech;
}

// Función para leer la descripción de un trabajador
function leerDescripcion(boton) {
  if (!speechSynthesisCompatible) {
    alert("Tu navegador no soporta síntesis de voz. Intenta con Chrome o Edge.");
    return;
  }
  
  // Obtener el elemento de descripción cercano al botón
  const descripcion = boton.closest('.trabajador-bio').querySelector('p').innerText;
  
  // Cambiar apariencia del botón
  boton.innerHTML = '⏹️';
  boton.title = 'Detener lectura';
  const originalOnClick = boton.onclick;
  boton.onclick = function() { 
    detenerLectura(); 
    boton.innerHTML = '🔊';
    boton.title = 'Escuchar descripción';
    boton.onclick = originalOnClick;
  };
  
  // Crear y configurar el objeto de síntesis de voz
  const speech = leerTexto(descripcion);
  
  // Restaurar botón cuando termine
  speech.onend = () => {
    boton.innerHTML = '🔊';
    boton.title = 'Escuchar descripción';
    boton.onclick = originalOnClick;
  };
}

// Función para detener la lectura
function detenerLectura() {
  window.speechSynthesis.cancel();
}

// Función para leer mensaje específico
function leerMensaje(elementId) {
  const texto = document.getElementById(elementId).innerText;
  leerTexto(texto);
}

// Inicializar botones de voz cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar botones de voz a todas las biografías de trabajadores
  const biografias = document.querySelectorAll('.trabajador-bio');
  
  biografias.forEach(bio => {
    // Verificar si ya tiene un botón de voz
    if (!bio.querySelector('.btn-voice')) {
      const titulo = bio.querySelector('h6');
      if (titulo) {
        const botonVoz = document.createElement('button');
        botonVoz.className = 'btn-voice';
        botonVoz.innerHTML = '🔊';
        botonVoz.title = 'Escuchar descripción';
        botonVoz.onclick = function() { leerDescripcion(this); };
        
        // Insertar el botón junto al título
        titulo.appendChild(botonVoz);
      }
    }
  });
});