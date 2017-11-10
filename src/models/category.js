module.exports = (sequelize, Sequelize) => {
    return sequelize.define('category', {
        name: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'categories',
        timestamps: false,
        underscored: true
    });
};