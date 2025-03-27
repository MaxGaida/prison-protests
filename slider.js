// Attach event listener to year slider
document.getElementById('yearSlider').addEventListener('input', function () {
    const selectedYear = this.value;
    document.getElementById('selectedYear').textContent = selectedYear;
  
    // Force OpenLayers to re-style the features
    protestsLayer.setStyle(protestsLayer.getStyle());
  });
  