import React from 'react'
import '../styles/toolbar.scss'
import toolState from '../store/toolState'
import canvasState from '../store/canvasState'
import Brush from '../tools/Brush.js'
import Rect from '../tools/Rect.js'
const Toolbar = () => {

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    return (
        <div className='toolbar'>
            <button className="toolbar__btn brush" onClick={() => {toolState.setTool(new Brush(canvasState.canvas))}}></button>
            <button className="toolbar__btn circle"></button>
            <button className="toolbar__btn eraser"></button>
            <button className="toolbar__btn line"></button>
            <input onChange={e => changeColor(e)} type="color" style={{marginLeft: 10}}/>
            <button className="toolbar__btn rect" onClick={() => {toolState.setTool(new Rect(canvasState.canvas))}}></button>
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}></button>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()}></button>
            <button className="toolbar__btn save"></button>
        </div>
    )
}

export default Toolbar