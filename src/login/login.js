import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import createHistory from 'history/createBrowserHistory'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
} from 'react-router-dom';

function App() {
    const baseUrl = "https://dpsoscarpalacios.000webhostapp.com/login.php";
    //const baseUrl = "http://localhost/server/login.php";
    const [data, setData] = useState([]);
    const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
        codigoUsuario: '',
        nombresUsuario: '',
        apellidosUsuario: '',
        pass: '',
        edadUsuario: '',
        dui: '',
        cargo: ''
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setusuarioSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(usuarioSeleccionado);
    }
    //aaaa
    const peticionPost = async () => {
        var f = new FormData();
        f.append("codigoUsuario", usuarioSeleccionado.codigoUsuario);
        f.append("nombresUsuario", usuarioSeleccionado.nombresUsuario);
        f.append("apellidosUsuario", usuarioSeleccionado.apellidosUsuario);
        f.append("pass", usuarioSeleccionado.pass);
        f.append("edadUsuario", usuarioSeleccionado.edadUsuario);
        f.append("dui", usuarioSeleccionado.dui);
        f.append("cargo", usuarioSeleccionado.cargo);

        f.append("METHOD", "LOGIN");
        await axios.post(baseUrl, f)
            .then(response => {
                setData(response.data);
                if (typeof response.data[0] !== 'undefined') {
                    console.log("Sesión iniciada");
                    localStorage.setItem('user', response.data[0].codigoUsuario);
                    localStorage.setItem('nombre', response.data[0].nombresUsuario);
                    localStorage.setItem('pass', response.data[0].pass);
                    localStorage.setItem('rol', response.data[0].cargo);
                    const history = createHistory();
                    history.go(0)
                }
                else {
                    console.log("Sesión fallida");
                    window.confirm('Usuario o contraseña incorrecto')

                }
            }).catch(error => {
                console.log(error);
            })
    }

    

    return (
        <div style={{ textAlign: 'center' }}>
            <br />
            <div className="form-group">
                <label>Usuario: </label>
                <br />
                <input type="text" className="form-control" name="codigoUsuario" onChange={handleChange} />
                <br />
                <label>Contraseña: </label>
                <br />
                <input type="password" className="form-control" name="pass" onChange={handleChange} />
                <br />
            </div>
            <Link to="/">
                <button className="btn btn-primary" onClick={() => peticionPost()}>Iniciar sesión</button>{"   "}
            </Link>
        </div>
    );
}

export default App;