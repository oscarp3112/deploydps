import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App({ match }) {

  const baseUrl = "https://dpsoscarpalacios.000webhostapp.com/detalles.php/?id='" + match.params.id + "'";
  const [data, setData] = useState([]);
  const [reciboSeleccionado, setreciboSeleccionado] = useState({
    idRecibo: '',
    idCita: '',
    idServicio: '',
    total: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setreciboSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(reciboSeleccionado);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <div className="card-deck">
        {data.map(recibo => (
          <div className="card" Style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Código de recibo: {recibo.idRecibo}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Código de cita: {recibo.idCita}</li>
              <li className="list-group-item">ID de servicio: {recibo.idServicio}</li>
              <li className="list-group-item">Total: ${recibo.total}</li>
            </ul>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

export default App;