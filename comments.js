//Create new server-side controller called 'comments.js' and add it to the server/controllers folder. Add the following code to the new controller file:
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');

module.exports = {
    create: function(req, res) {
        Post.findOne({_id: req.params.id}, function(err, post){
            var comment = new Comment(req.body);
            comment._post = post._id;
            post.comments.push(comment);
            comment.save(function(err){
                post.save(function(err){
                    if(err){
                        console.log('Error');
                    } else {
                        res.redirect('/');
                    }
                });
            });
        });
    }
}
// The above code creates a new comment and associates it with the post from which it was created. Then it saves the comment and updates the post's comments array with the new comment. Finally, it redirects to the root route so the page can render the updated post.
//
// Now we need to integrate this controller into the routes. Open the server/config/routes.js file and add the following lines of code to the routes:
app.post('/posts/:id', function(req, res){
    comments.create(req, res);
});
// Now we are ready to test our application. Restart the server and go to localhost:8000. Create a new post and then create a comment for that post. If everything is working correctly, the comment should be saved and the page should refresh to show the new comment.
//
// We now have a fully functional MEAN application. We have the ability to create and display posts and comments, and we can even comment on comments! We will continue to build on this application in the next few assignments. In the meantime, feel free to play around with it and add your own features and functionality.