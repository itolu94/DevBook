var bcrypt = require("bcrypt");
var saltRounds = 10;

module.exports = function(sequelize, DataTypes) {
	var Member = sequelize.define("Member", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			},
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 72]
			}
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
			// },

			//encryption
			hashPassword: function(password, cb) {
				bcrypt.genSalt(saltRounds, function(err, salt){
					bcrypt.hash(password, salt, function(err, hash){
						if (err) cb(err);
						cb(null, hash);
					});
				});
			}
		},
		instanceMethods: {
			//decryption
			checkPassword: function(pass, cb) {
				bcrypt.compare(pass, this.password, cb);
			}
		},
		hooks: {
			beforeCreate: function(member) {
				Member.hashPassword(member.password, function(err, hash){
					if (err) throw err;
					member.setDataValue("password", hash);
					member.save();
				});
			}
		}

	});
	return Member;
};