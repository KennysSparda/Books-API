import http from 'http';
import Controller from './controller.js';

const controller = new Controller();

const handdleRouteRequest = (request, response) => {
  
  let body = '';

  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => {

   
    switch (request.url) {
      case '/':
        response.end("Inicio");
        break;
      case '/about':
        response.end('sobre');
        break;
      case '/set-product':
        const data = JSON.parse(body);
        controller.set(data);
        response.end('Produto inserido com sucesso!')
        break;
      case '/get-product':
        response.end(JSON.stringify(controller.get()));
        break;
      default:
        response.statusCode = 404;
        response.end('404 route not found');
    }
  })
}

const server = http.createServer(handdleRouteRequest)

const port = 8080

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
})


