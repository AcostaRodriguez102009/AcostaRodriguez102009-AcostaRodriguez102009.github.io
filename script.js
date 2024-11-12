// Función para resolver el ejercicio
function resolverEjercicio() {
    const texto = document.getElementById('ejercicioTexto').value;

    // Expresiones regulares para buscar diferentes parámetros
    const regexPotencia = /(\d+(\.\d+)?)\s*(kW|kw|kilovatios)/i;
    const regexResistencia = /(\d+(\.\d+)?)\s*(Ω|ohm|ohmios)/i;
    const regexDistancia = /(\d+(\.\d+)?)\s*(m|metros)/i;
    const regexTension = /(\d+(\.\d+)?)\s*(V|voltios|volts)/i;

    // Buscar los valores en el texto del ejercicio
    const potenciaMatch = texto.match(regexPotencia);
    const resistenciaMatch = texto.match(regexResistencia);
    const distanciaMatch = texto.match(regexDistancia);
    const tensionMatch = texto.match(regexTension);

    // Si no encontramos la información necesaria, mostrar error
    if (!potenciaMatch || !tensionMatch) {
        alert("No se pudo interpretar el ejercicio. Asegúrate de que los valores de potencia y tensión estén presentes en el texto.");
        return;
    }

    // Extraer valores de los matches o asignar valores por defecto
    const potencia = parseFloat(potenciaMatch[1]) * 1000; // Convertir kW a W
    const tension = parseFloat(tensionMatch[1]);
    const distancia = distanciaMatch ? parseFloat(distanciaMatch[1]) : 50; // Valor por defecto
    const resistencia = resistenciaMatch ? parseFloat(resistenciaMatch[1]) : 0.5; // Valor por defecto

    // Cálculos: corriente y caída de voltaje
    const corriente = potencia / tension;
    const voltajeCaida = corriente * resistencia;

    // Mostrar los resultados en HTML
    let resultado = `
        <p><strong>Ejercicio resuelto:</strong></p>
        <p>Potencia: ${potencia / 1000} kW</p>
        <p>Distancia: ${distancia} m</p>
        <p>Tensión de alimentación: ${tension} V</p>
        <p>Resistencia del cable: ${resistencia} Ω</p>
        <p>Corriente calculada: ${corriente.toFixed(2)} A</p>
        <p>Caída de voltaje: ${voltajeCaida.toFixed(2)} V</p>
    `;
    document.getElementById('resultadoEjercicio').innerHTML = resultado;

    // Mostrar fórmula en MathJax
    const formula = `\\text{Caída de Voltaje: } V_{caída} = I \\times R`;
    document.getElementById('resultadoEjercicio').innerHTML += `<div id="formulaEjercicio">\\(${formula}\\)</div>`;

    // Activar MathJax para actualizar la fórmula
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "formulaEjercicio"]);
}
