export function setUsersSession(params) {
    // get cookies and save user's session "userSessionObj"
    const allCookies = document.cookie;
    let userSessionObj = {};
    console.log("All cookies array:", userSessionObj);
    console.log("All cookies:", allCookies);
    cookiesArray = allCookies.split(";");
    cookiesArray.forEach(cookie => {
        keyValueArray = cookie.split("=");
        newKey = keyValueArray[0].trim();
        console.log("newKey", newKey);
        newValue = keyValueArray[1];
        userSessionObj[newKey] = newValue;
    });
    return userSessionObj;
}