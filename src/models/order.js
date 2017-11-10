module.exports = (sequelize, Sequelize) => {
    return sequelize.define('order', {
        date: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'orders',
        timestamps: false,
        underscored: true
    });
};