module.exports = (sequelize, Sequelize) => {
    return sequelize.define('shoppingcard', {
    }, {
        tableName: 'shoppingcards',
        timestamps: false,
        underscored: true
    });
};