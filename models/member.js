module.exports = function(sequelize, DataTypes) {
	var Member = sequelize.define("Member", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			},
		},
		//Rework password to work with bcrypt if needed
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			},
		}
	}, {
		classMethods: {
			//Set up id as foreign key for profile, commented out until User exists
			// associate: function(models) {
			// 	Member.belongsTo(models.User, {
			// 		foreignKey: {
			// 			allowNull: false
			// 		}
			// 	});
			// }
			//encryption method goes here
		},
		instanceMethods: {
			//decryption method goes here
			checkPassword: function(password) {
				return this.password === password;
			}
		}

	});
	return Member;
};