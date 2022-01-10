const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const zlib = require('zlib')

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
    },
    description: {
        type:DataTypes.STRING,
        // npm install zlib
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64')
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description')
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'))
            // return uncompressed
            return uncompressed.toString()
        }
        
    }
},
{   
    freezeTableName:true,
    timestamps:false
});



Customer.sync({ alter:true })
.then(() => {
    // Executing (default): INSERT INTO `customer` (`user_id`,`username`,`password`,`age`,`vegetarian`,`description`) VALUES (DEFAULT,?,?,?,?,?);
    return Customer.create({
        username:'laRose2',
        password:'playisfun69',
        description: 'This is the description part.'
    })
}).
then((data) => {
    
    console.log(data.username)
    // ROSE
    console.log(data.password)
    // $2b$12$vD6//Gpx8hqn28ynDAaeQ.7nppJx5dU/h/d7f3vxHppR6v5Vqo3em
    console.log(data.description)
    // return uncompressed
    // <Buffer 54 68 69 73 20 69 73 20 74 68 65 20 64 65 73 63 72 69 70 74 69 6f 6e 20 70 61 72 74 2e>
  
    // return uncompressed.toString()
    // This is the description part.


})
.catch((err) => {
   console.log(err)
})
