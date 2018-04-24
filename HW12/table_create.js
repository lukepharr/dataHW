var columns = ['datetime','city','state','country','shape','durationMinutes','comments']
for (var i=0; i<dataSet.length; i++){
	var table = document.getElementById('table');
	var tr = document.createElement('tr');
	for (var j=0; j<columns.length; j++){
		var td = document.createElement('td')
		td.innerHTML=dataSet[i][columns[j]]
		tr.appendChild(td)
	}
	table.appendChild(tr);

}