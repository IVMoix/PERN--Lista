const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//Crear tareas

app.post("/listas", async (req, res) => {
  try {
    const { description } = req.body;
    const newLista = await pool.query(
      "INSERT INTO lista (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newLista.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Obtener lista

app.get("/listas", async (req, res) => {
  try {
    const allLista = await pool.query("SELECT * FROM lista");
    res.json(allLista.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Obtener tareas

app.get("/listas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lista = await pool.query("SELECT * FROM lista WHERE lista_id = $1", [
      id
    ]);

    res.json(lista.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Actualizar tareas

app.put("/listas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateLista = await pool.query(
      "UPDATE lista SET description = $1 WHERE lista_id = $2",
      [description, id]
    );

    res.json("La lista de tareas se ha actualizado");
  } catch (err) {
    console.error(err.message);
  }
});

//Borrar tareas

app.delete("/listas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLista = await pool.query("DELETE FROM lista WHERE lista_id = $1", [
      id
    ]);
    res.json("La tarea a sido eliminada");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("El server ha iniciado en el puerto 5000");
});