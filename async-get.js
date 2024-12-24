const resultDiv = document.querySelector('#result');

const fetchPosts = async () => {
    try {
        const response = await fetch('async-get.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();

        // Clear existing posts and render the new ones
        resultDiv.innerHTML = '';
        posts.forEach((post) => {
            const postElement = document.createElement('p');
            postElement.textContent = post.text;
            resultDiv.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
        resultDiv.innerHTML = '<p style="color: red;">Failed to load posts.</p>';
    }
}
fetchPosts();
