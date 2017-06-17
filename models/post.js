

module.exports = function(sequelize, DataTypes) {
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
				Post.belongsTo(models.User, {
					foreignKey: {
						allowNull: false
					}
				});

				Post.hasMany(models.Comment, {
					foreignKey: {
						allowNull: false
					}
				});

				Post.belongsToMany(models.User, {
					as: "Likes",
					through: "post_likes"
				});
			}
		}
	});
	return Post;
};