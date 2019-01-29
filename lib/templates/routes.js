module.exports = () => `const ctrl = require('../controllers');

const Routes = [
    {
        path:'/',
        method:'GET',
        controller: ctrl.main.home
    },
    {
        path:'/register',
        method:'POST',
        controller: ctrl.main.register
    },
    {
        path:'/private',
        method:'GET',
        auth:true,
        controller: ctrl.main.private
    },
    {
        path:'/login',
        method:'POST',
        controller: ctrl.main.login
    }
]


module.exports = Routes;`;