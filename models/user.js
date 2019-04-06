const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [1],
                notNull: true,
                isAlpha: true
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                len: [1],
                notNull: true,
                isEmail: true,
                unqiue: true
            }
        },
        password: {
            type: DataTypes.STRING,
            get() {
                return () => this.getDataValue('password')
            }
        }
    });
};