const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const zlib = require('zlib')

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
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64')
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description')
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'))
            return uncompressed.toString()
        }    
    },
    aboutUser:{
        // JS 前端會出現的虛擬表格,不會出現在資料庫中
        type:DataTypes.VIRTUAL,
        get(){
            return this.username+this.description
        }
    }    
},
{   
    freezeTableName:true,
    timestamps:false
});



Customer.sync({ alter:true })
.then(() => {
    return Customer.findOne({where:{ username: 'Rose'}})
}).
then((data) => {
    //console.log(data)
    console.log(data.aboutUser)
})
.catch((err) => {
   console.log(err)
})
