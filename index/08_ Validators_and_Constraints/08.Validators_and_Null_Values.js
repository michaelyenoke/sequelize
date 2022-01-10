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
        // get() {
        //     const rawValue = this.getDataValue('username')
        //     return rawValue.toUpperCase()
        // }
    },
    password:{
        type: DataTypes.STRING,
        // set(value) {
        //     const salt = bcrypt.genSaltSync(12)
        //     const hash = bcrypt.hashSync(value, salt)
        //     this.setDataValue('password', hash)
        // }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue:21,
    },
    vegetarian:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },
    description: {
        type:DataTypes.STRING,
        // set(value){
        //     const compressed = zlib.deflateSync(value).toString('base64')
        //     this.setDataValue('description', compressed)
        // },
        // get() {
        //     const value = this.getDataValue('description')
        //     const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'))
        //     return uncompressed.toString()
        // }    
    },
    aboutUser:{
        type:DataTypes.VIRTUAL,
        get(){
            return this.username+this.description
        }
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        // Validators and Null Values 
        // In JS, undefied is a type while null is an object. Specifically, undefined means a variable is declared but has not bee assigned a value
        // On the other hand, unll is  an assignment value.
        allowNull: true,
        validate:{
            myEmailValidator(value){
                if(value === null){
                    throw new Error("Please enter an email!")
                }
            }
            
        }
    }    
},
{   
    freezeTableName:true,
    timestamps:false
});



Customer.sync({ alter:true })
.then(() => {
    // errors: [
    //     ValidationErrorItem {
    //       message: 'Please enter an email!',
    //       type: 'Validation error',
    //       path: 'email',
    //       value: null,
    //       origin: 'FUNCTION',
    //       instance: [customer],
    //       validatorKey: 'myEmailValidator',
    //       validatorName: null,
    //       validatorArgs: [],
    return Customer.create({
        username:'mike',
        age:'31fg',  // not numeric, only '31' still will be seen as numeric
        email:null
    })
}).then((data) => {
    console.log(data)
}).catch((err) => {
   console.log(err)
})
