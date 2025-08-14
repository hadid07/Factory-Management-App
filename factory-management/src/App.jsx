import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Expenses from './pages/Expenses';
import Customers from './pages/Customers';
import Items from './pages/Items';
import Reports from './pages/Reports';

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path = '/sales'element={<Sales/>}/>
        <Route path = '/expenses' element={<Expenses/>}/>
        <Route path = '/customers' element={<Customers/>}/>
        <Route path = '/items' element={<Items/>}/>
        <Route path = '/reports' element={<Reports/>}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
