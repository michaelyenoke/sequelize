const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})


sequelize.authenticate().then(() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log("Error connectiong to database")
})

/*
async function myfunction() {
    await sequelize.authenticate()
    console.log("Connection successful!")
}

myfunction();
*/

console.log("check!")