module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[a-z]+([-\s]?[a-z]+)?$/i
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[a-z]+([-\s]?[a-z]+)?$/i
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[\w-]+[@]{1}[\w-]+[.]{1}[a-z]+$/i
			}
		},
		image: {
			type: DataTypes.STRING,
			defaultValue: ""
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Post, {
					foreignKey: {
						allowNull: false
					}
				});

				User.belongsToMany(models.User, {
					as: 'Friends',
					through: 'UserFriends'
				});
			}
		}
	});
	return User;
}