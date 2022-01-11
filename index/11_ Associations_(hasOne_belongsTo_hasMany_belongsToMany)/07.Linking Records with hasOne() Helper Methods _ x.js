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

Country.hasOne(Capital); 




let country, capital;

sequelize.sync({alter:true}).then(()=> {
    // working with our updated table.
    return Country.findOne({ where: { countryName: 'France'}})
})
.then((data) => {
    country = data
    return Capital.findOne({ where: { capitalName: 'Paris' }})
})
.then((data) => {
    capital = data
    return capital.setCountry(country)
})
.catch((err) => {
    console.log(err)
})

// 失敗！
