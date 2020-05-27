import React,{useState} from 'react';
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import Mona from './components/index/Mona'
import Gastos from './components/index/Gastos'
import Ahorros from './components/index/Ahorros'

import GastoTabla from './components/expend/GastoTabla'

import MonaView from './components/mona/MonaTabla'
import AhorroView from './components/ahorro/AhorroTabla'

import Chart from './components/PruebaChart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  
  const [usuario, setUsuario] = useState(null);

  const onLoginSuccess = (loggedUser) =>{
    
    setUsuario(loggedUser);
  }
  
  const onLogout = ()=>{

    let url = 'http://localhost:3000/auth'

    fetch(url, {
                  method: 'DELETE',
                  credentials: 'include'
               }
  ).then (response => response.json() )
  .then( data=>{
                  setUsuario(null);
               }) 
  }

  
  return (
    
  <Router>
  
  <NavigationBar user={usuario}
                 handleLoginSuccess={onLoginSuccess} 
                 handleLogout={onLogout}/>
    <Switch>
      
    <Route exact path='/' 
          children= {
                      <>
                        <Link to="/mona">
                          <Mona />
                        </Link>
      
                        <Link to="/expend">
                          <Gastos/>
                        </Link>
                        
                        <Link to="/save">
                          <Ahorros />
                        </Link>
                      </>
                    } />
          
      <Route exact path='/expend' 
        children= {
                    <>
                      <GastoTabla />
                    </>
                  } />
      
      <Route exact path='/mona' 
            children= {
                        <>
                          <MonaView />
                        </>
                      } />
          
      <Route exact path='/save' 
        children= {
                    <>
                      <AhorroView />
                    </>
                  } />

      
    
    </Switch>

  {/* <Footer /> */}
  
  </Router>

  );
}

export default App;

