import Sequelize from 'sequelize';
import config from './../../resources/config.json';
import address from '../models/address';
import category from '../models/category';
import customer from '../models/customer';
import order from '../models/order';
import orderStatus from '../models/orderStatus';
import product from '../models/product';
import orderItem from '../models/orderItem';
import rating from '../models/rating';
import shoppingcardElement from '../models/shoppingcardElement';
import shoppingcard from '../models/shoppingcard';

var shortConfig = config[process.argv[2].slice(4)];

const connection = new Sequelize(
    shortConfig.schema,
    shortConfig.username,
    shortConfig.password,
    {
        logging: false,
        host: shortConfig.host,
        port: shortConfig.port,
        dialect: shortConfig.dialect,
    }
);

module.exports = connection;


// THIS WORKS AS SCHEMA FOR SEQUELIZE TO USE METHODS => connection.models.modelname.findALL()... ... ...
// ========= START OF SHEMA =========


var Address = address(connection, Sequelize);
var Category = category(connection, Sequelize);
var Customer = customer(connection, Sequelize);
var Order = order(connection, Sequelize);
var OrderStatus = orderStatus(connection, Sequelize);
var Product = product(connection, Sequelize);
var OrderItem = orderItem(connection, Sequelize);
var Rating = rating(connection, Sequelize);
var ShoppingcardElement = shoppingcardElement(connection, Sequelize);
var Shoppingcard = shoppingcard(connection, Sequelize);

Category.hasOne(Category, {as: 'parent'});
// Category.belongsToMany(Product, {as: 'product', through: 'products_categories', foreignKey: 'categories_id', timestamps: false });
Category.hasMany(Product);

Customer.hasMany(Address);
Address.belongsTo(Customer, {as: 'customer'});

Customer.hasMany(Order);
Customer.hasMany(Rating);
Order.belongsTo(Customer, {as: 'customer'});
Order.belongsTo(Address, {as: 'address'});
Order.belongsTo(OrderStatus, {as: 'status'});
Order.hasMany(OrderItem);

OrderItem.belongsTo(Order, {as: 'order'});
OrderItem.belongsTo(Product, {as: 'product'});

//geht noch nicht ganz:
Product.belongsTo(Category, {as: 'category'});
// Product.belongsToMany(Category, {as: 'category',through:'products_categories', foreignKey: 'product_id', timestamps: false});
//replaced by:
// Product.hasMany(CategoryProduct);
// Category.hasMany(CategoryProduct);

Rating.belongsTo(Customer, {as: 'customer'});
Rating.belongsTo(Product, {as: 'product'});
Product.hasMany(Rating);

ShoppingcardElement.belongsTo(Product, {as: 'product'});
// ShoppingcardElement.belongsTo(Shoppingcard, {as: 'shoppingcard'});

Shoppingcard.hasMany(ShoppingcardElement, {as: 'products'});
Shoppingcard.belongsTo(Customer, {as: 'customer'});
Customer.hasOne(Shoppingcard);

