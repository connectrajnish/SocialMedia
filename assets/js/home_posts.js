{
    //method to submit the form for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //prevent dafault submission
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error){
                    console.log(error);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            ${post.content}
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
            
        </p>
        <p>
        <small>
            ${post.user.name}
        </small>
        </p>
    
        <!-- Adding coment -->
        <div class="post-comments">
    
            <!-- to display comment -->
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        
            <form action="/comments/create" method="post">
                <textarea name="content" cols="10" rows="2" placeholder="comment here..." required></textarea>
                <input type="hidden" name="postId" value="${post._id}">        <!-- sending the post id for which comment need t be added -->
                <button type="submit">Comment</button>
            </form>
        </div>
    </li>`);
    }

    //method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                method: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },
                error: function(err){
                    console.log(err);
                }
            });
        });
    };

    createPost();
}

// $(document).ready(function() {
//     createPost();
//     console.log('Hello')
//   });
  