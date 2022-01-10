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
    // find or create
    //return Customer.findOrCreate({ where: { username:'JimmyChou'}});
    

    // Setting Default Values for findOrCreate()
    return Customer.findOrCreate({ 
        where: { username:'Jason'},
        defaults: {
            age:37
        }
    });
 

}).
then((data) => { 
    console.log(data)
})
.catch((err) => {
   console.log(err)
})
