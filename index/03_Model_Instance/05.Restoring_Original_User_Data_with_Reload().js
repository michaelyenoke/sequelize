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
        username:'Mickey',
        password:'7654321',
        age:33,
        vegetarian:false
    })
}).then((data) => {
    console.log("User added to database!");

    data.username = 'friedchicken';
    data.age = 45;

    // Restoring Original User Data with Reload()
    return data.reload()

}).then((data) => {

    console.log("Customer returned")
    console.log(data.toJSON())

}).catch((err) => {
   console.log(err)
});
