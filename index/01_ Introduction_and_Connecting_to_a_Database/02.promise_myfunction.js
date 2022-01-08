const Sequelize = require('sequelize')

// connect to mySQL database created earler: 'sequelize_project'
const sequelize = new Sequelize('your_database',  'your_username', 'your_password', {
    dialect:  'mysql',
    host:'your_host',
    port:3306
})


async function myfunction() {
    await sequelize.authenticate()
    console.log("Connection successful!")
}
myfunction();


console.log("check!")
