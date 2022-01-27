const User = require('./User')
const Post = require('./Post')


// Define the relationship between the User and Post models
User.hasMany(Post, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE'
});

Post.belongsTo(User, {
   foreignKey: 'user_id',
})

module.exports = { User, Post }
