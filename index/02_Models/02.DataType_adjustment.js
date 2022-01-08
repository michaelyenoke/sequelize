const Sequelize = require('sequelize')

// Insert this line and replace the rest Sequelize typing
const {DataType } = Sequelize;

const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})


// Syncing Multiple Tables/Models at Once
    // sequlize.sync({ force:true })
    sequelize.sync({ alter:true })


// drop all the tables
    // sequelize.drop()

// drop specific table : define match by  Regx expression
    //sequelize.drop({ match: /_test$/});


const Customer = sequelize.define('customer', {
    // build new primary key and auto increment
    user_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoincrement:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        //defaultValue: null
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
    // don't pluarize your table name
    freezeTableName:true,
    // not auto created timestamps 
    timestamps:false
    
});


// drop : this Customer table
    //Customer.drop()


// force:true : drop table and create table without default column
// alter:true : modify table
Customer.sync({ alter:true }).then(() => {
    console.log("Table and model synced successfully")
}).catch((err) => {
    console.log("Error syncing the table and model")
});
