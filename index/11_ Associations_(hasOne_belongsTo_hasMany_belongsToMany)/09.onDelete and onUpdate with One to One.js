const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const zlib = require('zlib')
const { HasOne } = require('sequelize')

const { DataTypes, Op } = Sequelize

const sequelize = new Sequelize('sequelize_project',  'michaelyenoke', '1qaz2wsx3edc', {
    dialect:  'mysql',
    host:'database-1.cqwpdgcki6p6.ap-southeast-1.rds.amazonaws.com',
    port:3306
})

// table one : country
const Country = sequelize.define('country', {
    countryName:{
        type:DataTypes.STRING,
        unque:true
    }
},{
    timestamps:false
})

// talbe two : capital
const Capital = sequelize.define('capital',{
    capitalName:{
        type:DataTypes.STRING,
        unique:true
    }
},{
    timestamps: false
})

// onDelete and onUpdate with One to One
// CASCADE 刪除任何相關的表格
Country.hasOne(Capital, { onDelete: 'CASCADE'}); 
Capital.belongsTo(Country,{ onDelete: 'CASCADE'});


let country, capital;

sequelize.sync({alter:true}).then(()=> {
    // working with our updated table.
    return Country.destroy({ where: { countryName: 'Spain' }})
}).then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
})
