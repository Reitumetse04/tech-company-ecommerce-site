// === THEME TOGGLE ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('#navMenu a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});

//=== HAMBURGER ===
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('show');
}

//===MAP DIRECTIONS ===
const map = L.map('map').setView([-26.2041, 28.0473], 15);

// Satellite tiles from Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, NOAA',
    maxZoom: 20
}).addTo(map);

// Add marker and popup
const marker = L.marker([-26.2041, 28.0473]).addTo(map);
marker.bindPopup(`
  <div style="font-family: Arial, sans-serif; width: 200px;">
    <strong>Varsity Store Technologies</strong><br>
    <a href="https://www.google.com/maps/search/?api=1&query=278+Lilian+Ngoyi+Street,+Johannesburg"
       target="_blank" style="color: #0066ff; text-decoration: underline;">Directions</a>
  </div>
`, {closeButton: true});




