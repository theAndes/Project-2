module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    Todo.associate = function(models) {
        Todo.belongsToMany(models.User, {
            through: "usertodos"
        });
    };
    return Todo;
};
