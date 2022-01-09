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
    // Executing (default): UPDATE `customer` SET `username`=? WHERE `age` > 3
    // [ 26 ]
    return Customer.update({ username:'hello!'},{
        where:{ age:{
            [Op.gt]:3
        }} 
    });
}).
then((data) => { 
    console.log(data)
})
.catch((err) => {
   console.log(err)
})
