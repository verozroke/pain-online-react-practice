import React from 'react'
import toolState from '../store/toolState.js'

const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)} 
                style={{margin: '0 10px'}} 
                type="number" 
                min={1}  
                max={50} 
                defaultValue={1} 
                id='line-width'/>
            <label htmlFor="stroke-width">Цвет обводки</label>
            <input type="color" onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-width" />
        </div>

    )
}

export default SettingBar;
