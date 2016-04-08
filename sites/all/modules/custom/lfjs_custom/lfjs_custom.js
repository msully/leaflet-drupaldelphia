(function ($) {

  // Extend Polyline
  L.PolylineCustom = L.Polyline.extend({
    callAlert: function() {
      alert('Hello World');
    }
  });

  L.polylineCustom = function (latlngs, options) {
    return new L.PolylineCustom(latlngs, options);
  };


  Drupal.behaviors.lfjsCustom = {
    attach: function (context, settings) {

      var mapOptions = {
        scrollWheelZoom: true,
        doubleClickZoom: true,
        attributionControl: false,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 18
      };

      var custom_map = L.map('map-custom', mapOptions).setView([39.9524, -75.1636], 14);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'peteinge.cif8h2wnn1x4fs3krhzjbc2r5',
        accessToken: 'pk.eyJ1IjoicGV0ZWluZ2UiLCJhIjoiY2ltbDFoc253MDBmNHR0bHY3b2Q3a2ZlcyJ9.dCP-RQ3zevqR4sOuXaEaMw',
      }).addTo(custom_map);

      // Add point.
      var marker = L.marker([39.9524, -75.1636], {custom: 'stuff'});
      marker._leaflet_id = 'custom_id';
      marker.bindPopup('<h1>Philadelphia</h1>');
      marker.addTo(custom_map);

console.log(marker.options.custom); // = stuff

      // Add Polyline.
      var polyline = L.polyline([{lat: 39.9514, lon: -75.181}, {lat: 39.9493, lon: -75.1643}, {lat: 39.9516, lon: -75.1638}], {color: 'red', custom: 'stuff2'});
      polyline._leaflet_id = 'poly_custom_id';
      polyline.addTo(custom_map);

console.log(polyline.options.custom); // = stuff2

      custom_map.eachLayer(function (layer) {
//console.log(layer);
      });

      // Extend Polyline
      var polyline2 = L.polylineCustom([{lat: 39.9414, lon: -75.181}, {lat: 39.9393, lon: -75.1643}, {lat: 39.9416, lon: -75.1638}], {color: 'blue', custom: 'stuff3'});
      polyline2._leaflet_id = 'poly_custom_id2';
      polyline2.addTo(custom_map);

console.log(polyline.options.custom); // = stuff3
      polyline2.callAlert();

      // Init controls.
      $('.control.zoom-in').click(function() {
        custom_map.zoomIn();
      });
      $('.control.zoom-out').click(function() {
        custom_map.zoomOut();
      });
      $('.control.pan-left').click(function() {
        custom_map.panBy([-200, 0]);
      });
      $('.control.pan-right').click(function() {
        custom_map.panBy([200, 0]);
      });
    }
  }

})(jQuery)