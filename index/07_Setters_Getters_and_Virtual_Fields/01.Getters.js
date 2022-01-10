
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
        allowNull:false,
        validate:{
            len:[1,10]
        },
        get() {
            // We use this.getDataValue('username) instead of this.username because this.username calls this get() method.
            // So if we call this.username (the get() method) from within the get() method we will get an infinite loop.
            const rawValue = this.getDataValue('username')
            return rawValue.toUpperCase()
            // 資料庫裡還是小寫
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


// A Sequelize model instance is essentially a row in the table/model.
// You can use the method toJSON() on Sequelize model instances to view only the values stored in the row and not the extra info sequelize

Customer.sync({ alter:true })
.then(() => {
    // working with our update table.
    // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian` FROM `customer` AS `customer` LIMIT 1;
    // TOM  -> 資料庫裡面還是小寫
    return Customer.findOne();

}).
then((data) => {
    
console.log(data.username)

})
.catch((err) => {
   console.log(err)
})
