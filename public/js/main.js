// This script handles fetching and displaying posts, as well as creating new posts.

const output = document.getElementById("output");
const btn = document.getElementById("get-posts-btn");

const form = document.getElementById("create-post-form");
const submitBtn = document.getElementById("create-post-btn");

// Function to fetch and display posts
async function showPosts() {
  try {
    const res = await fetch('http://localhost:8080/api/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    output.innerHTML = '';

    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.textContent = post.title + ': ' + post.content;
        output.appendChild(postElement);
    })
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to create a new post
async function createPost(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const title = formData.get('title');
    const content = formData.get('content');

    try {
        const res = await fetch('http://localhost:8080/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!res.ok) {
            throw new Error('Failed to create post');
        }

        const newPost = await res.json();
        console.log('Post created:', newPost);
        showPosts(); // Refresh the list of posts
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

// Event listeners
submitBtn.addEventListener("click", createPost);
btn.addEventListener("click", showPosts);