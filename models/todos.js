module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define(
        "Todo",
        {
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
            complete: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        { timestamps: false }
    );

    // Todo.associate = function(models) {
    //     Todo.belongsTo(models.User);
    // };
    return Todo;
};
