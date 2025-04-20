const formContainer = document.getElementById("formContainer");

// Display registration from if user clicks on the Register button
function showRegistrationForm() {
    formContainer.innerHTML = `<form onsubmit="handleRegistration(event)" id="register" style="border-radius: 10px; padding: 2rem">
            <section class="user-details" style="width: 100%">
                <div class="input-item">
                    <label for="firstName">First Name:</label>
                    <input type="text" name="firstName" id="firstName" />
                </div>
                <div class="input-item">
                    <label for="surname"> Surname:</label>
                    <input required type="text" name="surname" id="surname" />
                </div>
                <div class="input-item">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" required/>
                </div>
                <div class="input-item">
                    <label for="phone">Phone:</label>
                    <input type="text" name="phone" id="phone" />
                </div>
                <div class="input-item">
                    <label for="address">Home/Company Full Address:</label>
                    <input type="text" name="address" id="address" required/>
                </div>
                <div class="input-item">
                    <label for="postcode">Postcode:</label>
                    <input type="text" name="postcode" id="postcode" required/>
                </div>
            </section>
            <section class="user-validation" style="width: 100%">
                <div class="input-item">
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username" required/>
                </div>
                <div class="input-item" id="role-container">
                    <div class="role-item">
                        <label for="admin">Staff</label>
                        <select name="admin" id="admin">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <label for="employeeNo">If yes, Please provide your employee number</label>
                    <input type="number" name="employeeNo" id="employeeNo" />
                </div>
                <div class="input-item">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" required/>
                </div>
            </section>
            <button type="submit" class="submit-button">Submit</button>
        </form>`;
}

//Display feedback message
function displayFeebackMess(message, classValue, containerId) {
    var span = document.createElement('span');
    span.classList.value = `${classValue}`;
    span.innerHTML = `<p>${message}</P>`;
    document.getElementById(`${containerId}`).appendChild(span);
}

// Register a user
async function handleRegistration(event) {
    const registrationForm = document.querySelector("form");
    formData = new FormData(registrationForm);
    const employeeNo = document.getElementById("employeeNo").value;
    const selectedRole = document.getElementById("admin").value;

    ////Check admin validity and add admim priviledges
    if (employeeNo.trim() === "" && selectedRole === "Yes") {
        displayFeebackMess(
            "You've selected admin option . Please provide your employee number.",
            "warning",
            "role-container"
        )
        event.preventDefault();
        return false;
    } else if (employeeNo.trim() !== "" && selectedRole === "No") {
        displayFeebackMess(
            "You've provided your employee number. If you're a staff member, Please select yes for staff option.",
            "warning",
            "role-container"
        )
        event.preventDefault();
        return false;
    }
    else if (employeeNo.trim() !== "" && selectedRole === "Yes") {
        formData.append("role", 1);
    } else if (employeeNo.trim() === "" && selectedRole === "No") {
        formData.append("role", 0);
    }

    const registrationFormData = Object.fromEntries(formData.entries());//Make key values object from data entered.

    console.log("Registration form:", registrationFormData);

    //Send request if admin role are set
    if ("role" in registrationFormData) {
        try {
            await fetch("http://localhost:8000/user/register", {
                method: "POST",
                body: JSON.stringify(registrationFormData),
                headers: {
                    "Content-type": "application/json"//Set datatype being sent to JSON
                }
            }).then(function (response) {
                console.log(response.body);
                if (response.ok) {
                    // redirect to login page and display successfull feedback
                    formContainer.innerHTML = `<img class="form-img" loading="lazy" src="../Assets/Images/reuse.jpg" alt="recycle quote">
                <form id="login" style="width: 70%;">
                    <div class="success">Your account has been created. Enter your username and password here to login</div>
                    <div class="login-details">
                        <div class="input-item">
                            <label for="username">Username:</label>
                            <input required type="text" id="username" name="username" />
                        </div>
                        <div class="input-item">
                            <label for="password">Password:</label>
                            <input required type="password" id="password" name="password" />
                        </div>
                    </div>
                    <div class="submit-or-register" style="width: 100%; height: 30%;">
                        <button onclick=handleLogin()  type="button" class="submit-button">Login</button>
                        <h5>Don't have an account yet? click the link bellow to register</h5>
                        <button onclick=showRegistrationForm() class="submit-button" type="submit">Register</button>
                    </div>
                </form>`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

//create cookies for user session
function generateUserCookie(key, value) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 29); //Set exp to 24 hours
    let cookie = document.cookie = `${key} = ${value}; expires = ${expireDate.toGMTString()}; domain=127.0.0.1; path=/`
    console.log(cookie);
    return cookie;
}

//Authenticate user and give access to users dashboard
async function handleLogin() {
    let userType = false;
    const loginForm = document.getElementById("login");
    const formData = Object.fromEntries(new FormData(loginForm).entries()); //Make key values object from data entered.

    try {
        await fetch("http://localhost:8000/user/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"//Set datatype being sent to JSON
            }
        })
            .then((response) => response.json())
            .then((result) => {
                //Save user cookies and redirect to dashboard
                if (result.success) {
                    userType = result.type;
                    generateUserCookie("RecycleNowJwt", result.usersToken);
                    generateUserCookie("username", result.username);
                    generateUserCookie("userId", result.userId);
                    generateUserCookie("email", result.email);
                    generateUserCookie("type", userType);
                    generateUserCookie("phone", result.phone);
                    generateUserCookie("address", result.address);
                    generateUserCookie("postcode", result.postcode);

                    if (userType) {
                        window.location.href = "../dashboardAdmin/adminDashboard.html";
                    } else {
                        window.location.href = "../dashboardUser/userDashboard.html";
                    }
                } else {
                    console.log("Accout does not exist");
                    formContainer.innerHTML = `<img class="form-img" loading="lazy" src="../Assets/Images/reuse.jpg" alt="recycle quote">
            <form id="login" style="width: 70%;">
                <div class="failure">Incorect username or password entered...Please try again</div>
                <div class="login-details">
                    <div class="input-item">
                        <label for="username">Username:</label>
                        <input required type="text" id="username" name="username" />
                    </div>
                    <div class="input-item">
                        <label for="password">Password:</label>
                        <input required type="password" id="password" name="password" />
                    </div>
                </div>
                <div class="submit-or-register" style="width: 100%; height: 30%;">
                    <button onclick=handleLogin()  type="button" class="submit-button">Login</button>
                    <h5>Don't have an account yet? click the link bellow to register</h5>
                    <button onclick=showRegistrationForm() class="submit-button" type="submit">Register</button>
                </div>
            </form>`
                }
            });
    } catch (error) {
        console.log(error);
    }

}