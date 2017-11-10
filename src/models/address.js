module.exports = (sequelize, Sequelize) => {
    return sequelize.define('address', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        city: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        number: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        postal_code: {
            type: Sequelize.TEXT,
            allowNull: true,
            // name: 'postal_code'
        },
        street: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'addresses',
        timestamps: false,
        underscored: true
    });
};