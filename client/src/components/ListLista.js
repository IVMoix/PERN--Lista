import React, { Fragment, useEffect, useState } from "react";
import EditLista from "./EditLista";

const ListLista = () => {
  const [lista, setLista] = useState([]);

  const deleteLista = async (id) => {
    try {
      await fetch(`http://localhost:5000/listas/${id}`, {
        method: "DELETE",
      });

      setLista(lista.filter((item) => item.lista_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getLista = async () => {
    try {
      const response = await fetch("http://localhost:5000/listas");
      const jsonData = await response.json();

      setLista(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLista();
  }, []);

  console.log(lista);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.lista_id}>
              <td>{item.description}</td>
              <td>
                <EditLista lista={item} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteLista(item.lista_id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListLista;
