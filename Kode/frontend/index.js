function getUrl() {
	var port = document.getElementById('port').value
	if(port == '') {
		port = 8000
	}
	var Url=`http://localhost:${port}/`
	return Url
}

function createTable() {
	tittel = document.getElementById('tittel').value
	data = document.getElementById('data').value

	var urlencoded = new URLSearchParams();
	urlencoded.append("tittel", tittel)
	urlencoded.append("data", data)
	
	fetch(getUrl()+'createTable', {
			    method: 'POST',
			    body: urlencoded,
			    headers: {
			    	"Content-Type": "application/x-www-form-urlencoded"
			    }
	});
}

function getTable() {
	table = document.getElementById('GetTableTittel').value
	fetch(getUrl()+'getTable', {
			    method: 'GET',
			    headers: {
			    	"Content-Type": "application/x-www-form-urlencoded",
			    	"table": table
			    }
	}).then(response => console.log(response.json()))
}

function deleteTable() {
	table = document.getElementById('DeleteTableTittel').value
	fetch(getUrl()+'deleteTable', {
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
	
	fetch(getUrl()+'createElement', {
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

	fetch(getUrl()+'deleteElement', {
		method: 'POST',
		body: urlencoded,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(response => console.log(response.text()))
}
