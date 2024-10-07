const http = require('http');

//import {Controller} from './controller.js';
//
class Controller {
  constructor () {
    this.value = null;
  }

  get() {
    console.log(this.value + " solicitado!");
    return this.value;
  }

  set(value) {

    this.value = value;
    console.log(this.value + " inserido com sucesso!");
  }
}
const controller = new Controller();


const handdleRequest = (request, response) => {
  
  let body = '';

  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => {

   
    switch (request.url) {
      case '/':
        response.end('Bienvenido a la pagina princilap!');
        break;
      case '/sobre':
        response.end('Sobre');
        break;
      case '/inserir-produto':
      const data = JSON.parse(body);
      controller.set(data);
        response.end('Produto inserido com sucesso!')
        break;
      case '/obter-produto':
        response.end(JSON.stringify(controller.get()));
        break;
      default:
        response.statusCode = 404;
        response.end('404 Page not found');
    }
  })
}


const server = http.createServer(handdleRequest)

const port = 8080

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
})


