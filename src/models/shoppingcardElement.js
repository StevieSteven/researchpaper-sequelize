module.exports = (sequelize, Sequelize) => {
    return sequelize.define('shoppingcardElement', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'shoppingcard_elements',
        timestamps: false,
        underscored: true
    });
};