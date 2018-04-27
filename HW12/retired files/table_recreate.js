function recreate(){
	var table=document.getElementById('table')
	table.innerHTML="<tr id='tr0'> <td>Datetime</td> <td>City</td> <td>State</td> <td>Country</td> <td>Shape</td> <td>Duration in Minutes</td><td>Comments</td>	</tr>"
	var columns = ['datetime','city','state','country','shape','durationMinutes','comments']
loop1:
	for (var i=0; i<50; i++){
		var tr = document.createElement('tr');
		var filters = [document.getElementById('input0'), document.getElementById('input1'), document.getElementById('input2'), document.getElementById('input3'), document.getElementById('input4')];
	loop2:
		for (var j=0; j<5; j++){
			if (dataSet[i][columns[j]].includes(filters[j].value)){
				var td = document.createElement('td')
				td.innerHTML=dataSet[i][columns[j]]
				tr.appendChild(td)}
			else {
				//console.log(dataSet[i][columns[j]].indexOf(filters[j]))
				continue loop1;}
		}
		for (var k=5; k<7; k++){
			var td_ = document.createElement('td')
			td_.innerHTML=dataSet[i][columns[k]]
			tr.appendChild(td_)			
		}
		table.appendChild(tr);

	}
}