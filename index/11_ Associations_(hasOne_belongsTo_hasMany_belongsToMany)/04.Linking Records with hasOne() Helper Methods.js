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



// Executing (default): SELECT `id`, `capitalName`, `countryId` FROM `capitals` AS `capital` WHERE `capital`.`capitalName` = 'Madird';
// Executing (default): SELECT `id`, `countryName` FROM `countries` AS `country` WHERE `country`.`countryName` = 'Spain' LIMIT 1;
// Executing (default): SELECT `id`, `capitalName`, `countryId` FROM `capitals` AS `capital` WHERE `capital`.`countryId` = 1 LIMIT 1;


let country, capital;

sequelize.sync({alter:true}).then(()=> {
    // working with our updated table.
    return Capital.findOne({ where: { capitalName: 'Madird' }})
})
.then((data) => {
    capital = data
    return Country.findOne({ where: { countryName: 'Spain'}} )
})
.then((data) => {
    country = data
    country.setCapital(capital)
})
.catch((err) => {
    console.log(err)
})


