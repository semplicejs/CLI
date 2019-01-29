const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const tmpPkg = require('./templates/package');
const main = require('./templates/main');
const imports = require('./templates/imports');
const controller_main = require('./templates/main_controller');
const routes_simple = require('./templates/routes_simple');
const routes = require('./templates/routes');
const controller_simple = require('./templates/controller_simple');
const main_simple = require('./templates/main_simple');
const model_user = require('./templates/model_user');
const check = chalk.green('...OK');
const cmd = require('node-cmd');
const msgDependencies = () => console.log(chalk.cyan('\n -----------> install dependecies <----------- \n'));

const files = {
    generatePkgJSON: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/package.json`),tmpPkg(obj.name,obj.description,obj.author,obj.license,obj.homepage,obj.repository,cb),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create file package.json ' + obj.name),check);
                cb();
            }
        })
    },

    generateFolderProject: (obj,cb) => {
        fs.mkdir(path.join(path.resolve(),String(obj.name)), err => {
            if(err){
                return console.log(err);
            } else {
                console.log(chalk.cyan('Semplice -> create folder for proyect for ' + obj.name),check);
                cb();
            }
        })
    },
    generateFolders: (obj,dirs,cb) => {
        for(let i = 0; i < dirs.length; i++){
            fs.mkdir(path.join(path.resolve(),String(obj.name),dirs[i].dir), err => {
                if(err){
                    return console.log(err);
                } else {
                    console.log(chalk.cyan('Semplice -> create folder ' + dirs[i].name),check);
                }
            })

            if(i == dirs.length - 1){
                cb();
            }
        }
    },
    generateMainFile: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/index.js`),main(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create main file'),check);
                cb();
            }
        })
    }, 
    generateRoutesFiles: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/routes/routes.js`),routes(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create routes file'),check);
                cb();
            }
        })
    },

    generateImportsControllers: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/controllers/index.js`),imports(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create imports controllers file'),check);
                cb();
            }
        })
    },

    generateMainControllers: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/controllers/main.js`),controller_main(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create controller main file'),check);
                cb();
            }
        })
    },

    generateModelUser: (obj,cb) => {
        fs.writeFile(path.join(path.resolve(),`${obj.name}/models/User.js`),model_user(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create model user file'),check);
                cb();
            }
        })
    },

    generateProyectSimple: (obj,cb) => {

        fs.writeFile(path.join(path.resolve(),`${obj.name}/index.js`),main_simple(obj.name),function(error){
            if(error){
                return console.log(chalk.red(error));
            } else {
                console.log(chalk.cyan('Semplice -> create main file'),check);
                
                fs.writeFile(path.join(path.resolve(),`${obj.name}/controllers/main.js`),controller_simple(obj.name),function(error){
                    if(error){
                        return console.log(chalk.red(error));
                    } else {
                        console.log(chalk.cyan('Semplice -> create controller main file'),check);
        
                        files.generateImportsControllers(obj,function(){
                            
                            fs.writeFile(path.join(path.resolve(),`${obj.name}/routes/routes.js`),routes_simple(obj.name),function(error){
                                if(error){
                                    return console.log(chalk.red(error));
                                } else {
                                    console.log(chalk.cyan('Semplice -> create routes file'),check);
                                    cb();
                                }
                            })
                        })
                    }
                })
            }
        })
    },

    generateProyectMongoDB: (obj,cb) => {

        files.generateMainFile(obj,function(){
            files.generateImportsControllers(obj,function(){
                files.generateMainControllers(obj,function(){
                    files.generateModelUser(obj,function(){
                        files.generateRoutesFiles(obj,function(){
                            cb();
                        })
                    })
                })    
            })
        })  
    },

    successSimple: (obj,cb) => {
        msgDependencies();
        files.installDependencies(obj.name,'semplice',cb);
        
    },
    successMongodb: (obj,cb) => {
        msgDependencies();
        files.installDependencies(obj.name,'semplice mongoose',cb);
    },

    installDependencies: (folder,command,cb) => {
        cmd.get(
            `cd ${path.join(path.resolve(),folder)}
            npm install --save ${command}`,function(data, err, stderr){
                if (!err) {
                    console.log(chalk.green('Semplice -> dependencies installed'));
                } else {
                    //console.log(chalk.red('Semplice -> Error:', err));
                }

                cb();
            }
        )
    }

};


module.exports = files;