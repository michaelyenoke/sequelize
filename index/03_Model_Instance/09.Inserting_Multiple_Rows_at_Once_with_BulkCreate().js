const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})



const Customer = sequelize.define('customer', {
    user_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue:21
    },
    vegetarian:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},
{   
    freezeTableName:true,
    timestamps:false
});



Customer.sync({ alter:true })
.then(() => {
    return Customer.bulkCreate(
    [     
    {
        username:'Tom',
        age:25,
        password: 'pizzasoccer'
    },
    {
        username:'Tommy',
        age:35,
        password: 'qwerty'       
    },
    {
        username:'Nill',
        age:25,
        password: '1234'
    }])
}).then((data) => {
    // bulkcreate return a array not an object -> can't use toJSON() 
    data.forEach((element) => {
        console.log(element.toJSON())
    })
}).catch((err) => {
   console.log('wrong')
});
