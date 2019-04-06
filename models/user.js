<<<<<<< HEAD
var crypto = require('crypto');
=======
const crypto = require('crypto');
>>>>>>> fdd8b196613ab99ff138bbba2304e09013568e6c

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