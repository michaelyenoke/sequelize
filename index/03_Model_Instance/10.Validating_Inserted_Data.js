const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
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
    // validate is useless for bulkCreate()

    return Customer.create(
    {
        username:'Tomssss'
    }
    )
})
.then((data) => {
    console.log(data.toJSON())
})
.catch((err) => {
   console.log('wrong')
});
