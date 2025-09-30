import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeComponent from './Components/EmployeeComponent'
import { List } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="d-flex flex-column min-vh-100">
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element ={<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element ={<ListEmployeeComponent/>}></Route>
        <Route path='/add-employee' element ={<EmployeeComponent/>}></Route>
        <Route path='/update-employee/:id' element ={<EmployeeComponent/>}></Route>
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  </div>
  );
}

export default App
