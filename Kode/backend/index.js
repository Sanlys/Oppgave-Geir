const express = require('express')
const app = express()
const bp = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const JSON = require('JSON')
const port = 500
const {publicEncrypt, privateDecrypt} = require('crypto')
const {publicKey, privateKey} = require ('./keypair')

function test() {
	var message = "Testing testing beeeeeeeeeep"

	const cipherText = publicEncrypt(
		publicKey,
		Buffer.from(message)
	);
	console.log(cipherText.toString('hex'))

	const plainText = privateDecrypt(
		privateKey,
		cipherText
	)
	console.log(plainText.toString('utf-8'))
}

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
	return(cipherText.toString('hex'))
}

console.log(encrypt("Hei", publicKey))
console.log(decrypt(
	"5f7e199fb00de1f5173c84b10e89dfda0eb19e17df87fd73be5be951491ae7650daf0f42688509f0f33bf50ce78747a173fc5dd2676aca373dad560c6b258dbbaadd23a00a5618d7b952e55b555acffb844c4e2373a887ca844e41f46356b00bba859247e13243f7a95d89c1fba12bab835d0a74db6ce7c214b6657288b400b1c2586a1db0cc811f805eb63c20aa4455a28a22e11df1c4854a2066a812754e08ddc794d94569cfbdaab03f1130c05b22396776dfea4177eeca01324cb619700228376e125b54d555213dc8ae3ab44147bc97ed6e20081cf45943f33dee1743f408ec512b092ad11ad92bea40d8c14b318a94b31d72b6dd2a70443d0ed74ff2f3b214159dac64bc732bba1728e9992ee6896c9991c44b35d5efdc6fb07e9904ef46ed0cc906ad187b48235841303216025598af00e1b1c636c9ffcd440e2d598f0b0c3a795498423ed1b02141710afb0b24c5243d0b2679e53338c9ba1f325ba8d5119be63d7b94da53700239745f7a59b1511a1f009772ea1bc98311d766789a3740d8505ac0ad145604826d77592e12c3f38430917f41656ee9f7221a73a7b0d472d2b427a9958703270c38131603598f4021d3df3c2d81a3ebb35dd3fd1b079a97ef92ac57b10da3a3767ee820db183ab86cdf9210e825ba67fac362ab91dcd0cbc16936b75c93cf6eef767fab7e6c08b00c18d0a9d7f31dba281dd4fb0447"
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