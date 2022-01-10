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
    
    return Customer.findOrCreate({ 
        where: { username:'Jason'},
        defaults: {
            age:37
        }
    });
 

}).
then((data) => { 
    // findOrCreate() Return Values
    // true or false to see created success or not
    // Executing (9f7a87fa-0530-4567-8dcc-99394e3eb4c4): SELECT `user_id`, `username`, `password`, `age`, `vegetarian` FROM `customer` AS `customer` WHERE `customer`.`username` = 'Jason' LIMIT 1;
    // Executing (9f7a87fa-0530-4567-8dcc-99394e3eb4c4): INSERT INTO `customer` (`user_id`,`username`,`age`,`vegetarian`) VALUES (DEFAULT,?,?,?);
    // Executing (9f7a87fa-0530-4567-8dcc-99394e3eb4c4): COMMIT;
    // true
    const [result, created] = data
    console.log(created)
})
.catch((err) => {
   console.log(err)
})
