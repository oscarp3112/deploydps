import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="https://dpsoscarpalacios.000webhostapp.com/servicios.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [servicioSeleccionado, setservicioSeleccionado]=useState({
    idServicio: '',
    nombreServicioServicio: '',
    tiempoEstimado: '',
    precio: '',
    img: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setservicioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(servicioSeleccionado);
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
    f.append("nombreServicio", servicioSeleccionado.nombreServicio);
    f.append("tiempoEstimado", servicioSeleccionado.tiempoEstimado);
    f.append("precio", servicioSeleccionado.precio);
    f.append("img", servicioSeleccionado.img);



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
    f.append("nombreServicio", servicioSeleccionado.nombreServicio);
    f.append("tiempoEstimado", servicioSeleccionado.tiempoEstimado);
    f.append("precio", servicioSeleccionado.precio);
    f.append("img", servicioSeleccionado.img);

    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {idServicio: servicioSeleccionado.idServicio}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(servicios=>{
        if(servicios.idServicio===servicioSeleccionado.idServicio){
            servicios.nombreServicio=servicioSeleccionado.nombreServicio;
            servicios.tiempoEstimado=servicioSeleccionado.tiempoEstimado;
            servicios.precio=servicioSeleccionado.precio;
            servicios.img=servicioSeleccionado.img;
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
    await axios.post(baseUrl, f, {params: {idServicio: servicioSeleccionado.idServicio}})
    .then(response=>{
      setData(data.filter(servicios=>servicios.idServicio!==servicioSeleccionado.idServicio));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarServicio=(servicios, caso)=>{
    setservicioSeleccionado(servicios);

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
          <th>Servicio</th>
          <th>Tiempo estimado</th>
          <th>Precio</th>
          <th>URL imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(servicios=>(
          <tr key={servicios.idServicio}>
            <td>{servicios.idServicio}</td>
            <td>{servicios.nombreServicio}</td>
            <td>{servicios.tiempoEstimado}</td>
            <td>{servicios.precio}</td>
            <td>{servicios.img}</td>

          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarServicio(servicios, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarServicio(servicios, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar servicio</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Servicio: </label>
          <br />
          <input type="text" className="form-control" name="nombreServicio" onChange={handleChange}/>
          <br />
          <label>Tiempo estimado: </label>
          <br />
          <input type="text" className="form-control" name="tiempoEstimado" onChange={handleChange}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={handleChange}/>
          <br />
          <label>Imagen: </label>
          <br />
          <input type="text" className="form-control" name="img" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar servicio</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Servicio: </label>
          <br />
          <input type="text" className="form-control" name="nombreServicio" onChange={handleChange} value={servicioSeleccionado && servicioSeleccionado.nombreServicio}/>
          <br />
          <label>Tiempo estimado: </label>
          <br />
          <input type="text" className="form-control" name="tiempoEstimado" onChange={handleChange} value={servicioSeleccionado && servicioSeleccionado.tiempoEstimado}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="precio" onChange={handleChange} value={servicioSeleccionado && servicioSeleccionado.precio}/>
          <br />
          <label>Imagen: </label>
          <br />
          <input type="text" className="form-control" name="img" onChange={handleChange} value={servicioSeleccionado && servicioSeleccionado.img}/>
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
        ¿Estás seguro que deseas eliminar el servicio: {servicioSeleccionado && servicioSeleccionado.nombreServicio}?
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