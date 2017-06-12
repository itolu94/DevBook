module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
				is: /^[a-zA-Z]+[-\s]?[a-zA-Z]+$/i
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
				is: /^[a-zA-Z]+[-\s]?[a-zA-Z]+$/i
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[\w-]+[@]{1}[\w-]+[.]{1}[a-z]+$/i
			}
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Post, {
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});
	return User;
}