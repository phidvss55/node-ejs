### install node_modules

`npm i`

### first step

`npm i --save-dev @babel/core @babel/node @babel/preset-env`

### second step

> create file **.babelrc** with following content

---

{
  "presets": [
    "@babel/preset-env"
  ]
}

---
### third step

`npm i express nodemon mongodb cors --save`

### serve your Server

`npm run server`

