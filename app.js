// Función para obtener la información del enlace
async function obtenerInformacionEnlace(url) {
    try {
        // 1. Obtener la información de la dirección IP
        const ipInfoResponse = await fetch(`https://ipinfo.io/json`);
        const ipInfoData = await ipInfoResponse.json();

        // 2. Obtener la información de geolocalización
        const { city, region, country } = ipInfoData;

        // 3. Obtener la dirección IP del enlace
        const urlResponse = await fetch(`https://api.ipify.org?format=json`);
        const urlData = await urlResponse.json();
        const { ip } = urlData;

        // 4. Obtener el nombre de dominio del enlace
        const domain = new URL(url).hostname;

        // 5. Devolver los datos obtenidos
        return {
            ip,
            city,
            region,
            country,
            domain
        };
    } catch (error) {
        console.error('Error al obtener la información:', error);
    }
}

// Manejador de evento para enviar el formulario
document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const enlace = document.getElementById('enlaceInput').value;

    // Uso de la función para obtener información de un enlace
    obtenerInformacionEnlace(enlace)
        .then(informacion => {
            mostrarInformacion(informacion);
        })
        .catch(error => {
            console.error('Error al obtener la información del enlace:', error);
        });
});

// Función para mostrar la información en el DOM
function mostrarInformacion(informacion) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>IP: ${informacion.ip}</p>
        <p>Ciudad: ${informacion.city}</p>
        <p>Región: ${informacion.region}</p>
        <p>País: ${informacion.country}</p>
        <p>Dominio: ${informacion.domain}</p>
    `;
}
