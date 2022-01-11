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

// Passing Options to hasOne()
// default foreign key : countryid
Country.hasOne(Capital); 


sequelize.sync({force:true}).then(()=> {
        // working with our updated table.
    Country.bulkCreate([
        {
            countryName: 'Spain'
        },
        {
            countryName: 'France'
        },
        {
            countryName:'Germany'
        },
        {
            countryName:'England'
        }
    ]);

    Capital.bulkCreate([
        {
            capitalName:'Madrid'
        },
        {
            capitalName:'Paris'
        },
        {
            capitalName:'Berlin'
        },
        {
            capitalName:'London'
        }
    ])


        
}).catch((err) => {
    console.log(err)
})
