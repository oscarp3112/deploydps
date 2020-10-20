import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App() {

    //idusuario sería la ID del usuarió obtenida al iniciar la sesión
    var idusuario = localStorage.getItem('user');
    const baseUrl = "https://dpsoscarpalacios.000webhostapp.com/mascotas.php/?id='"+idusuario+"'";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [mascotaSeleccionada, setmascotaSeleccionada] = useState({
        idmascotas: '',
        nombre: '',
        especie: '',
        raza: '',
        fecha_nacimiento: '',
        iddueno: '',
        notas: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setmascotaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(mascotaSeleccionada);
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    /*
    const postPosts = () => {
      axios
        .post(baseUrl, {
          title: "id",
          body: "2"
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    };*/

    const peticionGet = async () => {
        // postPosts();
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        var f = new FormData();
        f.append("nombre", mascotaSeleccionada.nombre);
        f.append("especie", mascotaSeleccionada.especie);
        f.append("raza", mascotaSeleccionada.raza);
        f.append("fecha_nacimiento", mascotaSeleccionada.fecha_nacimiento);
        f.append("iddueno", localStorage.getItem('user'));
        f.append("notas", mascotaSeleccionada.notas);

        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        var f = new FormData();
        f.append("nombre", mascotaSeleccionada.nombre);
        f.append("especie", mascotaSeleccionada.especie);
        f.append("raza", mascotaSeleccionada.raza);
        f.append("fecha_nacimiento", mascotaSeleccionada.fecha_nacimiento);
        f.append("iddueno", mascotaSeleccionada.iddueno);
        f.append("notas", mascotaSeleccionada.notas);

        f.append("METHOD", "PUT");
        await axios.post(baseUrl, f, { params: { idmascotas: mascotaSeleccionada.idmascotas } })
            .then(response => {
                var dataNueva = data;
                dataNueva.map(mascotas => {
                    if (mascotas.idmascotas === mascotaSeleccionada.idmascotas) {
                        mascotas.nombre = mascotaSeleccionada.nombre;
                        mascotas.especie = mascotaSeleccionada.especie;
                        mascotas.raza = mascotaSeleccionada.raza;
                        mascotas.fecha_nacimiento = mascotaSeleccionada.fecha_nacimiento;
                        mascotas.iddueno = mascotaSeleccionada.iddueno;
                        mascotas.notas = mascotaSeleccionada.notas;

                    }
                });
                setData(dataNueva);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, { params: { idmascotas: mascotaSeleccionada.idmascotas } })
            .then(response => {
                setData(data.filter(mascotas => mascotas.idmascotas !== mascotaSeleccionada.idmascotas));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarMascota = (mascotas, caso) => {
        setmascotaSeleccionada(mascotas);

        (caso === "Editar") ?
            abrirCerrarModalEditar() :
            abrirCerrarModalEliminar()
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <br />
            <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
            <br /><br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Fecha de nacimiento</th>
                        <th>Notas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(mascotas => (
                        <tr key={mascotas.idmascotas}>
                            <td>{mascotas.idmascotas}</td>
                            <td>{mascotas.nombre}</td>
                            <td>{mascotas.especie}</td>
                            <td>{mascotas.raza}</td>
                            <td>{mascotas.fecha_nacimiento}</td>
                            <td>{mascotas.notas}</td>

                            <td>
                                <button className="btn btn-primary" onClick={() => seleccionarMascota(mascotas, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={() => seleccionarMascota(mascotas, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}


                </tbody>

            </table>


            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar mascota</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                        <br />
                        <label>Especie: </label>
                        <br />
                        <input type="text" className="form-control" name="especie" onChange={handleChange} />
                        <br />
                        <label>Raza: </label>
                        <br />
                        <input type="text" className="form-control" name="raza" onChange={handleChange} />
                        <br />
                        <label>Fecha de nacimiento: </label>
                        <br />
                        <input type="text" className="form-control" name="fecha_nacimiento" onChange={handleChange} />
                        <br />
                        <label>Id dueño: </label>
                        <br />
                        <input type="text" className="form-control" readOnly name="iddueno" value={idusuario} onChange={handleChange} />
                        <br />
                        <label>Notas: </label>
                        <br />
                        <input type="text" className="form-control" name="notas" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar mascota</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="nombre" onChange={handleChange} value={mascotaSeleccionada && mascotaSeleccionada.nombre} />
                        <br />
                        <label>Especie: </label>
                        <br />
                        <input type="text" className="form-control" name="especie" onChange={handleChange} value={mascotaSeleccionada && mascotaSeleccionada.especie} />
                        <br />
                        <label>Raza: </label>
                        <br />
                        <input type="text" className="form-control" name="raza" onChange={handleChange} value={mascotaSeleccionada && mascotaSeleccionada.raza} />
                        <br />
                        <label>Fecha de nacimiento:asdasdasdasdas </label>
                        <br />
                        <input type="text" className="form-control" name="fecha_nacimiento" onChange={handleChange} value={mascotaSeleccionada && mascotaSeleccionada.fecha_nacimiento} />
                        <br />
                        <label>Id dueño: </label>
                        <br />
                        <input type="text" className="form-control" readOnly name="iddueno" value={idusuario} onChange={handleChange} />
                        <br />
                        <label>Notas: </label>
                        <br />
                        <input type="text" className="form-control" name="notas" onChange={handleChange} value={mascotaSeleccionada && mascotaSeleccionada.notas} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar la mascota: {mascotaSeleccionada && mascotaSeleccionada.nombre}?
        </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>
                        Sí
          </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalEliminar()}
                    >
                        No
          </button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default App;