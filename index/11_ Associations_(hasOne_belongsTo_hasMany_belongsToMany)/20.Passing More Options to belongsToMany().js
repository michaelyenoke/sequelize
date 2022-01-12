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



const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
})

const Product = sequelize.define('product', {
    productName: {
       type:DataTypes.STRING
    }
},{
    timestamps: false
})


Customer.belongsToMany(Product, { through: 'customerproduct' } )
Product.belongsToMany(Customer, { through: 'customerproduct' } )


sequelize.sync({ alter:true }).then(() => {
}).catch
