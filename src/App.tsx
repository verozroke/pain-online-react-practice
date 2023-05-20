
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'
import './styles/app.scss'
import  Canvas  from './components/Canvas';
import { BrowserRouter, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  return (
          <div className="app">
            <Routes>
              <>
                <Route path="/:id" element={
                  <>
                    <Toolbar/>
                    <SettingBar/>
                    <Canvas />
                  </>
                }/> 
              </>
            </Routes>
          </div>
  )
}

export default App
