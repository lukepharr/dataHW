var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 2.5
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibHVrZXBoYXJyIiwiYSI6ImNqZ3liOWxhcjBjYWwzM21pbmJsaGt5OTcifQ.YBqhxW8Hg0S93a42LaVWZw"
  ).addTo(myMap);
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
d3.json(url, function(response){
	// console.log(response.features)
	response.features.forEach(function(d){
		var mag = Number(d.properties.mag)
		L.circle([d.geometry.coordinates[1],d.geometry.coordinates[0]],
			{
				color: getColor(mag),
				fillOpacity: .5,
				radius: mag*30000
			}).addTo(myMap)

	})
});

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    mags = [0, 1, 2, 3, 4, 5, 7, 9],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < mags.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(mags[i]+1) + '"></i> ' +
            mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(myMap);




