const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Intermediario
app.use(cors());
app.use(express.json());

//RUTAS

//Crear tarea
app.post("/lista", async (req, res) => {
    try {
        const { description } = req.body;
        const newLista = await pool.query(
            "INSERT INTO lista (description) VALUES ($1) RETURNING *"
            [description]
        );
        res.json(newLista.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Obtener todos los elementos de la lista

app.get("/lista", async (req, res) => {
    try {
        const allLista = await pool.query("SELECT * FROM lista");
        res.json(allLista.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Obtener un elemento de la lista

app.get("/lista/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await pool.query("SELECT * FROM lista WHERE lista_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Actualizar Lista

app.put("/lista/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateLista = await pool.query(
            "UPDATE Lista SET description = $1 WHERE lista_id = $2",
            [description, id]
        );
        res.json("La lista se ha actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

//Eliminar elementos de la lista

app.delete("/lista/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteLista = await pool.query("DELETE FROM lista WHERE lista_id = $1",
            [id]);
        res.json("La tarea se ha eliminado");
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("el server ha iniciado en el puerto 5000");
});