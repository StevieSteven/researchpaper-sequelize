/**
 * Created by stephan.strehler on 25.10.2017.
 */
import conn from './../database/connection';

function printFunctions(model) {
    for (let m in model) {
        if (typeof model[m] == "function") {
            console.log(m);
        }
    }
}

const userId = 5;


const resolveFunctions = {
    RootQuery: {
        me(_) {
            return conn.models.customer.findOne({where: {id: 1}});
        },
        Customer(_, {id}) {
            return conn.models.customer.findOne({where: {id: id}});
        },
        Category(_, {name}) {
            if (!name) {
                return conn.models.category.findAll();
            }
            return conn.models.category.findAll({where: {name: name}});
        },
        Orders(_, {id}) {
            if (!id) {
                return conn.models.process.findAll();
            }
            return conn.models.process.findAll({where: {id: id}});
        }
    },
    RootMutation: {
        putProductIntoShoppingCard: (root, {productId, count}) => {
            return new Promise((resolve, reject) => {
                return conn.models.customer.findById(userId).then((customer) => {
                    return customer.getShoppingcard().then((shoppingcard) => {
                        if (!shoppingcard) {
                            shoppingcard = conn.models.shoppingcard.build({customer_id: userId}).save()
                        }
                        return conn.models.shoppingcardElement.build({
                            shoppingcard_id: shoppingcard.id,
                            product_id: productId,
                            quantity: count
                        }).save().then((data) => {
                            return resolve(shoppingcard);
                        });
                    });
                });
            });
        },
        finishOrder: (root, {addressId}) => {
            return new Promise((resolve, reject) => {
                return conn.models.customer.findById(userId).then((customer) => {
                    return customer.getShoppingcard().then((shoppingcard) => {
                        return shoppingcard.getProducts().then((elements) => {
                            conn.models.order.build({
                                customer_id: userId,
                                address_id: addressId,
                                date: Date.now(),
                                status_id: 1
                            }).save().then((order) => {

                                let argArray = [];
                                elements.forEach((item) => {
                                    if (!item.quantity)
                                        item.quantity = 0;
                                    argArray.push({
                                        quantity: item.quantity,
                                        product_id: item.product_id,
                                        order_id: order.id
                                    });
                                });
                                conn.models.orderItem.bulkCreate(argArray).then(() => {
                                    elements.forEach((item) => {
                                        item.destroy();
                                    });
                                    shoppingcard.destroy();
                                    resolve(order);
                                })
                            })
                        })
                    })
                });
            });
        },
        addRating: (root, {productId, stars, comment}) => {
            let t = conn.models.rating.build({
                comment: comment,
                stars: stars,
                customer_id: userId,
                product_id: productId
            });
            return t.save();
        },
        addProduct: (root, {name, price, description, deliveryTime}) => {
            let p = conn.models.product.build({
                name: name,
                delivery_time: deliveryTime,
                description: description,
                price: price
            });
            return p.save();
        }
    },
    Customer: {
        address: {
            resolve(customer) {
                return customer.getAddresses();
            }
        },
        shoppingcard: {
            resolve(customer) {
                return customer.getShoppingcard();
            }
        },
        orders: {
            resolve(customer) {
                return customer.getOrders();
            }
        },
        ratings: {
            resolve(customer) {
                return customer.getRatings()
            }
        }
    },
    Shoppingcard: {
        customer: {
            resolve(shoppingcard) {
                return shoppingcard.getCustomer();
            }
        },
        products: {
            resolve(shoppingcard) {
                return shoppingcard.getProducts();
            }
        },
    },
    ShoppingcardElement: {
        product: {
            resolve(shoppingcardelement) {
                return shoppingcardelement.getProduct();
            }
        }
    },
    Product: {
        ratings: {
            resolve(product) {
                return product.getRatings();
            }
        },
        category: { //doesn't work yet
            resolve(product) {
                return product.getCategory();
            }
        },
        status: {
            resolve(product) {
                return "LIEFERBAR";
            }
        }
    },
    Rating: {
        customer: {
            resolve(rating) {
                return rating.getCustomer();
            }
        },
        product: {
            resolve(rating) {
                return rating.getProduct();
            }
        }
    },
    Category: {
        parent: {
            resolve(category) {
                return conn.models.category.findById(category.parent_id);
            }
        },
        products: {
            resolve(category) {
                return category.getProducts();
            }
        }
    },
    Order: {
        items: {
            resolve(order) {
                return order.getOrderItems();
            }
        },
        customer: {
            resolve(order) {
                return order.getCustomer();
            }
        },
        address: {
            resolve(order) {
                return order.getAddress();
            }
        },
        status: {
            resolve(order) {
                return order.getStatus();
            }
        },
    },
    OrderItem: {
        product: {
            resolve(orderitem) {
                return orderitem.getProduct();
            }
        }
    }
};

export default resolveFunctions;