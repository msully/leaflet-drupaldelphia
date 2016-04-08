(function ($) {

  Drupal.behaviors.lfjsCustom = {
    attach: function (context, settings) {

      var mapOptions = {
        scrollWheelZoom: true,
        doubleClickZoom: true,
        attributionControl: true,
        zoomControl: true,
        minZoom: 8,
        maxZoom: 18
      };

      var custom_map = L.map('map-example', mapOptions).setView([39.9524, -75.1636], 14);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'peteinge.cif8h2wnn1x4fs3krhzjbc2r5',
        accessToken: 'pk.eyJ1IjoicGV0ZWluZ2UiLCJhIjoiY2ltbDFoc253MDBmNHR0bHY3b2Q3a2ZlcyJ9.dCP-RQ3zevqR4sOuXaEaMw',
      }).addTo(custom_map);

      // Add marker.
      var marker = L.marker([39.9524, -75.1636], {});
      marker.bindPopup('<h1>Philadelphia</h1>');
      marker.addTo(custom_map);

      // Add Polyline.
      var polyline = L.polyline([
        {lat: 39.9514, lon: -75.186},
        {lat: 39.9514, lon: -75.176},
        {lat: 39.9576, lon: -75.1718}
      ], {color: 'red'});
      polyline.bindPopup('<h1>Polyline</h1>');
      polyline.addTo(custom_map);

      // Add Polygon.
      var polygon = L.polygon([[
        {lat: 39.9514, lon: -75.1510},
        {lat: 39.9504, lon: -75.1460},
        {lat: 39.9514, lon: -75.1410},
        {lat: 39.9545, lon: -75.1390},
        {lat: 39.9576, lon: -75.1410},
        {lat: 39.9586, lon: -75.1460},
        {lat: 39.9576, lon: -75.1510},
        {lat: 39.9545, lon: -75.1530}
      ],
      [
        {lat: 39.9534, lon: -75.1490},
        {lat: 39.9534, lon: -75.1430},
        {lat: 39.9556, lon: -75.1430},
        {lat: 39.9556, lon: -75.1490}
      ]], {
        stroke: false,
        color: 'blue',
        fill: true,
        fillColor: 'blue',
        fillOpacity: .5
      });
      polygon.bindPopup('<h1>Polygon</h1>');
      polygon.addTo(custom_map);


      // Add Square.
      var bounds = [[39.9414, -75.1928], [39.9494, -75.1728]];

      // create an orange rectangle
      var rectangle = L.rectangle(bounds, {color: "green", weight: 1});
      rectangle.bindPopup('<h1>Rectangle</h1>');
      rectangle.addTo(custom_map);

      // Add circle.
      var circle = L.circle([39.9450, -75.1558], 400, {
        color: 'purple',
      });
      circle.bindPopup('<h1>Circle</h1>');
      circle.addTo(custom_map);

      // Add circlemarker.
      var circlemarker = L.circleMarker([39.9620, -75.1598], {
        color: 'yellow',
        radius: 50
      });
      circlemarker.bindPopup('<h1>Circlemarker</h1>');
      circlemarker.addTo(custom_map);



    }
  }

})(jQuery)