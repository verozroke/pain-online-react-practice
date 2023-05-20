import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import '../styles/canvas.scss'
import canvasState from '../store/canvasState.js'
import toolState from '../store/toolState.js'
import Brush from '../tools/Brush.js'
import { observer } from 'mobx-react-lite'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const Canvas = observer(() => {
    const canvasRef = useRef()
    const navigate = useNavigate();
    

    const usernameRef = useRef()
    const [modal, setModal] = useState(true);

    const params = useParams()

    useEffect(() => {
            
        if(!params.id) {
            navigate(`/f${(+new Date()).toString(16)}`)
        }
        canvasState.setCanvas(canvasRef.current)
    }, [])
    
    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket('ws://localhost:3000/connect')
            canvasState.setSocket(socket)
            canvasState.setSessionID(params.id)
            toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionID))
            console.log('Подключение установлено');
            socket.onopen = () => {
                socket.send(JSON.stringify({ id: params.id , username: canvasState.username, method: 'connection' }))
            }
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data)
                if(message.username !== usernameRef.current) {
                    switch(message.method) {
                        case 'connection':
                            console.log(`Пользователь  ${message.username} подключился к серверу`);
                            break;
                        case 'draw':
                            drawHandler(message)
                            break;
                    }
                }
                // console.log(message);

            }
        }
    }, [canvasState.username])
    


    const drawHandler = (message) => {
        
        const figure = message.figure;
        const ctx = canvasRef.current.getContext('2d')
        switch(figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y)
                break
            case 'finish':
                ctx.beginPath()
                break;
        }
    }
    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)

        setModal(false)
    }


    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header >
                <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => connectionHandler()}>
                    Войти
                </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}></canvas>
        </div>
    )
})

export default Canvas
