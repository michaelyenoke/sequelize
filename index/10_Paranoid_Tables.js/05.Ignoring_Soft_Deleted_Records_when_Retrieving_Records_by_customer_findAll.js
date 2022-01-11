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
    timestamps:true,
    validate:{
        myEmailValidator(value){
            if(this.username == this.password) {
                throw new Error("Please cannot be your username")
            }else{
                console.log('Motherfucker?')
            }
        }
    },
    // paranoid table : not really delete data, but put a column to note the data is deleted (but still in the database)
    // timestamps : true -> to create the delete timestamps
    paranoid:true,
    // Changing the DeletedAt Column Name
    deletedAt: 'timeDestoryed'
});


Customer.sync({ alter:true })
.then(() => {

    //return Customer.findOne({where:{user_id:4}});

    // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian`, `description`, `email`, `createdAt`, `updatedAt`, `timeDestoryed` FROM `customer` AS `customer` WHERE (`customer`.`timeDestoryed` IS NULL AND `customer`.`user_id` = 4);
    // null
 
    return Customer.findOne({
        where:{
            user_id:4
        },
        paranoid:false})

        // Executing (default): SELECT `user_id`, `username`, `password`, `age`, `vegetarian`, `description`, `email`, `createdAt`, `updatedAt`, `timeDestoryed` FROM `customer` AS `customer` WHERE `customer`.`user_id` = 4;
        // customer {
        //   dataValues: {
        //     user_id: 4,
        //     username: 'JimmyChou',
        //     password: null,
        //     age: 21,
        //     vegetarian: true,
        //     description: null,
        //     email: null,
        //     createdAt: Invalid Date,
        //     updatedAt: Invalid Date,
        //     timeDestoryed: 2022-01-11T02:10:50.000Z
        //   },
        //   _previousDataValues: {
        //     user_id: 4,
        //     username: 'JimmyChou',
        //     password: null,
        //     age: 21,
        //     vegetarian: true,
        //     description: null,
        //     email: null,
        //     createdAt: Invalid Date,
        //     updatedAt: Invalid Date,
        //     timeDestoryed: 2022-01-11T02:10:50.000Z
        //   },
        //   uniqno: 1,
        //   _changed: Set(0) {},
        //   _options: {
        //     isNewRecord: false,
        //     _schema: null,
        //     _schemaDelimiter: '',
        //     raw: true,
        //     attributes: [
        //       'user_id',       'username',
        //       'password',      'age',
        //       'vegetarian',    'description',
        //       'aboutUser',     'email',
        //       'createdAt',     'updatedAt',
        //       'timeDestoryed'
        //     ]
        //   },
        //   isNewRecord: false
        // }


}).then((data) => {
    console.log(data);
}).catch((err) => {
   console.log(err)
})
