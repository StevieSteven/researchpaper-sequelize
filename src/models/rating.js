module.exports = (sequelize, Sequelize) => {
    return sequelize.define('rating', {
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'ratings',
        timestamps: false,
        underscored: true
    });
};