module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                notNull: true
            }
        },

        password: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                len: [8]
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Todo, {
            onDelete: "cascade"
        });
    };
    return User;
};
