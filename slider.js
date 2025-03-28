document.getElementById('yearSlider').addEventListener('input', function () {
    const selectedYear = this.value;
    document.getElementById('selectedYear').textContent = selectedYear;
  
    // Refresh the map layer styles
    protestsLayer.setStyle(protestsLayer.getStyle());
  });
  