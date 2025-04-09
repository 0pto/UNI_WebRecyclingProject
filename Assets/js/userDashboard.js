` <div class="nav-container">
            <a href="#" class="logo">RecycleNow</a>
            <ul class="nav-menu">
                <li class="nav-item"><a href="../index.html" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                <li class="nav-item">
                    <a href="#" class="nav-link">How to Recycle</a>
                </li>
                <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
            </ul>
            <button class="hamburger">☰</button>
        </div>`

function displayDashboard() {
    const allCookies = document.cookie;
    let userSessionObj = {};


    cookiesArray = allCookies.split(";");

    cookiesArray.forEach(cookie => {
        keyValueArray = cookie.split("=");
        newKey = keyValueArray[0].trim();
        console.log("newKey", newKey);
        newValue = keyValueArray[1];
        userSessionObj[newKey] = newValue;
    });

    if (userSessionObj.RecycleNowJwt) {
        document.getElementById("nav-container").innerHTML = `
                 <div class="nav-container">
                    <a href="#" class="logo">RecycleNow</a>
                    <ul class="nav-menu">
                        <li class="nav-item"><a href="../index.html" class="nav-link">Home</a></li>
                        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">How to Recycle</a>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
                        <li class="nav-item"><a href="#" class="nav-link">Ideas & Tips</a></li>
                    </ul>
                    <button class="hamburger">☰</button>
                </div>
                `
        document.getElementById("userDashboardContainer").innerHTML = `<!--profile details-->
                <div class="profile">
                    <div id="details">
                        <!-- image with lazy loading for better rendering performnance -->
                        <img id="profilePicture" loading="lazy" src="../Assets/Images/user-solid.svg" alt="profile picture"
                            height="150px" width="150px">
                        <div class="username">
                            <p>${userSessionObj.username}</p>
                            <p>${userSessionObj.email}</p>
                            <button class="SignOut">
                                <img id="profilePicture" loading="lazy" src="../Assets/Images/sign-out-icon.svg" alt="profile picture" height="150px" width="150px">
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                    <div class="greetingsand-update">
                        <span>Hello ${userSessionObj.username}, Welcome to your dashboard!</span>
                        <!-- button to update users details add events handlers later -->
                        <button class="submit-button" type="submit">Update My Details</button>
                        <!-- Form to be dipays once the update details button is clicked -->
                        <form id="updateDetails" action="" method="post"
                            style="display: none; border-radius: 10px; padding: 2rem">
                            <section class="user-details" style="width: 100%">
                                <div class="input-item">
                                    <label for="name">Fist Name:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Last Name:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Phone Number:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Home/Company Address:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Postcode:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                            </section>
                            <section id="usernamePassword" class="username-password" style="width: 100%">
                                <div class="input-item">
                                    <label for="name">Usename:</label>
                                    <input type="text" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Email:</label>
                                    <input type="email" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">New Password:</label>
                                    <input type="password" id="name" name="user_name" />
                                </div>
                                <div class="input-item">
                                    <label for="name">Confirm Password:</label>
                                    <input type="password" id="name" name="user_name" />
                                </div>
                            </section>
                            <button type="submit" class="submit-button">Update</button>
                        </form>
                    </div>
                </div>
                <!--booking details-->
                <div class="bookings">
                </div>
                <!--statistics-->
                <div class="statistics">
                    <canvas id="salesPieChart" style="width:45%; max-width:600px; height:100%"></canvas>
                    <canvas id="barGraph" style="width:45%; max-width:600px"></canvas>
                </div>
                `
    } else {
        window.location.href = "../login/login.html";
    }
}

displayDashboard(); //render dashboard if user session exists