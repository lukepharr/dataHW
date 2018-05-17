var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 2.5
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibHVrZXBoYXJyIiwiYSI6ImNqZ3liOWxhcjBjYWwzM21pbmJsaGt5OTcifQ.YBqhxW8Hg0S93a42LaVWZw"
  ).addTo(myMap);

d3.json(url, function(response){
	// console.log(response.features)
	response.features.forEach(function(d){
		L.circle(d.geometry.coordinates.slice(0,2))
		// console.log(d.geometry.coordinates.slice(0,2))
		
	})
 })