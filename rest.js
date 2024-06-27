function fetchAndRenderPosts(url) {
    const resultDiv = document.getElementById('results');
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(posts => {
            let goku = '';
            if (Array.isArray(posts)) {
                posts.forEach(post => {
                    goku += `
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </div>
                `;
                });
            } else {
                goku = `
                    <div class="post">
                        <h2>${posts.title}</h2>
                        <p>${posts.body}</p>
                    </div>
                `;
            }

            resultDiv.innerHTML = goku;
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        });
}

document.getElementById('allPosts').addEventListener('click', function () {
    fetchAndRenderPosts('https://jsonplaceholder.typicode.com/posts');
});

document.getElementById('post10').addEventListener('click', function () {
    fetchAndRenderPosts('https://jsonplaceholder.typicode.com/posts/10');
});

document.getElementById('newPost').addEventListener('click', function () {
    const newPost = {
        title: 'Create Post',
        body: 'This is a new post.',
        userId: 1
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(post => {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>New post created with ID: ${post.id}</p>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('results');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    });
});       


document.getElementById('replacePost').addEventListener('click', function () {
    const replacePost = {
        id: 12,
        title: 'Updated Post',
        body: 'This is an updated post.',
        userId: 1
    };

    fetch('https://jsonplaceholder.typicode.com/posts/12', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(replacePost)
    })
    .then(response => response.json())
    .then(post => {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post with ID 12 updated successfully:</p><pre>${JSON.stringify(post, null, 2)}</pre>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>An error occurred: ${error}</p>`;
    });
});

document.getElementById('deletePost12').addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/12', {
        method: 'DELETE'
    })
    .then(response => { 
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>Post with ID 12 deleted successfully.</p>`;
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p>An error occurred: ${error}</p>`;
    });
});