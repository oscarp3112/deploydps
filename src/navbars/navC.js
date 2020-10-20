import React from 'react';
import UserStore from '../stores/UserStore';
import SubmitButton from '../login_modules/SubmitButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory'

class NavC extends React.Component {
    async doLogout() {
        try {
            var res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            var result = await res.json();
            if (result && result.success) {
                localStorage.clear();
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand to="/">Veterinaria</Navbar.Brand>
      <Nav className="mr-auto">
    <table>
        <tr>
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <td><Link to="/" style={{color: "white"}}>Inicio</Link> {"  "}</td>
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <td><Link to="/mascotas" style={{color: "white"}}>Ver mascotas</Link>{"  "}</td>
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <td><Link to="/Servicios" style={{color: "white"}}>Servicios</Link>{"  "}</td>
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <td><Link to="/citas" style={{color: "white"}}>Citas</Link></td>
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
            <th></th>            <th></th>             <th></th>              <th></th> 
        </tr>
    </table>   
      </Nav>
      <Link to="/">
                    <SubmitButton
                        text='Cerrar Sesión'
                        disabled={false}
                        onClick={() => { localStorage.clear();
                        console.log("Sesión cerrada");
                        const history = createHistory();
                        history.go(0);    
                    }}
                    />
      </Link>
      </Navbar>         
        );
    }
}

export default NavC;
