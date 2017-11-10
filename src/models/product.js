module.exports = (sequelize, Sequelize) => {
    return sequelize.define('product', {
        name: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        delivery_time: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'products',
        timestamps: false,
        underscored: true
    });
};