

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
				Post.belongsTo(models.Member, {
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});
	return Post;
};