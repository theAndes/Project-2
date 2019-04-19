module.exports = function(sequelize, DataTypes) {
    var Route = sequelize.define(
        "Route",
        {
            homeAddress: {
                type: DataTypes.STRING,
                notEmpty: false
            },
            workAddress: {
                type: DataTypes.STRING,
                notEmpty: false
            }
        },
        { timestamps: false }
    );

    // Todo.associate = function(models) {
    //     Todo.belongsTo(models.User);
    // };
    return Route;
};
