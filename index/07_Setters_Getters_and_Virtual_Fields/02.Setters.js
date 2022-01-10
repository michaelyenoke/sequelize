const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

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
            const rawValue = this.getDataValue('username')
            return rawValue.toUpperCase()
        }
    },
    password:{
        type: DataTypes.STRING,
        set(value) {
            // npm install bcrypt & import first
            // 12 -> the higher it is the longer it will take to generate the salt and i believe the more complicated it will be as well
            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(value, salt)
            this.setDataValue('password', hash)
        }
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
    return Customer.create({
        username:'Mitt',
        password:'playisfun69'
    })
}).
then((data) => {
    
    console.log(data.username)
    // MITT
    console.log(data.password)
    // $2b$12$igPOzVq2VbYkbgLZD1tf3Oe/7Hscx6Sp6oukCgWKKb9CFWfXu4Pnu
    
})
.catch((err) => {
   console.log(err)
})
