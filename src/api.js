import express from 'express';
import bodyParser from 'body-parser';
//import http from 'http';
import Controller from './controllers/ItemController';

const app = express();
const port = 8080;
const controller = new Controller();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send("Inicio");
})

app.post('/set-product', async (request, response) => {
  try {
    const data = request.body;
    await controller.set(data);
    response.status(200).send('Produto inserido com sucesso!');
  } catch (error) {
    response.status(500).send('Erro ao inserir produto');
  }
});

app.get('/get-product', (request, response) => {
  try {
    const items = await controller.get();
    response.status(200).json(items)
  } catch (error) {
    response.status(500).send('Erro ao obter produtos');
  }
})

app.use((request, response) => {
  response.status(404).send("404 route not found");
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
})


