// Submit new posts
async function submitIdea() {
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
    const postForm = document.getElementById("sharePost");
    console.log(postForm);
    formData = new FormData(postForm)
    formData.append("username", userSessionObj.username);
    const postData = Object.fromEntries(formData.entries());

    console.log("postData", postData);

    try {
        await fetch("http://localhost:8000/post", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json"//Set datatype being sent to JSON
            }
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                alert("Congrats... your post was published with success.");
                location.reload(true);
            }
        });
    } catch (error) {
        console.log(error);
    }
}