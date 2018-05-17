
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
var url2 = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'

function getColor(d) {
    return d > 9 ? '#800026' :
           d > 7  ? '#BD0026' :
           d > 5  ? '#E31A1C' :
           d > 4  ? '#FC4E2A' :
           d > 3   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#FFEDA0';
}

var earthquakeMarkers = [];
var boundaryMarkers = [];

d3.json(url, function(response){
	// console.log(response.features)
	response.features.forEach(function(d){
		var mag = Number(d.properties.mag)
		earthquakeMarkers.push(L.circle([d.geometry.coordinates[1],d.geometry.coordinates[0]],
					{
						color: getColor(mag),
						fillOpacity: .5,
						radius: mag*30000
					}))

	})
});

d3.json(url2, function(response){
	// console.log(response.features)
	response.features.forEach(function(d){
		boundaryMarkers.push(
			L.polyline([d.geometry.coordinates[1],d.geometry.coordinates[0]],
					{
						color: '#199892',
						fillOpacity: 1
						
					}))

	})
});

console.log(earthquakeMarkers)
var earthquakeLayer = L.layerGroup(earthquakeMarkers);
var boundaryLayer = L.layerGroup(boundaryMarkers);

var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibHVrZXBoYXJyIiwiYSI6ImNqZ3liOWxhcjBjYWwzM21pbmJsaGt5OTcifQ.YBqhxW8Hg0S93a42LaVWZw");

// dark map tiles
var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibHVrZXBoYXJyIiwiYSI6ImNqZ3liOWxhcjBjYWwzM21pbmJsaGt5OTcifQ.YBqhxW8Hg0S93a42LaVWZw");

var satelite = L.tileLayer(    "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibHVrZXBoYXJyIiwiYSI6ImNqZ3liOWxhcjBjYWwzM21pbmJsaGt5OTcifQ.YBqhxW8Hg0S93a42LaVWZw"
  );

var baseMaps = {
  Light: light, 
  Dark: dark,
  Satelite: satelite
}

var overlayMaps = {
  Earthquakes: earthquakeLayer,
  Plates: boundaryLayer

}
// Create an overlayMaps object here to contain the "State Population" and "City Population" layers

// Modify the map so that it will have the streetmap, states, and cities layers
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 2.5
});

// Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

