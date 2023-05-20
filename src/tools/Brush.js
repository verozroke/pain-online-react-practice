import Tool from './Tool'
import canvasState from '../store/canvasState';
export default class Brush extends Tool {
    constructor(canvas, socket, sessionID) {
        super(canvas, socket, sessionID);
        this.listen()
    }
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)

    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify(
            {
                method: 'draw',
                id: this.sessionID,
                figure: {
                    type: 'finish',
                }
            }
        ))
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            // Brush.draw(this.ctx, e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify(
                {
                    method: 'draw',
                    id: this.sessionID,
                    figure: {
                        type: 'brush',
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                    }
                }
            ))
        }
    }
    
    static draw(ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}