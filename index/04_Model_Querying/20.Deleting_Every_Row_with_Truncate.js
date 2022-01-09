const Sequelize = require('sequelize')

// Selecting Rows with Operators
const { DataTypes, Op } = Sequelize

const sequelize = new Sequelize('your_database',  'your_username', 'your_password', {
    dialect:  'mysql',
    host:'your_host',
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
    // working with our update table.
    // Executing (default): DELETE FROM `customer` WHERE `username` = 'hello!'
    // 26
    return Customer.destroy({where:{ username:'hello!'}, truncate:true})

    // delete every row but don't delete the table itself
    // return Customer.destroy({where:{ truncate:true })


}).
then((data) => { 
    console.log(data)
})
.catch((err) => {
   console.log(err)
})
