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





Student.sync({ alter:true })
.then(() => {
    // Executing (default): SELECT `student_id`, `name`, `favorite_class`, `school_year`, `vegetarian` FROM `student` AS `student` WHERE `student`.`favorite_class` = 'Law' AND `student`.`vegetarian` = true;
    return Student.findAll({
        attributes:[
            'school_year',
            [sequelize.fn('COUNT', sequelize.col('school_year')), 'num_students']
        ],
        group:'school_year'
    })
}).
then((data) => { 
    data.forEach((element) => { 
    console.log(element.toJSON())
    })
})
.catch((err) => {
   console.log(err)
})
