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
    return Customer.findOne({ where: { customerName: 'Witt'}})
}).then((data) => {
    customer = data
    return Product.findAll()
}).then((data) => {
    product = data
    return customer.addProducts(product)
}).then((data) => {    
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// Executing (default): SELECT `id`, `productName` FROM `products` AS `product`;
// Executing (default): SELECT `customerproductId`, `customerId`, `productId` FROM `customerproducts` AS `customerproduct` WHERE `customerproduct`.`customerId` = 1 AND `customerproduct`.`productId` IN (1, 2, 3, 4);
// Executing (default): INSERT INTO `customerproducts` (`customerproductId`,`customerId`,`productId`) VALUES (NULL,1,1),(NULL,1,2),(NULL,1,3),(NULL,1,4);
