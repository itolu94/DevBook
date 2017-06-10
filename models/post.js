module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var Post = sequelize.define("Post", {
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,2500];
            }
        }
    }, {
        classMethods: {
            associate: function(models){
                //switch models.member to models.user when it exists
                Post.belongsTo(models.member, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Post;
=======
	var Post = sequelize.define("Post", {
		post: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1,2500]
			}
		}
	}, {
		classMethods: {
			associate: function(models){
				//switch models.member to models.user when it exists
				Post.belongsTo(models.Member, {
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});
	return Post;
>>>>>>> 9f453ddbf436155e5fba8f7468b60efcd16d1208
};