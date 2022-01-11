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

const User = sequelize.define('user',{
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
},{
    timestamps: false
})

const Post = sequelize.define('post',{
    message:{
        type: DataTypes.STRING
    }
},{
    timestamps: false
})

User.hasMany(Post);
Post.belongsTo(User);

sequelize.sync({alter:true}).then(() => {
    User.bulkCreate([
        {
            username:'Witt',
            password:'sdfa'
        },
        {
            username:'Mike',
            password:'duee'
        },
        {
            username:'Fred',
            password:'pizza'
        }
    ]);

    Post.bulkCreate([
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        },
        {
            message: 'This was an amazing post that I made online.'
        }
    ]);

}).catch((err) => {
    console.log(err);
})
