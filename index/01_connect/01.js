const Sequelize = require('sequelize')

// connect to mySQL database created earler: 'sequelize_project'
const sequelize = new Sequelize('your_database',  'your_username', 'your_password', {
    dialect:  'mysql',
    host:'your_host',
    port:3306
})


sequelize.authenticate().then(() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log("Error connectiong to database")
})

console.log("check!")
