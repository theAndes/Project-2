module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        "user",
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                notEmpty: true
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8]
                }
            },

            last_login: {
                type: DataTypes.DATE
            },

            status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active"
            }
        },
        { timestamps: false }
    );

    // User.associate = function(models) {
    //     User.hasMany(models.Todo, {
    //         onDelete: "cascade"
    //     });
    // };
    return User;
};
