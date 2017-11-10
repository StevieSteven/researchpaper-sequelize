module.exports = (sequelize, Sequelize) => {
    return sequelize.define('customer', {
        prename: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        surname: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: true
        },
    }, {
        tableName: 'customers',
        timestamps: false,
        underscored: true
    });
};