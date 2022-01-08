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
    return Customer.create({
        username:'Tom',
       
        // even you miss some data, the default value will be inserted
        // if you don't set default value, it will be filled with null
    })
}).then((data) => {
    console.log(data.toJSON())
}).catch((err) => {
   console.log(err)
});
