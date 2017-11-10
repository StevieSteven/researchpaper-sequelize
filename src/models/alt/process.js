
module.exports = (sequelize, Sequelize) => {
    var Process = sequelize.define('process', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },{
        timestamps: false,
        underscored: true
    });

    return Process;
};