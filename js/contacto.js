let opciones = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const coordenadasEmpresa = [41.6234542, 0.6288908];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarRuta, fallback, opciones);
} else {
    fallback();
}

function mostrarRuta(posicion) {
    let lat = posicion.coords.latitude;
    let lng = posicion.coords.longitude;

    let mapa = L.map("mapa").setView([lat, lng], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mapa);

    // Marcador da empresa com popup
    L.marker(coordenadasEmpresa)
        .addTo(mapa)
        .bindPopup("GuiDev<br>Calle Príncipe de Viana, Lérida")
        .openPopup();

    // Rota do usuário até a empresa
    L.Routing.control({
        waypoints: [L.latLng(lat, lng), L.latLng(...coordenadasEmpresa)],
        language: "es",
        routeWhileDragging: false,
    }).addTo(mapa);
}

function fallback() {
    // Mapa apenas com a empresa, se o usuário negar a localização
    let mapa = L.map("mapa").setView(coordenadasEmpresa, 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mapa);

    L.marker(coordenadasEmpresa)
        .addTo(mapa)
        .bindPopup("GuiDev<br>Calle Príncipe de Viana, Lérida")
        .openPopup();

    alert("No se pudo obtener tu ubicación. Se mostrará solo la ubicación de nuestra oficina.");
}
