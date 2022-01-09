const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
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
        allowNull:false,
        validate:{
            len:[3,6]
        }
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
    // SELECT SUM(`age`) AS `howOld` FROM `customer` AS `customer`; 
    // { howOld: '755' }
    return Customer.findAll({ attributes:[[sequelize.fn('SUM', sequelize.col('age')),'howOld']]});
}).
then((data) => { // data in this case (bulk) is an array
    data.forEach((element) => { // element is the object we want
    console.log(element.toJSON())
    })
})
.catch((err) => {
   console.log(err)
})
