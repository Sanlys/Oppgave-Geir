const Url='http://localhost:500/'

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
	table = document.getElementById('DeleteTableTittel').value
	fetch(Url+'deleteTable', {
				method: 'GET',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"table": table
				}
	}).then(response => console.log(response.json()))
}

function createEntryElement() {
	id=5
	table = document.getElementById('ElementTable').value
	tittel = document.getElementById('ElementTittel').value
	body = document.getElementById('ElementBody').value

	var urlencoded = new URLSearchParams();
	urlencoded.append("ID", id)
	urlencoded.append("table", table)
	urlencoded.append("title", tittel)
	urlencoded.append("body", body)
	
	fetch(Url+'createElement', {
		method: 'POST',
		body: urlencoded,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(response => console.log(response.text()))
}

function deleteEntryElement() {
	table = document.getElementById('DeleteElementTable').value
	id = document.getElementById('DeleteElementID')

	var urlencoded = new URLSearchParams();
	urlencoded.append("ID", id)
	urlencoded.append("table", table)

	fetch(Url+'deleteElement', {
		method: 'POST',
		body: urlencoded,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(response => console.log(response.text()))
}