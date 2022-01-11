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

let user, posts

sequelize.sync({alter:true}).then(() => {
    return User.findOne({where: {username:'Witt'}})
}).then((data) =>{
    user = data
    return Post.findOne()
}).then((data) => {
    posts = data
    return user.removePost(posts) // change the user_id to be null, not delete the data
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
