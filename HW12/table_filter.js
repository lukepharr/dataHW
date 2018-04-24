function filter0() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input0');

	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		if (td[0].indexOf(filter[0]) > -1){
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
			break;
			}
		}
	}


function filter1() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input1');

	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		if (td[1].indexOf(filter[1]) > -1){
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
			break;
			}
		}
	}


function filter2() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input2');

	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		if (td[2].indexOf(filter[2]) > -1){
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
			break;
			}
		}
	}


function filter3() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input3');

	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		if (td[3].indexOf(filter[3]) > -1){
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
			break;
			}
		}
	}


function filter4() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input4');

	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		if (td[4].indexOf(filter[4]) > -1){
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
			break;
			}
		}
	}


