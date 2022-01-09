const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const sequelize = new Sequelize('your_database',  'your_username', 'your_password', {
    dialect:  'mysql',
    host:'your_host',
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
    // working with our update table.
    // Executing (default): SELECT `username`, SUM(`age`) AS `sum_age` FROM `customer` AS `customer` GROUP BY `username`;
    // { username: 'Michaelyenoke', sum_age: '30' }
    // { username: 'soccer', sum_age: '90' }
    // { username: 'soccer2', sum_age: '30' }
    // { username: 'Mickey', sum_age: '328' }
    // { username: 'pizza', sum_age: '33' }
    // { username: 'Tom', sum_age: '184' }
    // { username: 'Tommy', sum_age: '35' }
    // { username: 'Nill', sum_age: '25' }
    return Customer.findAll({ 
        attributes: ['username',
                    [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']],
        group: 'username'
    });
}).
then((data) => { // data in this case (bulk) is an array
    data.forEach((element) => { // element is the object we want
    console.log(element.toJSON())
    })
})
.catch((err) => {
   console.log(err)
})
