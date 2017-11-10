
import Sequelize from 'sequelize';
import config from './../../resources/config.json';

// import mode from '../models/alt/mode';
// import processModel from '../models/alt/process';
// import state from '../models/alt/state';

import address from '../models/address';
import category from '../models/category';
import customer from '../models/customer';
import order from '../models/order';
import orderStatus from '../models/orderStatus';
import product from '../models/product';
import orderItem from '../models/orderItem';

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


var Address = address(connection, Sequelize);
var Category = category(connection, Sequelize);
var Customer = customer(connection, Sequelize);
var Order = order(connection, Sequelize);
var OrderStatus = orderStatus(connection, Sequelize);
var Product = product(connection, Sequelize);
var OrderItem = orderItem(connection, Sequelize);

Category.hasOne(Category, {as: 'parent'});
Customer.hasMany(Address);
Address.belongsTo(Customer, {as: 'customer'});

Customer.hasMany(Order);
Order.belongsTo(Customer, {as: 'customer'});
Order.belongsTo(Address, {as: 'address'});
Order.belongsTo(OrderStatus, {as: 'status'});
Order.hasMany(OrderItem);

OrderItem.belongsTo(Order, {as: 'order'});
OrderItem.belongsTo(Product, {as: 'product'});

//geht noch nicht ganz:
Product.belongsToMany(Category, {as: 'category', through:'products_categories'});

// // THIS WORKS AS SCHEMA FOR SEQUELIZE TO USE METHODS => connection.models.modelname.findALL()... ... ...
// // ========= START OF SHEMA =========
// var Mode = mode(connection, Sequelize);
// var Process = processModel(connection, Sequelize);
// var State = state(connection, Sequelize);
//
//
//
//
// Process.belongsTo(Mode, {as: 'mode'});
// // Mode.hasMany(Process);
//
// State.belongsTo(Process, {as: 'process'});
// Process.hasMany(State);
//
// State.hasOne(Process, {as: 'actual_state'});
// // Process.belongsTo(State, {as: 'actual_state', constraints: false});
// // State.belongsTo(State, {as: 'follower'});

//TODO.. weitere Beziehungen bauen
// Article.belongsToMany(Author, {as: 'authors', through:'articleAuthors'});
// Comment.belongsTo(Article, {as: 'article'});
// Comment.belongsTo(Author, {as: 'author'});
// Author.hasMany(Comment);
// Article.hasMany(Comment);