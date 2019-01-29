module.exports = (project,desc,author,license,homepage,repository) => `{
    "name": "${project}",
    "version": "0.0.1",
    "description": "${desc}",
    "main": "index.js",
    "scripts": {
        "start":"node index"
    },
    "keywords": [],
    "author": "${author}",
    "license": "${license}",
    "homepage": "${homepage}",
    "repository": "${repository}"
  }
  `