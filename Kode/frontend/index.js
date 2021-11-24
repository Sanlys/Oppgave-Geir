const Url='http://localhost:8000/'

function createTable() {
	tittel = document.getElementById('tittel').value
	data = document.getElementById('data').value

	var urlencoded = new URLSearchParams();
	urlencoded.append("tittel", tittel)
	urlencoded.append("data", data)
	
	fetch(Url+'createTable', {
			    method: 'POST',
			    body: urlencoded,
			    headers: {
			    	"Content-Type": "application/x-www-form-urlencoded"
			    }
	});
}

function getTable() {
	table = document.getElementById('GetTableTittel').value
	fetch(Url+'getTable', {
			    method: 'GET',
			    headers: {
			    	"Content-Type": "application/x-www-form-urlencoded",
			    	"table": table
			    }
	}).then(response => console.log(response.json()))
}

function deleteTable() {
	table = table = document.getElementById('DeleteTableTittel').value
	fetch(Url+'deleteTable', {
				method: 'GET',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"table": table
				}
	}).then(response => console.log(response.json()))
}
