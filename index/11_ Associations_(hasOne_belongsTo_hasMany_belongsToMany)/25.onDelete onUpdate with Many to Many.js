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

const CustomerPrudct = sequelize.define('customerproduct', {
    customerproductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
})

Customer.belongsToMany(Product, { through: 'customerproduct' } )
Product.belongsToMany(Customer, { through: 'customerproduct' } )


sequelize.sync({ alter:true }).then(() => {
    return Customer.destroy({ where: { customerName: 'Witt'}})
}).then((data) => {    
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// Executing (default): ALTER TABLE `customerproducts` DROP FOREIGN KEY `customerproducts_ibfk_16`;
// Executing (default): ALTER TABLE `customerproducts` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
// Executing (default): SHOW INDEX FROM `customerproducts`
// Executing (default): DELETE FROM `customers` WHERE `customerName` = 'Witt'
// 1
