const Sequelize = require('sequelize')
const { DataTypes } = Sequelize


// connect to mySQL database created earler: 'sequelize_project'
const sequelize = new Sequelize('your_database',  'your_username', 'your_password', {
    dialect:  'mysql',
    host:'your_host',
    port:3306
})





const Customer = sequelize.define('customer', {
    user_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue:21
    },
    vegetarian:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},
{   
 
    freezeTableName:true,
    timestamps:false
    
});



Customer.sync({ alter:true }).then(() => {
    // working with our updated table.
    // Inserting Data with Build() and Save()
    const customer = Customer.build({ username:'Michaelyenoke', password:'12345678', age:30, Vegetarian:true});
    //console.log(customer.username);
    //console.log(customer.password);
    

    // add conditions
     if (customer.age > 15){
         customer.old = true;
    }

    // direct change the data above    
    customer.username = 'soccer2'

    // save into our database
    return customer.save()

    // JS code is executed in an event loop on a single thread. 
    // Meaning only one thing can happen at a time.
    // However, you can execute things asynchronously(callbacks, promises) so you can perform other actions without blocking the main thread.
}).then((data) => {
    console.log("User added to database!");
}).catch((err) => {
   
});
