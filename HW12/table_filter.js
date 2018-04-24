function filter() {
	var table = document.getElementById('table');
	var tr = getElementsByTagName('tr');
	var filter = document.getElementsById('input');
	for (var i=1;i<table.length;i++){
		var td = tr[i].getElementsByTagName('td');
		for (var j=0;j<5;j++){
			if (td[j].indexOf(filter[j]) > -1){
				tr[i].style.display = "";
			}
			else {
				tr[i].style.display = "none";
				break;
			}
		}
	}
}