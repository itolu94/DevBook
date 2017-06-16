module.exports = function(sequelize, DataTypes) {
	var Comment = sequelize.define("Comment", {
		comment: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1]
			}
		}
		}, {
		classMethods: {
			associate: function(models){
				Comment.belongsTo(models.Post, {
					foreignKey: {
						allowNull: false
					}
				});

				Comment.belongsTo(models.User, {
					foreignKey: {
						allowNull: false
					}
				});

				Comment.belongsToMany(models.User, {
					as: "Likes",
					through: "comment_likes"
				});
			}
		}
	});
	return Comment;
}