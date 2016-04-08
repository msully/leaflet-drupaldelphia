autoscale: true

#Branching Out with LeafletJS

###Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps
<br>

### @peteinge

### https://github.com/pingevt/leaflet-drupaldelphia

![inline 90%](images/bluecadet_logo.png)

^ SLOW DOWN

^ My name is Pete Inge. Recently I became a developer at Bluecadet. Bluecadet is an Emmy Award-winning digital agency that creates world-class websites, mobile apps, interactive installations, and immersive environments.

^ Before that I was a freelancer for many years.

^ Qs---

^ Who has used LeafletJS and Drupal?

^ Who has used LeafeltJS?

^ So What I would like to talk about today is first and foremost, integrating LeafletJS into Drupal, but beyond that is really hopefully opening the door for you to add some special Zing to your project to make your map stand out from everything else. It makes you as a developer stand out and your agency, etc. And it can be done with Drupal.

^ Theres a whole D7 site up on a github repo.

---

![right](images/map.tiff)

![inline 65%](images/leaflet_logo.png)

Leaflet is designed with _simplicity, performance and usability_ in mind. It works efficiently across all major desktop and mobile platforms, can be extended with lots of *plugins*, has a beautiful, easy to use and *well-documented API* and a simple, readable *source code* that is a joy to *contribute* to.

^ MAPS

---

![right](images/map.tiff)

![inline 65%](images/leaflet_logo.png)

- Open-source
- JavaScript library
- Mobile-friendly
- Interactive
- Extremely Lightweight.

<br>
*NOTE:* Theres a module and a library

*Make directory writable!!*

^ Trusted by the Best: GitHub, Foursquare, Pintrest, Facebook, Evernote and more...

^ Checkout lefletJS.com for an extended list of features.

---

![right](images/map.tiff)

![inline 65%](images/leaflet_logo.png)

## What about other mapping utilities?

^ *Why not Google?* (Client nixed google)

^ Why not OpenLayers? (??Bad documentation or I was having a bad day)

^ As with anything custom in Drupal theres many solutions. You need to choose the best option for your requirements.

^ When we laid out the requirements and restrictions leaflet turned out to be a great solution.

---

# LeafletJS Objects

- Marker
- Popup
- Polyline
- MultiPolyline (Group of Polylines that share styling/Popup.)
- Polygon
- MultiPolygon (Group of polygons that share styling/popup)
- Rectangle
- Circle  (radius in m)
- CircleMarker (radius in px)

^ Show example.

---

# Our Example Project
## Philly Restaurants

- Drupal 7.43
- Minimal install
- Leaflet 7.x-1.3
  - library *make directory readable*
  - *Preview mode does not work within Views*
- **Just an example to get you going**

^ Before I get too far along here...

^ Also Show Restaurant CT

---

#LeafletJS & Drupal
(How I see it at least...)


1. LeafletJS module and fields (not really discussing today)
2. LeafletJS module with some custom code
3. Only Leaflet Library and all custom code

^ I've found a number of tutorials online.

^ Show detail of Restaurant.

^ PAUSE...

---

![inline 170%](images/ppw_logo_inv.png)

![inline](images/combined-logo.png)

^ I previously worked as a contractor with Parallel Public works. Parallel Public Works is a technology and design studio specializing in the creation of web applications, mobile apps, and software products for governments, non-profits, and public space based in Seattle, Washington.

^ I worked with them on a number of projects but specifically the two I'll be showing you today.

---

## Washington State Department of Early Learning, Early Childhood Education Career Planning Portal

![inline 150%](images/del-ece_logo.png)

###or for short **DEL-ECE**

##ececareers.del.wa.gov

^ The first is a project for the Department of early learning for the State of Washington. We were creating a microsite where prospective students can find out more about Early Childhood Education Careers. There are a few levels based on the certificates or degree the perspective student enrolls in.

^ So one part of the site is a listing of all the different certificates and degrees offered and by which school. Since we were targeting the entire state, we added the map to help students visualize the schools closest to themselves. And you guess it, we used views and leaflet...

---

# DEL-ECE

![inline autoplay loop mute](video/del-ece2.mov)

^ Explain...

^ We are listing out degrees/certificates but the map is displaying colleges.

^ We have typical exposed filters on the right

^ We are also filtering by the bounds of the map.

---

# DEL-ECE

###Requirements

1. Use AJAX
2. Degree based list, but Map has points for colleges
3. Filter by map bounds
4. No for google maps

---

# DEL-ECE

###Implementation

1. Using LeafletJS module and LeafletJS views module
2. Added custom module to fill in the gaps

^ The example today is pulled mainly from this project.

---

# Let's get under the hood!

^ At first you may think to use an attachment, but really I ran into some problems with that. Loose orientation. Personally, I didn't like that experience. Too jumpy and leafletJS has smooth transitions built in.

^ Show Example Site (Attached)

^ So I pulled things apart and controlled things in a custom manner.

^ Show Example Site (Restaurants)

^ Filters, map bounds, show/hide points.

^ These examples should hopefully open the door for you to create some custom functionality.

^ Ajax disables controls, you may need to do the same.

---

# How does it work...

- We have two views
- Use PHP and Drupal hooks to modify the data and trigger custom JS

<br>
Lets step through it...

---

# Restaurants Module (lfjs)

###**You'll find all this in the resources provided**

PHP - (lfjs.module)

```php
/**
 * Implements hook_menu().
 */
function lfjs_menu() {
  $items['restaurants'] = array(
    'title' => 'Restaurants',
    'page callback' => '_restaurants',
    'access arguments' => array('access content'),
    'type' => MENU_SUGGESTED_ITEM,
  );
  return $items;
}
```

^ First, I'm creating a custom page here with a callback in hook_menu()

---

### Restaurants

PHP - (lfjs.module)

``` PHP
/**
 * Page callback.
 */
function _restaurants() {
  $build = array(
    'map' => NULL,
    'list' => NULL,
  );

  // Add JS
  drupal_add_js(drupal_get_path('module', 'lfjs') . '/lfjs.js');

  ...
}
```

^ I start off creating a build array and add our custom JS file.

---

### Restaurants

PHP - (lfjs.module)

```php
function _restaurants() {
  ...
  // Add map.
  $view = views_get_view('restaurants');
  $view->set_display('map_block');
  $view->pre_execute();
  $view->execute();

  // Just a render array.
  $build['map'] = $view->style_plugin->render();

  // Add List.
  $view = views_get_view('restaurants');
  $view->set_display('default');
  $view->pre_execute();
  $view->execute();

  $build['list'] = array('#markup' => $view->render());

  return $build;
}
```

^ And I move on to adding our two views. They are two different blocks from the same actual Drupal view.

^ This should look familiar if you have ever programmatically added a view somewhere.

^ So that is how we initially build the page.

^ I'd like to show you two things from Drupal so that we can easily modify this.

---

## 1. AJAX Commands

Like:

- ajax\_command\_add\_css
- ajax\_command\_after
- ajax\_command\_alert
- ajax\_command\_append
- ajax\_command\_before
- ajax\_command\_changed

Well, you can create your own...

^ Anyone familiar with these? Drupal and views uses these commands to modify data through AJAX. At first they can seem difficult, but are actually pretty simple once you get to use them.

---

## 1. AJAX Commands continued..

On the php side they are simple arrays.

```php
array(
  'command' => 'NAME_OF_COMMAND',
  ...[OTHER NEEDED DATA]
);
```

These commands are fired in JS after the AJAX call is returned.

^ The great part is we can easily create our own and I'll show you in just a minute.

---

## 2. Views Customization
### with hook\_views\_ajax\_data\_alter()

PHP - (lfjs.module)

```PHP
/**
 * Implements hook_views_ajax_data_alter().
 */
function lfjs_views_ajax_data_alter(&$commands, $view) {
  ...
}
```

^ Now this is just a list of commands to alter the view. So if you changed pages, you'll replace data thats contained in here. We can also add our own commands to altar anything else. So you can see, this just doesn't apply to maps. You can use this to customize the crap out of a view page that is utilizing AJAX.

---

# Let's create our own COMMAND

JS - (lfjs.js)

```js
(function ($) {

  if (Drupal.ajax) {
    Drupal.ajax.prototype.commands.leafletSyncPoints =
      function(ajax, response, status) {
        ...
      }
  }

})(jQuery)
```

^ drupal_add_library('system', 'drupal.ajax');

^ Drupal.ajax doesn't exist if AJAX hasn't been loaded for the page.

^ response variable holds all the data we set in the array in php.

---

## Let's create our own COMMAND - con't

SO now in PHP I can do:

PHP - (lfjs.module)

```php
$commands[] = array(
  'command' => 'leafletSyncPoints',
  'points' => $updated_points,
  'included_ids' => $included_ids,
);
```

^ You can see this in the module. I'm filtering the points. Sending the new data. And sending an array of IDs. Its just easier to work with both.

^ PAUSE...

---

# LeafletJS hooks

hook\_leaflet\_views\_alter\_points\_data\_alter()

PHP - (lfjs.module)

```php
/**
 * Implements hook_leaflet_views_alter_points_data_alter().
 */
function lfjs_leaflet_views_alter_points_data_alter($result, &$points) {
  foreach ($points as &$point) {
    // We manually set this here so we can easily grab points later.
    if (!isset($point['leaflet_id'])) {
      $point['leaflet_id'] = 'nid:' . $result->nid;
    }

    // To prove a point.
    $point['popup'] .= ' 2';
  }
}
```

^ LeafletJS provides a hook so that we can alter the points before they are sent to the map. In our example here, I'm just adding a '2' to the popup to prove the point, but you can do a lot more. Change the icon, etc. Say we added an icon on each node. This would be a good spot to change that.

^ Show example site.

---

# AJAX and Views Recap.

We created a JS function to react on data sent through AJAX. In this instance we sent a new set of points to sync with the old set of points in the map.

1. In PHP
  - Get the result set we need
  - Run it through hook\_leaflet\_views\_alter\_points\_data\_alter()
  - Send a new command to sync the points on the map!
1. In JS
  - Run through the array of new new points and reset the map accordingly


^ That was a lot, but what did we do?

^ We could send more functions to recenter the map so we get that smooth scrolling leaflet provides.

^ PAUSE...

---

# Intermission

^ OK, so that was a lot of code. Breathe for a sec...

^ Ok, Lets take a step back out of that and look at another example project.

---

## Spokane Regional Transportation<br>Management Center

![inline 150%](images/SRTMC_logo.jpg)

### or for short **SRTMC**

###srtmc.org

^ This was a project to basically re-skin an old site. The old site had a lot of issues, and was very hard to use and easily broke (from what I understood).

^ So the site should be an easy place for people in Spokane Washington to check traffic. As well as view traffic cams. It needed to be responsive as well. So this was a fun project.

---

#SRTMC

![inline autoplay loop mute](video/srtmc2.mov)

^ As you can see here there is a lot of custom functionality going on.

^ Layers and groups of traffic incidents.

^ Traffic flow.

^ Embedded streaming video.

^ Side tray, re-centering.

---

# SRTMC

###Requirements

1. Highly custom functionality
1. Embedded traffic cameras
1. Multiple layers/groups of traffic incidents
1. Points and lines
1. Mobile friendly view with a complete redesign.

^ Because of the custom functionally of the controls and layout, I pulled all of the controls out of the LeafletJS map, and used my custom code. I manipulated the map completely outside of the leafletJS map.

---

# SRTMC

###Implementation

1. Using LeafletJS as library only
1. Added custom module/JS
1. Using Hybrid Decoupled approach

^ My colleague Will will be giving a talk after lunch today about Headless or Decoupled Drupal. You should check it out if you are curious.

^ So from this project, I want to show you how to set up the map and then a few things you can do to get you started interacting with your maps.

---

# Restaurants Custom Module (lfjs_custom)

PHP - (lfjs_custom.module)

```PHP
/**
 * Implements hook_menu().
 */
function lfjs_custom_menu() {
  $items['restaurants_custom'] = array(
    'title' => 'Restaurants Custom',
    'page callback' => '_restaurants_custom',
    'access arguments' => array('access content'),
    'type' => MENU_SUGGESTED_ITEM,
  );
  return $items;
}
```

^ Again creating a custom page to get started.

---

# Restaurants Custom Module (lfjs_custom)

PHP - (lfjs_custom.module)

```php
function _restaurants_custom() {
  $build = array(
    'map' => array(
      '#markup' => '<div id="map-custom"></div>',
    ),
    'controls' => array(
      '#markup' => '<div class="controls">...</div>',
    ),
  );

  drupal_add_js(drupal_get_path('module', 'lfjs_custom') . '/lfjs_custom.js');
  drupal_add_css(drupal_get_path('module', 'lfjs_custom') . '/lfjs_custom.css');

  // Add leaflet library.
  libraries_load('leaflet');


  return $build;
}
```

^ I'm adding a map and some divs to create custom controls.

^ Adding css and js.

^ And making sure the leaflet library is loaded. Since I'm not using the module here, I need to take care of that manually.

---

# Restaurants Custom Module (lfjs_custom)

JS - (lfjs_custom.js)

```js
var mapOptions = {
  scrollWheelZoom: true,
  doubleClickZoom: true,
  attributionControl: false,
  zoomControl: false,
  minZoom: 8,
  maxZoom: 18
};
```

^ Look at the documentation to figure out all your options. But you want to setup your options array.

---

# Restaurants Custom Module (lfjs_custom)

JS - (lfjs_custom.js)

```js
var custom_map = L.map('map-custom', mapOptions).setView([39.9524, -75.1636], 14);
L.tileLayer('https://api.tiles.mapbox.com/...' +
  'v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'ATTRIBUTION',
  maxZoom: 18,
  id: '###',
  accessToken: '###',
}).addTo(custom_map);
```


^ Creating map and adding the tile layer. I'm using mapbox for the tile layer.

---

# Custom Map Tiles

![inline](video/watercolor.mov)

^ This is just an example of a set of map tiles I absolutely loved. I really wanted a project we could use these for but so far no luck.

---

# Restaurants Custom Module (lfjs_custom)

JS - (lfjs_custom.js)

```js
// Add point.
var marker = L.marker([39.9524, -75.1636], {custom: 'stuff'});
marker._leaflet_id = 'custom_id';
marker.bindPopup('<h1>Philadelphia</h1>');
marker.addTo(custom_map);
```

^ Here we are just adding a point.

^ This is all in a basic setup of a leaflet map. And part of their tutorials.

---

# Restaurants Custom Module (lfjs_custom)

JS - (lfjs_custom.js)

```js
$('.control.zoom-in').click(function() {
  custom_map.zoomIn();
});
```

^ I know this is a lot of code!

^ I didn't update JS so I'm using click instead of .on().

^ And this is a custom control!

^ LeafletJS provides a lot of methods you can use to create custom controls.

---

# Extending LeafletJS - Classes

JS - (lfjs_custom.js)

```js
// Extend Polyline
L.PolylineCustom = L.Polyline.extend({
  callAlert: function() {
    alert('Hello World');
  }
});

L.polylineCustom = function (latlngs, options) {
  return new L.PolylineCustom(latlngs, options);
};
```

^ Another easy thing we can do here is extend LeafeltJS classes.

^ Being Open Source you can easily look at the LeafletJS source code.

^ SO I am extending the polyline class and creating a new method to create a JS alert. I know annoying. This will be the blue line on the map.



---

# Extending LeafletJS - Markers and Paths data.

JS - (lfjs_custom.js)

```js
...
var marker = L.marker([39.9524, -75.1636], {custom: 'stuff'});
marker._leaflet_id = 'custom_id';
marker.bindPopup('<h1>Philadelphia</h1>');
marker.addTo(custom_map);
...
console.log(marker.options.custom); // = stuff
```

^ Add data to the options object and you now have access to it later on. I actually found this out by accident. Not sure if it is intentional but I love it.

^ *****

^ So these were a few items that helped me build out custom functionality in the maps.

---

# In conclusion...

- Make sure LeafletJS is the right tool for you. Always evaluate your needs.

^ 1. Leaflet might not be your answer, but it could be...

- Add some spice to your maps. With Drupal and LeafletJS you can do some cool things.

^ 2. With a little bit of time, with Drupal and leaflet you can create some really custom functionality to spice up your maps and not have a plane Jane maps.

---

# D8

- Views
  - hook\_views\_ajax\_data\_alter() -> ???
  - Ajax Commands -> Ajax API
- Custom JS
- LeafletJS module - alpha release
  - hook\_leaflet\_views\_alter\_points\_data\_alter() -> ???

^ To be honest I didn't have as much time to dig into the D8 side of things as of yet.

---

# Q/A

---