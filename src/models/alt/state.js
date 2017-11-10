
module.exports = (sequelize, Sequelize) => {
    var State = sequelize.define('state', {
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        position: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        started: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },{
        timestamps: false,
        underscored: true
    });
    return State;
};