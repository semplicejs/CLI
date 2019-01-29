module.exports = () => `const Semplice = require('semplice');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const server = new Semplice();
const port = 3000;

routes.map(e => server.addRoute(e));

mongoose.connect('', err => {
    if(err){return console.log('Error database:',err)}
    console.log('Success connect DB');
})

server.listen(port, (err) => {
    if (err) {console.log('error', err)}
    console.log('Running server in port',port);
});`;