#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
var credentials


const folders = [
    {dir:'/controllers',name:'controllers'},
    {dir:'/models',name:'models'},
    {dir:'/public',name:'public'},
    {dir:'/routes',name:'routes'}
]


clear();
console.log(
    chalk.yellow(
        figlet.textSync('Semplice', {
            horizontalLayout: 'full'
        })
    )
);

const msgFinal = (folder) => {
    console.log(chalk.bold.underline.italic.black("\nYou have created a new project, now go to the folder of your project and run it with the following commands.\n\n"))
    console.log(chalk.bold.black("cd",folder,"&& npm start"),"\n\n");
}
const success = () => console.log(
    chalk.green(
        figlet.textSync('Congratulations')
    )
);


const run = async () => {
    credentials = await inquirer.ask();

    console.log(chalk.cyan('\n -----------> Initiating process <----------- \n'));

    files.generateFolderProject(credentials,function(){
        files.generatePkgJSON(credentials,function(){
            files.generateFolders(credentials,folders,function(){
                switch(credentials.database){
                    case 'no':
                        files.generateProyectSimple(credentials,function(){
                            files.successSimple(credentials, function(){
                                success();
                                msgFinal(credentials.name);
                            })
                        });
                        break;
                    case 'mongodb':
                        files.generateProyectMongoDB(credentials,function(){
                            files.successMongodb(credentials,function(){
                                success();
                                msgFinal(credentials.name);
                            })
                        })
                        break;
                }
            })
        })
    })
}
run();