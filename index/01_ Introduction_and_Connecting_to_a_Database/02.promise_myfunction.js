const Sequelize = require('sequelize')

// connect to mySQL database created earler: 'sequelize_project'
const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})


async function myfunction() {
    await sequelize.authenticate()
    console.log("Connection successful!")
}
myfunction();


console.log("check!")
