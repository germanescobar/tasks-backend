const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const store = require('./store');
const routes = require('./routes');
const User = require('./user.model');
const app = express();

// middlewares - chain of responsability
app.use(cors());
app.use(express.json()); // parsea el body a JSON

const uri =
  'mongodb+srv://Cesar-Diaz:vacivusVoid1%40@cluster0.ybria.mongodb.net/Agora?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully');
});

async function run() {
  try {
    // crear un documento
    // const user = new User({
    //   email: 'david@example.com',
    //   password: 'test1234',
    //   firstName: 'David',
    //   lastName: 'Rodriguez',
    // });
    // await user.save(); // guarde en la base de datos
    /*await Post.create({ userId: "613233fb5f971766ecd37366", title: "Tercer post", content: "Contenido del tercer post",
    tags: ["mongodb", "code"]})*/
    // actualizar un documento
    // eliminar un documento
    /*const post = await Post.findOne({ _id: "61376fe376f579016904d9e7" })
    await post.remove()*/
    // await Post.deleteOne({ _id: "61376fe376f579016904d9e7" })
    // listar documentos
    // const results = await Post.find()
    // console.log(results)
    // const user = await User.authenticate("david@example.com", "testddd1234")
    // console.log("User: ", user)
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('Error de validación:', err.errors);
    } else {
      console.log(err);
    }
  }
}

run();
// rutas - endpoints - controladores
app.use(routes);

// manejo global de errores
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

app.listen(3001, () => console.log('Servidor corriendo ...'));

// AJAX (Asynchronous JavaScript And XML) - llamados del cliente a servidor
// Google Maps
