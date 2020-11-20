import React from 'react';
import SubmitButton from './SubmitButton';
import InputField from './InputField';
import UserStore from '../stores/UserStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
    }
}

render() {
    return (
        <form className="login">
            <h5>Inicio de sesión</h5>
            <div className="form-group">
                <label>Nombre de usuario:</label>
                <input type="text" name="codigoUsuario" className="form-control" />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input type="password" name="pass" className="form-control" />
            </div>
            <Link to="/">
                <button
                    className="btn btn-primary"
                >
                    Iniciar sesión
                </button>
            </Link>
            <Link to="/">
                <button
                    className="btn btn-primary"
                >
                    Cerrar sesión
                </button>
            </Link>
        </form>
    );
}


export default LoginForm;
