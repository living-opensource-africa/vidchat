//Required Modules
require('dotenv').config()
const https = require('https')
const ws = require('ws')
const express = require('express')
const fs = require('fs')

// Import SSL Certificates

let cert_key = fs.readFileSync(process.env.CERT_KEY)
let cert_file = fs.readFileSync(process.env.CERT_FILE)
let page = fs.readFileSync('./index.htm')
let options = {key: cert_key, cert: cert_file}

const app = express()

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.send(page.toString())
})

let httpsServer = https.createServer(options, app)
httpsServer.listen(process.env.PORT)
console.log(`The app is running on port ${httpsServer.address().port}`)


//WebSocket Connection

let WebSocketServer = ws.Server
let wsServer = new WebSocketServer({server: httpsServer, ssl: true})
let users = {}

wsServer.on('connection', (connection) => {
    let data;
    console.log('WebSocket Connected successfully');
    connection.on('message', (message) => {
        try {
            data = JSON.parse(message);
        }
        catch (e) {
            console.log('Invalid JSON data!');
            data = {};
        }

        switch(data.type) {
            case 'login':
            console.log('Users logged: '+ data.name);
            if (users[data.name]) {
                sendTo(connection, {
                    type: 'login',
                    success: false
                })
            }
            else {
                
                users[data.name] = connection;
                connection.name = data.name;

                sendTo(connection, {
                    type: 'login',
                    success: true
                })
            }

            break;

            case 'offer':

            console.log('Sending calling offer to '+ data.name)
            var conn = users[data.name]

            if (conn != null) {
                connection.otherName = data.name;
                sendTo(conn, {
                    type: 'offer',
                    offer: data.offer,
                    name: connection.name
                })
            }

            break;

            case 'answer':

            console.log('Sending answer to '+ data.name)
            var conn  =  users[data.name]

            if (conn != null) {
                connection.otherName = data.name;
                sendTo(conn, {
                    type: 'answer',
                    answer: data.answer
                })
            }

            break;
            
            case 'candidate':

            console.log('Sending candidate to ,'+ data.name);
            var conn  = users[data.name];

            if (conn != null) {
                sendTo(conn, {
                    type: 'candidate',
                    candidate: data.candidate
                });
            }

            break;

            case 'leave':

            console.log('Disconecting from '+ data.name);
            var conn = users[data.name];
            conn.otherName = null;

            if (conn != null) {
                sendTo(conn, {
                    type: 'leave;'
                })
            }

            break;

            default:

            sendTo(connection, {
                type: 'error',
                message: 'Error, command not found: '+ data.type
            })


        }
    })

    connection.on('close', () => {
        if (connection.name) {
            delete users[connection.name];
            if (connection.otherName) {
                console.log('Disconnecting from '+ connection.otherName);
                var conn = users[connection.otherName];
                conn.otherName = null;
                sendTo(conn, {
                    type: 'leave'
                })
            }
        }
    })

    connection.send(JSON.stringify({
        source: 'Server',
        msg: 'Hello Vid streamer!'
    }))

})

    function sendTo(connection, message) {
        connection.send(JSON.stringify(message));
    }

