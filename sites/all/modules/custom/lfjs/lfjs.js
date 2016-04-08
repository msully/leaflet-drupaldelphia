(function ($) {

  if (Drupal.ajax) {
    Drupal.ajax.prototype.commands.leafletSyncPoints = function(ajax, response, status) {
      var lMap = Drupal.settings.leaflet[0].lMap;

      lMap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {

          if ($.inArray(layer._leaflet_id.toString(), response.included_ids) == -1) {
            lMap.removeLayer(layer);
          }
          else {
            delete response.points[layer._leaflet_id.toString()];
          }
        }
      });

      if (!jQuery.isEmptyObject(response.points)) {

        $.each(response.points, function(index, point) {
          _custom_add_point(lMap, point);
        });
      }
    }
  }

  Drupal.behaviors.lfjs = {
    attach: function (context, settings) {

    }
  }

  $(document).bind('leaflet.map', function (map, lMap) {
    // We need to grab the map fromt he Drupal Settings array...
    var lMap2 = Drupal.settings.leaflet[0].lMap;
    $(lMap2).bind('moveend', function(e) {
      reloadView(this);
    });
  });

  function reloadView(lMap) {
    var bounds = lMap.getBounds();

    $('#edit-min-lat').val(bounds._southWest.lat);
    $('#edit-min-lon').val(bounds._southWest.lng);
    $('#edit-max-lat').val(bounds._northEast.lat);
    $('#edit-max-lon').val(bounds._northEast.lng).trigger('change');
  }

  function _custom_add_point(lMap, point) {

    var lFeature = Drupal.leaflet.create_point(point, lMap);

    // Reset leafletID.
    if (point.leaflet_id) {
      lFeature._leaflet_id = point.leaflet_id;
    }

    lMap.addLayer(lFeature);
    if (point.popup) {
      lFeature.bindPopup(point.popup);
    }

    $(document).trigger('leaflet.feature', [lFeature, point]);
  }

})(jQuery)