/**
 * Created by stephan.strehler on 25.10.2017.
 */
import conn from './../database/connection';


const resolveFunctions = {
    RootQuery: {
        me(_) {
            return "";
        },
        Customer(_, {id}) {
            if (!id) {
                return conn.models.process.findAll();
            }
            return conn.models.process.findAll({where: {id: id}});
            // return conn.models.process.findById(id);
        },
        Category(_, {start, end}) {
            // if (!id) {
            //     return conn.models.mode.findAll();
            // }
            return conn.models.mode.findAll({where: {id: id}});
        },
        Orders(_, {id}) {
            if (!id) {
                return conn.models.process.findAll();
            }
            return conn.models.process.findAll({where: {id: id}});
            // return conn.models.process.findById(id);
        }
    },
    RootMutation: {
        putProductIntoShoppingCard: (root, {productId, count}) => {
            return conn.models.process.findById(processId).then((process) => {
                return conn.models.mode.findById(modeId).then(mode => {
                    process.setMode(mode);
                    return process;
                });
            });
        },
        finishOrder: (root) => {
            return "";
        },
        addRating:(root, {productId, stars, comment}) => {
            return "";
        }
    },
    Customer: {
        address: {
            resolve(customer) {
                return "";
            }
        },
        shoppingcard: {
            resolve(customer) {
                return "";
            }
        },
        orders: {
            resolve(customer) {
                return "";
            }
        },
        ratings: {
            resolve(customer) {
                return "";
            }
        }
    },
    Shoppingcard: {
        customer: {
            resolve(shoppingcard) {
                return "";
            }
        },
        products: {
            resolve(shoppingcard) {
                return "";
            }
        },
    },
    ShoppingcardElement: {
        product: {
            resolve(shoppingcardelement) {
                return "";
            }
        }
    },
    Product: {
        ratings: {
            resolve(product) {
                return "";
            }
        },
        categories: {
            resolve(product) {
                return "";
            }
        }
    },
    Rating: {
        customer: {
            resolve(rating) {
                return "";
            }
        },
        product: {
            resolve(rating) {
                return "";
            }
        }
    },
    Category: {
        parent: {
            resolve(category) {
                return "";
            }
        },
        products: {
            resolve(category) {
                return "";
            }
        }
    },
    Order: {
        items: {
            resolve(order) {
                return "";
            }
        },
        customer: {
            resolve(order) {
                return "";
            }
        },
        address: {
            resolve(order) {
                return "";
            }
        },
        status: {
            resolve(order) {
                return "";
            }
        },
    },
    OrderItem: {
        product: {
            resolve(orderitem) {
                return "";
            }
        }
    }
};

export default resolveFunctions;