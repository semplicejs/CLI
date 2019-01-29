module.exports = () => `const ctrl = require('../controllers');

const Routes = [
    {
        path:'/',
        method:'GET',
        controller: ctrl.main.home
    }
]


module.exports = Routes;`;