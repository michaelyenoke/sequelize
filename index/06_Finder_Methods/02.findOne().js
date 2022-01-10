const Sequelize = require('sequelize')

// Selecting Rows with Operators
const { DataTypes, Op } = Sequelize

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


// A Sequelize model instance is essentially a row in the table/model.
// You can use the method toJSON() on Sequelize model instances to view only the values stored in the row and not the extra info sequelize

Customer.sync({ alter:true })
.then(() => {
    // working with our update table.
    // find One
    // no argument -> return the first result
    // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian` FROM `customer` AS `customer` LIMIT 1;
    // return Customer.findOne();
    
    // find One 
    // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian` FROM `customer` AS `customer` WHERE (`customer`.`age` < 50 OR `customer`.`age` IS NULL) LIMIT 1;
    
    // In JS brackets around an object key is called a computed property.
    // They were introduced in ES6 and allow for object keys to be computed dynamically.

    return Customer.findOne({ where:{
        age:{
            [Op.or]: {
                [Op.lt]:50,
                [Op.eq]:null
            }
        }
    }});
}).
then((data) => { 
    console.log(data.toJSON())
})
.catch((err) => {
   console.log(err)
})
