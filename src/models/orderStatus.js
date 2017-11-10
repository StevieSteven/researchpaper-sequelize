module.exports = (sequelize, Sequelize) => {
    return sequelize.define('orderStatus', {
        message: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'order_status',
        timestamps: false,
        underscored: true
    });
};