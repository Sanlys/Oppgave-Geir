const express = require('express')
const app = express()
const bp = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const JSON = require('JSON')
const {publicEncrypt, privateDecrypt} = require('crypto')
const {publicKey, privateKey} = require ('./keypair')

const port = 8000

//Helper functions

function decrypt(message, key) {
	const plainText = privateDecrypt(
		key,
		message
	)
	return(plainText.toString('utf-8'))
}

function encrypt(message, key) {
	const cipherText = publicEncrypt(
		key,
		Buffer.from(message)
	);
	return(cipherText)
}

console.log("Encrypred string: "+encrypt("Hei", publicKey).toString('hex'))
console.log("Decrypted string: "+decrypt(
	encrypt("Hei", publicKey)
	,privateKey
))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin:'*', credentials: true}));

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'backend',
	password: 'Mailandvgs123',
	database: 'geirOppgave'
})

/*connection.connect(function(err) {
	console.log(err)
})*/

function createTable(name) {
	connection.query('CREATE TABLE ' + name, function(result){
		console.log(result)
	})
}

function getTable(name, callback) {
	connection.query('DESCRIBE ' + name + ';', function(err, result) {
		if (err) console.log(err)
		return callback(result)
	})
}

function deleteTable(name) {
	connection.query('DROP TABLE ' + name + ';', function(err, res) {
		if (err) console.log(err)
		if (res) console.log(res)
	})
}

function createElement(ID, table, title, body) {
	console.log(`USE ${ID}`)
	console.log(`SELECT TABLE ${table}`)
	console.log(`INSERT INTO ${table}(Title, Body) VALUES ('${title}', '${body}');`)
}

function getElements(ID, table, /*callback*/) {
	console.log(`USE ${ID}`)
	console.log(`SELECT TABLE ${table}`)
	console.log(`SELECT * FROM ${table}`/*, function(err, result) {
		if (err) console.log(err)
		result = `{"Hei hei": "Wow": ${table}, "table", "ID": ${ID}}`
		return callback(result)
	}*/)
	result = `{"Hei hei": "Wow": ${table}, "table", "ID": ${ID}}`
	return(result)
}

function deleteElement(ID, table) {
	console.log(`Deleted element with ID ${ID} from the table ${table}`)
}

app.get('/getTable', function(req, res) {
	table = req.headers.table
	getTable(table, function(result) {
		/*response = {
			"Field": result[0].Field,
			"Type": result[0].Type,
			"Null": result[0].Null,
			"Key": result[0].Key,
			"Default": result[0].Default,
			"Extra": result[0].Extra
		}*/
		response = JSON.stringify(result)
		console.log(response)
		res.send(response)
	})
})

app.get('/deleteTable', function(req, res) {
	table = req.headers.table
	deleteTable(table)
	res.status(200)
})

app.post ('/createTable', function(req, res){
	response = {
		tittel: req.body.tittel,
		data: req.body.data
	}
	console.log(response)
	createTable(req.body.tittel + '(' + req.body.data + ')')
	res.send();
})

app.post('/createElement', function(req, res) {
	ID = mysql.escape(req.body.ID)
	table = req.body.table
	title = req.body.title
	body = req.body.body
	createElement(ID, table, title, body)
	res.send("Test");
})

app.get('/getElements', function(req, res) {
	id = req.headers.id
	table = req.headers.table
	result = getElements(id, table/*, function(result) {*/
		/*response = {
			"Field": result[0].Field,
			"Type": result[0].Type,
			"Null": result[0].Null,
			"Key": result[0].Key,
			"Default": result[0].Default,
			"Extra": result[0].Extra
		}*/
	)
	response = JSON.stringify(result)
	console.log(response)
	res.send(response)
	}//)
/*}*/)

app.post('/deleteElement', function(req,res){
	ID = mysql.escape(req.body.ID)
	table = mysql.escape(req.body.table)
	deleteElement(ID, table)
	res.send("OK")
})

app.listen(port, () => {
	console.log(`Listening at localhost:${port}`)
})
