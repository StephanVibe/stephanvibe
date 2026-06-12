function showPage(id) {
  // Alle Sections ausblenden
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Alle Buttons deaktivieren
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Gewünschte Section einblenden
  document.getElementById(id).classList.add('active');
  
  // Geklickten Button aktivieren
  event.target.classList.add('active');
}