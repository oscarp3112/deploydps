import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

function App() {

  //idusuario sería la ID del usuarió obtenida al iniciar la sesión
  var idusuario = localStorage.getItem('user');
  const baseUrl="https://dpsoscarpalacios.000webhostapp.com/citas.php/?id='"+idusuario+"'";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [citaSeleccionada, setcitaSeleccionada]=useState({
    idCita: '',
    codigoUsuario: '',
    fecha: '',
    hora: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setcitaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(citaSeleccionada);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

 

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("codigoUsuario", localStorage.getItem('user'));
    f.append("fecha", citaSeleccionada.fecha);
    f.append("hora", citaSeleccionada.hora);

    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("codigoUsuario", citaSeleccionada.codigoUsuario);
    f.append("fecha", citaSeleccionada.fecha);
    f.append("hora", citaSeleccionada.hora);

    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {idCita: citaSeleccionada.idCita}})
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(citas=>{
        if(citas.idCita===citaSeleccionada.idCita){
          citas.codigoUsuario=citaSeleccionada.codigoUsuario;
          citas.fecha=citaSeleccionada.fecha;
          citas.hora=citaSeleccionada.hora;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {idCita: citaSeleccionada.idCita}})
    .then(response=>{
      setData(data.filter(citas=>citas.idCita!==citaSeleccionada.idCita));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCita=(citas, caso)=>{
    setcitaSeleccionada(citas);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código de usuario</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(citas=>(
          <tr key={citas.idCita}>
            <td>{citas.idCita}</td>
            <td>{citas.codigoUsuario}</td>
            <td>{citas.fecha}</td>
            <td>{citas.hora}</td>
          <td>
          <button className="btn btn-danger" onClick={()=>seleccionarCita(citas, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar cita</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Código de usuario: </label>
          <br />
          <input type="text" className="form-control" name="codigoUsuario" onChange={handleChange} value={idusuario} readOnly/>
          <br />
          <label>Fecha: </label>
          <br />
          <input type="date" className="form-control" name="fecha" onChange={handleChange}/>
          <br />
          <label>Hora: </label>
          <br />
          <input type="time" className="form-control" name="hora" onChange={handleChange}/>
          <br />       
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar cita</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Código de usuario: </label>
          <br />
          <input type="text" className="form-control" name="codigoUsuario" onChange={handleChange} readOnly value={citaSeleccionada && citaSeleccionada.codigoUsuario}/>
          <br />
          <label>Fecha: </label>
          <br />
          <input type="text" className="form-control" name="fecha" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.fecha}/>
          <br />
          <label>Hora: </label>
          <br />
          <input type="text" className="form-control" name="hora" onChange={handleChange} value={citaSeleccionada && citaSeleccionada.hora}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar la cita del usuario código: {citaSeleccionada && citaSeleccionada.codigoUsuario}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;