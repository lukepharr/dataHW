function goThere(){

	var table=document.getElementById('table')
	table.innerHTML="<tr id='tr0'> <td>Datetime</td> <td>City</td> <td>State</td> <td>Country</td> <td>Shape</td> <td>Duration in Minutes</td><td>Comments</td>	</tr>"
	var columns = ['datetime','city','state','country','shape','durationMinutes','comments']
	var dataSetF =[]
	var filters = [document.getElementById('input0'), document.getElementById('input1'), document.getElementById('input2'), document.getElementById('input3'), document.getElementById('input4')];
	var count=Number(document.getElementById('count_').value);
loop1:
	for (var h=0; h<dataSet.length; h++){
		for (var j=0; j<5; j++){
			if (dataSet[h][columns[j]].includes(filters[j].value)){}
			else {
				//console.log(dataSet[i][columns[j]].indexOf(filters[j]))
				continue loop1;}
		}
		dataSetF.push(dataSet[h]);

	}

	for (var i=(count*50); i<((count+1)*50); i++){
		var tr = document.createElement('tr');
		for (var k=0; k<7; k++){
			var td = document.createElement('td')
			td.innerHTML=dataSetF[i][columns[k]]
			tr.appendChild(td)
		}
		table.appendChild(tr);

	}
}