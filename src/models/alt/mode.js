

module.exports = (sequelize, Sequelize) => {
    var Mode = sequelize.define('mode', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },{
        timestamps: false,
        underscored: true
    });

    return Mode;
};