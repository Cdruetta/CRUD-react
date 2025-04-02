import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [objetos, setObjetos] = useState([]);
  const [idDelete, setIdDelete] = useState(null);

  const getObjetos = async () => {
    try {
      const response = await fetch('https://api.restful-api.dev/objects');
      if (!response.ok) throw new Error('Error al obtener objetos');
      const data = await response.json();
      setObjetos(data);
    } catch (error) {
      console.error('Error al obtener los objetos:', error);
    }
  };

  useEffect(() => {
    getObjetos();
  }, []);

  const eliminarObjeto = async () => {
    const id = localStorage.getItem('idEliminar');
    if (!id) return;
    try {
      const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Se Eliminó Exitosamente');

        setObjetos((prevObjetos) => prevObjetos.filter(obj => obj.id !== id));
        localStorage.removeItem('idEliminar');
      } else {
        console.error('No se pudo eliminar el objeto');
      }
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
    }
  };

  useEffect(() => {
    if (idDelete !== null) {
      eliminarObjeto();
      setIdDelete(null);
    }
  }, [idDelete]);

  const handleDelete = (id) => {
    localStorage.setItem('idEliminar', id);
    setIdDelete(id);
  };

  return (
    <div>
      <h1>Lista de Objetos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {objetos.map((objeto) => (
            <tr key={objeto.id}>
              <td>{objeto.name}</td>
              <td>
                <button onClick={() => handleDelete(objeto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
