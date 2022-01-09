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
    // gt : greater than
    // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian` FROM `customer` AS `customer` WHERE `customer`.`age` > 25;
    return Customer.findAll({ where:{
            age:{
                [Op.gt]:25
            }
        }
    });
}).
then((data) => { // data in this case (bulk) is an array
    data.forEach((element) => { // element is the object we want
    console.log(element.toJSON())
    })
})
.catch((err) => {
   console.log(err)
})
