import conn from './connection';
import lodash from 'lodash';
import Sequelize from 'sequelize';


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


var Address = address(conn, Sequelize);
var Category = category(conn, Sequelize);
var Customer = customer(conn, Sequelize);
var Order = order(conn, Sequelize);
var OrderStatus = orderStatus(conn, Sequelize);
var Product = product(conn, Sequelize);
var OrderItem = orderItem(conn, Sequelize);
var Rating = rating(conn, Sequelize);
var ShoppingcardElement = shoppingcardElement(conn, Sequelize);
var Shoppingcard = shoppingcard(conn, Sequelize);


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

Product.belongsToMany(Category, {as: 'category', through: 'products_categories'});

Rating.belongsTo(Customer, {as: 'customer'});
Rating.belongsTo(Product, {as: 'product'});

ShoppingcardElement.belongsTo(Product, {as: 'product'});
// ShoppingcardElement.belongsTo(Shoppingcard, {as: 'shoppingcard'});

Shoppingcard.hasMany(ShoppingcardElement, {as: 'products'});
Shoppingcard.belongsTo(Customer, {as: 'customer'});


conn.sync({
    force: false
}).then(() => {
    Address.findAll().then(addresses => {
        console.log("Teste Adressen: ");
        console.log(addresses.length + " Adressen gefunden");
        // console.log("erste Adresse: ", addresses[0]);
    });
    Category.findAll().then(categories => {
        console.log("Teste Kategorien:");
        console.log(categories.length + " Kategorien gefunden");
        // categories[3].getParent().then(data => {
        //     console.log('Parent of Cat: ', data);
        // });
    });

    Customer.findAll().then(customers => {
        console.log("Teste Kunden:");
        console.log(customers.length + " Customers gefunden");
        // console.log('ein Kunde: ', customers[0].getAddresses().then((data) => {
        //     console.log("data: ", data);
        // }));
        customers[0].getOrders().then((data) => {
            console.log("data Kunde->Orders: ", data.length);
        });
    });


    Order.findAll().then(orders => {
        console.log('Teste Bestellungen: ');
        console.log(orders.length + " Bestellungen gefunden.");
        // console.log(orders[0].getAddress().then(data => {
        //     console.log("data von Order: ", data)
        // }));
        // console.log(orders[0].getCustomer().then(data => {
        //     console.log("data von Order->Customer: ", data)
        // }));
        // console.log(orders[0].getStatus().then(data => {
        //     console.log("data von Order->OrderStatus: ", data)
        // }));
        // console.log(orders[3].getOrderItems().then(data => {
        //     console.log("data von Order->OrderItems: ", data.length)
        // }));
    });

    Product.findAll().then(products => {
        console.log("Teste Produkte");
        console.log(products.length + " Produkte gefunden");
        // products[0].getCategory().then(data => {
        //     console.log("data von Categories: " , data);
        // })
    });

    OrderItem.findAll().then(orderItems => {
        console.log('Teste OrderItems: ');
        console.log(orderItems.length + " OrderItems gefunden.");
        // orderItems[0].getOrder().then(data => {
        //     console.log(data);
        // });
        // orderItems[0].getProduct().then(data => {
        //     console.log(data);
        // });
    });

    Rating.findAll().then(ratings => {
        console.log('Teste Ratings: ');
        console.log(ratings.length + " Ratings gefunden.");
        // console.log(ratings[0]);
        // ratings[0].getCustomer().then(data => {
        //     console.log(data);
        // });
        // ratings[0].getProduct().then(data => {
        //     console.log(data);
        // });
    });

    Shoppingcard.findAll().then(shoppingcards => {
        console.log("Teste Shoppingcards");
        console.log(shoppingcards.length + " Shoppingcards gefunden");
        // shoppingcards[0].getCustomer().then(customer => {
        //     console.log("Customer gefunden: ", customer);
        // });
        // shoppingcards[0].getProducts().then(element => {
        //     console.log("Element gefunden: " + element.length);
        // })
    });


    ShoppingcardElement.findAll().then(shoppingcardElements => {
        console.log("Teste ShoppingcardElements");
        console.log(shoppingcardElements.length + " ShoppingcardElements gefunden");
        // shoppingcardElements[0].getProduct().then(element => {
        //     console.log("Produkt gefunden: " , element)
        // })
    });
});