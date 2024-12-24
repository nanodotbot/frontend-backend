const text = document.querySelector('#text');
const add = document.querySelector('#add-content');
const message = document.querySelector('#message');

add.addEventListener('click', (e) => {
    e.preventDefault();

    const content = text.value.trim();

    if (!content) {
        // Display a warning if the input is empty
        message.innerHTML = '<span style="color: red;">Content cannot be empty.</span>';
        return;
    }

    const jsonData = JSON.stringify({ content });

    async function postData() {
        try {

            const response = await fetch('async-post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let responseData;
            
            try {
                // Attempt to parse the JSON response
                responseData = await response.json();

            } catch (jsonError) {
                throw new Error('Failed to parse JSON response: ' + jsonError.message);
            }

            if (responseData.message) {
                message.innerHTML = `<span style="color: green;">${responseData.message}</span>`;

            } else {
                throw new Error('Unexpected server response format.');
            }
            
        } catch {
            console.error('Error during POST request:', error);
            message.innerHTML = `<span style="color: red;">An error occurred: ${error.message}</span>`;
        }
    }
    postData();
    fetchPosts();
});
