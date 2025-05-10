
function renderContent() {
    // get cookies and save user's session "userSessionObj"
    const allCookies = document.cookie;
    let userSessionObj = {};
    cookiesArray = allCookies.split(";");
    cookiesArray.forEach(cookie => {
        keyValueArray = cookie.split("=");
        newKey = keyValueArray[0].trim();
        newValue = keyValueArray[1];
        userSessionObj[newKey] = newValue;
    });
    const mainContent = document.getElementById("mainContent");
    if (userSessionObj.RecycleNowJwt) {
        mainContent.innerHTML = `
        <!--Display all posts-->
        <div class="posts"id="posts">
            <div id ="makeAPostContainer">     
                <a id="makeAPost" href="#submitPost">
                    <img loading="lazy" src="../Assets/Images/share-icon.svg" alt="share" style="width: 2rem; height: 2rem">
                    <span>Share An Idea</span>
                </a>
            </div>
        </div>

        <!-- Form to publish new posts-->
        <form id="sharePost">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" /> 
            <label for="postContent">Post Content</label>
            <textarea  rows="10" type="text" id="description" name="description" placeholder="Start your post here"></textarea>
            <button id="submitPostBtn" onClick=submitIdea() type="button" class="submit-button">Publish</button>
        </form>
		`
    } else {
        window.location.href = "../login/login.html";
    }
}

renderContent(); //render dashboard if user session exists



async function getAllPosts() {
    const postsContent = document.getElementById("posts");
    const title = document.getElementById("title");
    try {
        await fetch("http://localhost:8000/posts", {
            method: "GET",
            headers: {
                "Content-type": "application/json"//Set datatype being sent to JSON
            }
        })
            .then((response) => response.json())
            .then((result) => {
                allPosts = result.posts
                console.log(allPosts)
                allPosts.map((post) => {
                    var div = document.createElement('div');
                    div.classList.value = "postItem";
                    div.innerHTML = `
                        <!-- image with lazy loading for better rendering performnance -->
                        <img class="profilePicture" loading="lazy" src="../Assets/Images/user-solid.svg" alt="profile picture">  
                        <div class="post-content">
                            <p>By ${post.user.username}</p>
                            <h3 id="title">${post.title}</h3>
                            <div id="postContent">${post.description}</div>
                        </div>`
                    postsContent.appendChild(div);
                })

            })
    } catch (error) {
        console.log(error);
    }
}

getAllPosts();