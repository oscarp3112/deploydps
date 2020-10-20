import React from 'react';
import SubmitButton from './SubmitButton';
import InputField from './InputField';
import UserStore from '../stores/UserStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }


    async doLogin() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
                UserStore.role = result.cargo;
                localStorage.clear();
                localStorage.setItem('user', UserStore.username);
                localStorage.setItem('rol', UserStore.role);
                console.log(UserStore.username);
                console.log(UserStore.role);
            } else if (result && result.success == false) {
                this.resetForm();
                alert(result.msg);
            }
        } catch (error) {
            console.log(error);
            this.resetForm();
        }
    }

    render() {
        return (
            <form className="login">
                <h5>Inicio de sesión</h5>
                <div className="form-group">
                    <label>Nombre de usuario:</label>
                    <InputField
                        type='text'
                        placeholder='Código de usuario'
                        value={this.state.username ? this.state.username : ''}
                        onChange={(val) => this.setInputValue('username', val)}
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <InputField
                        type='password'
                        placeholder='Contraseña'
                        value={this.state.password ? this.state.password : ''}
                        onChange={(val) => this.setInputValue('password', val)}
                    />
                </div>
                <Link to="/">
                    <SubmitButton
                        text='Iniciar sesión'
                        disabled={false}
                        onClick={() => { this.doLogin() }}
                />
                </Link>
                <SubmitButton
                    text='Cerrar Sesión'
                    disabled={false}
                    onClick={() => { this.doLogout() }}
                />
                <Link to="/mascotas">Ver mascotas</Link>
            </form>
        );
    }
}

export default LoginForm;
