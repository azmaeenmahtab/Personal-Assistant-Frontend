import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Register } from '../src/components/register';
import { Login } from '../src/components/login';
import { Dashboard } from '../src/components/dashboard';
import { Assistant } from '../src/components/bootforcemodel/1';
import { Plan1 } from '../src/components/bootforcemodel/plan1';
import { Plan2 } from '../src/components/bootforcemodel/plan2';
import { Plan3 } from '../src/components/bootforcemodel/plan3';
import { UtilityInput } from '../src/components/bootforcemodel/utilityInput';
import { TransportInput } from '../src/components/bootforcemodel/transportInput';
import Vehicles from './components/bootforcemodel/vehicles';
import Comparison from './components/bootforcemodel/comparison';



function App() {
  





  return <>
      <Router>
        <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/assistant' element={<Assistant />} />
      <Route path='/plan1' element={<Plan1 />} />
      <Route path='/plan2' element={<Plan2 />} />
      <Route path='/plan3' element={<Plan3 />} />
      <Route path='/utilityInput' element={<UtilityInput />} />
      <Route path='/transportInput' element={<TransportInput />} />
      <Route path='/choose-vehicle' element={<Vehicles />} />
      <Route path='/comparison' element={<Comparison />} />


      </Routes>
      </Router>
      
      
    </>
}

export default App
