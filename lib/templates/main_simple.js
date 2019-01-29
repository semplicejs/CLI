module.exports = () => `const Semplice = require('semplice');
const routes = require('./routes/routes');

const server = new Semplice();

const port = 3000;

routes.map(e => server.addRoute(e));

server.listen(port, (err) => {
    if (err) {console.log('error', err)}
    console.log('Running server in port', port  );
});`;