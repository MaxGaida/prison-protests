const popupContainer = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');

const overlay = new ol.Overlay({
  element: popupContainer,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -15]
});
map.addOverlay(overlay);

map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
  
    if (feature) {
      const date = feature.get('Start date') || 'Unknown date';
      const institution = feature.get('Institution') || 'Unknown institution';
      const prisoners = feature.get('Number of prisoners involved') || 'N/A';
      const source = feature.get('Source') || 'No source provided';
  
      const content = `
        <strong>Date:</strong> ${date}<br>
        <strong>Institution:</strong> ${institution}<br>
        <strong>Prisoners involved:</strong> ${prisoners}<br>
        <strong>Source:</strong> ${source}
      `;
  
      popupContent.innerHTML = content;
      overlay.setPosition(evt.coordinate);
    } else {
      overlay.setPosition(undefined);
    }
  });
  