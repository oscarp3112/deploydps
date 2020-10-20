import React from 'react';
import UserStore from './stores/UserStore';
import LoginForm from './login/login';
import Carousel from 'react-bootstrap/Carousel'
import { observer } from 'mobx-react';
import SubmitButton from './login_modules/SubmitButton';
import NavC from './navbars/navC';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Mascota from './mascotas/AppMascotasUsuario';
import MascotaE from './mascotas/AppMascotas';
import ServiciosC from './servicios/AppServiciosUsuario';
import ServiciosE from './servicios/AppServicios';
import CitasC from './citas/AppCitasUsuario';
import CitasE from './citas/AppCitas';
import DetallesC from './detalles/AppDetallesCitaUsuario';
import DetallesE from './detalles/AppDetallesCita';
import './App.css';
import imagen1 from './img/vete1.jpg'
import imagen2 from './img/vete2.jpg'
import imagen3 from './img/vete3.jpg'


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (localStorage.getItem('user')) {
            UserStore.loading = false;
            UserStore.isLoggedIn = true;
            UserStore.username = localStorage.getItem('user');
            UserStore.role = localStorage.getItem('rol');
        } else {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async componentDidUpdate() {
        if (localStorage.getItem('user')) {
            UserStore.loading = false;
            UserStore.isLoggedIn = true;
            UserStore.username = localStorage.getItem('user');
            UserStore.role = localStorage.getItem('rol');
        } else {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    render() {
        if (UserStore.loading) {
            return (
                <div className="app">
                    Loading...
                </div>
            );
        } else {
            if (UserStore.isLoggedIn) {
                if (UserStore.role == 'Cliente') {
                    return (
                        <Router>
                            <div className="app">
                                <NavC />
                                <Switch>
                                    <Route path="/" exact component={Home}></Route>
                                    <Route path="/mascotas" exact component={Mascota}></Route>
                                    <Route path="/servicios" exact component={ServiciosC}></Route>
                                    <Route path="/citas" exact component={CitasC}></Route>
                                    <Route path="/citas/:id" component={DetallesC}></Route>
                                </Switch>
                            </div>
                        </Router>
                    );
                } else {
                    return (
                        <Router>
                            <div className="app">
                                <NavC />
                                <Switch>
                                    <Route path="/" exact component={Home}></Route>
                                    <Route path="/mascotas" exact component={MascotaE}></Route>
                                    <Route path="/servicios" exact component={ServiciosE}></Route>
                                    <Route path="/citas" exact component={CitasE}></Route>
                                    <Route path="/citas/:id" component={DetallesE}></Route>
                                </Switch>
                            </div>
                        </Router>
                    );
                }

            } else {
                return (
                    <Router>
                        <div className="app">
                            <div className="container">
                                <Route exact path="/" component={LoginForm}></Route>
                                <Route path="/mascotas" exact component={LoginForm}></Route>
                                <Route path="/servicios" exact component={LoginForm}></Route>
                                <Route path="/citas" exact component={LoginForm}></Route>
                                <Route path="/citas/:id" component={LoginForm}></Route>
                            </div>
                        </div>
                    </Router>
                )
            }
        }
    }
}
//Componente nuevo
const Home = () => (
    <div>
        <br/>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <h1>Welcome {UserStore.username}, {UserStore.role}</h1>
        </div>
        <br/><br/>
        <br/><br/>
        <div>
        <Carousel>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagen1}
              />
                <Carousel.Caption>
                    <h3>NiceSnippets.com slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagen2}
                />
            
                <Carousel.Caption>
                    <h3>NiceSnippets.com slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagen3}
                />
            
                <Carousel.Caption>
                    <h3>NiceSnippets.com slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    </div>
);
export default observer(App);
