// Base map layer: US state outlines
const statesGeoJSON = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';

const statesLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: statesGeoJSON,
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#333',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0)' // transparent fill
    })
  })
});

// Initialize the map
const map = new ol.Map({
  target: 'map',
  layers: [statesLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([-98.5, 39.8]), // center of continental US
    zoom: 4
  }),
  controls: ol.control.defaults.defaults({ attribution: false })
});

// Protest data source
const protestsSource = new ol.source.Vector({
  url: 'prison-protests.geojson',
  format: new ol.format.GeoJSON()
});

// Protest layer with style based on participants & year filter
const protestsLayer = new ol.layer.Vector({
  source: protestsSource,
  style: function (feature) {
    const dateString = feature.get('Start date');
    if (!dateString) return null;

    const yearMatch = dateString.match(/\b(19[6-9][0-9]|1979)\b/);
    if (!yearMatch) return null;

    const year = parseInt(yearMatch[0]);

    const participantsRaw = feature.get('Number of prisoners involved');
    const participants = parseInt(participantsRaw);
    if (isNaN(participants)) return null;

    const currentYear = parseInt(document.getElementById('yearSlider').value);
    if (year !== currentYear) return null;

    const radius = 5 + (participants - 100) / (1000 - 100) * 10;

    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({ color: 'red' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 1 })
      })
    });
  }
});

map.addLayer(protestsLayer);

//
// Popup setup
//
const popupContainer = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');

const overlay = new ol.Overlay({
  element: popupContainer,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -15]
});
map.addOverlay(overlay);

// Show popup on click
map.on('singleclick', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });

  if (feature) {
    const date = feature.get('Start date') || 'Unknown';
    const institution = feature.get('Institution') || 'Unknown';
    const prisoners = feature.get('Number of prisoners involved') || 'N/A';
    const source = feature.get('Source') || 'Unknown';

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
