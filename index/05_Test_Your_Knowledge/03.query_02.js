const Sequelize = require('sequelize')
const { DataTypes, Op } = Sequelize

const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})



const Student = sequelize.define('student', {
    student_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[4,20]
        }
    },
    favorite_class:{
        type: DataTypes.STRING(25),
        defaultValue:'Computer Science'
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull:false
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





Student.sync()
.then(() => {
    return Student.findAll({
        attributes:['name'],
        where:{
        [Op.or]:{ favorite_class:'Law', vegetarian:true }
    }})
})
.
then((data) => { 
    data.forEach((element) => { 
    console.log(element.toJSON())
    })
})
.catch((err) => {
   console.log(err)
})
