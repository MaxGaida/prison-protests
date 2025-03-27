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

const map = new ol.Map({
  target: 'map',
  layers: [statesLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([-98.5, 39.8]), // center of US
    zoom: 4
  }),
  controls: ol.control.defaults.defaults({ attribution: false }) // ← working syntax for full build
});

const protestsSource = new ol.source.Vector({
    url: 'protests.geojson',
    format: new ol.format.GeoJSON()
  });
  
  const protestsLayer = new ol.layer.Vector({
    source: protestsSource,
    style: function (feature) {
      const year = feature.get('year');
      const participants = feature.get('participants');
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
  
  

  
  
  map.addLayer(protestsLayer);
  