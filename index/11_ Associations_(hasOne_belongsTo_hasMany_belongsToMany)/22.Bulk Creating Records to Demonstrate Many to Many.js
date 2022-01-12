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

    Customer.bulkCreate([
        {
            customerName: 'Witt'
        },
        {
            customerName: 'Mike'
        },
        {
            customerName: 'Greg'
        },
        {
            customerName: 'Spencer'
        }
    ])

    Product.bulkCreate([
        {
            productName: 'laptop'
        },
        {
            productName: 'headphones'
        },
        {
            productName: 'soccer ball'
        },
        {
            productName: 'pencil sharpener'
        }
    ])


}).catch

// Executing (default): SHOW INDEX FROM `customerproducts`
// Executing (default): INSERT INTO `customers` (`id`,`customerName`) VALUES (NULL,'Witt'),(NULL,'Mike'),(NULL,'Greg'),(NULL,'Spencer');
// Executing (default): INSERT INTO `products` (`id`,`productName`) VALUES (NULL,'laptop'),(NULL,'headphones'),(NULL,'soccer ball'),(NULL,'pencil sharpener');
