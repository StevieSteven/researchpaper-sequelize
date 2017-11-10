module.exports = (sequelize, Sequelize) => {
    return sequelize.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'orderitems',
        timestamps: false,
        underscored: true
    });
};