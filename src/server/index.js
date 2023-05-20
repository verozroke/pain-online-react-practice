// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()

const PORT = 3000

app.ws('/connect', (ws, req) => {
    console.log('Connected')
    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch(message.method) {
            case 'connection':
                connectionHandler(ws, message)
                break
            case 'draw':
                broadCastConnection(ws, message)
                break
        }
        console.log(message)
    })
})

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})



const connectionHandler = (ws, message) => {
    ws.id = message.id
    broadCastConnection(ws, message)
}

const broadCastConnection = (ws, message) => {
    aWss.clients.forEach(client => {
        if (client.id === ws.id) {
            client.send(JSON.stringify(message))
        }      
    })
}
