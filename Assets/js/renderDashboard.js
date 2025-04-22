// get cookies and save user's session "userSessionObj"
const allCookies = document.cookie;
let userSessionObj = {};
cookiesArray = allCookies.split(";");
cookiesArray.forEach((cookie) => {
	keyValueArray = cookie.split("=");
	newKey = keyValueArray[0].trim();
	newValue = keyValueArray[1];
	userSessionObj[newKey] = newValue;
});

console.log("userSessionObj is:", userSessionObj);

//Log out and redirect to home page.
function HandleSignOut() {
	try {
		document.cookie = `RecycleNowJwt =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `type =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `email =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `username =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `address =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `phone =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `userId =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		document.cookie = `postcode =; Max-Age=-99999999; domain=127.0.0.1; path=/`;
		window.location.href = "../index.html";
	} catch (error) {
		console.log("Error:", error);
	}
}

// function to create new cookies for user session.
function generateUserCookie(key, value) {
	let expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 29); //Set exp to 24 hours
	let cookie = document.cookie = `${key} = ${value}; expires = ${expireDate.toGMTString()}; domain=127.0.0.1; path=/`
	console.log(cookie);
	return cookie;
}

function showUpdateUserDetailsForm() {
	document.getElementById('updateDetails').style.display = "flex";
}

// function to display feedback message
function displayFeebackMess(message, classValue, containerId) {
	var span = document.createElement('span');
	span.classList.value = `${classValue}`;
	span.innerHTML = `<p>${message}</P>`;
	document.getElementById(`${containerId}`).appendChild(span);
}

//Handle users details uptade action
async function updateUserDetails(event) {
	event.preventDefault();

	const updateUserDetailsForm = document.getElementById("updateDetails");

	//Make key values object from data entered and add username rom cookies
	formData = new FormData(updateUserDetailsForm);
	formData.append("username", userSessionObj.username);

	const updateUserDetailsFormData = Object.fromEntries(formData.entries());

	//Send request
	try {
		const response = await fetch(
			"http://localhost:8000/user/updateDetails",
			{
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(updateUserDetailsFormData)
			}
		);

		const responseBody = await response.json();
		generateUserCookie("phone", responseBody.phone);
		generateUserCookie("address", responseBody.address);
		generateUserCookie("postcode", responseBody.postcode);

		if (!response.ok) {
			console.error(responseBody.error)
		}

		displayFeebackMess(
			"Details updated successfully",
			"success",
			"update-container"
		)

		//sleep for 2 seconds whilst displaying success message
		await new Promise(r => setTimeout(r, 2000));

		location.reload();

	} catch (error) {
		console.log(error);
	}
}

//Render dashboard for non admin and admin users if user session exists.
function displayDashboard() {
	if (userSessionObj.RecycleNowJwt && userSessionObj.type === "true") {
		document.getElementById("adminDashboardContainer").innerHTML = `
        <div class="profile">
			<div id="details">
				<!-- image with lazy loading for better rendering performnance -->
				<img id="profilePicture" loading="lazy" src="../Assets/Images/user-solid.svg" alt="profile picture"
					height="150px" width="150px">
				<div class="username">
					<p>${userSessionObj.username}</p>
					<p>${userSessionObj.email}</p>
					<button class="signOut" onClick="HandleSignOut()" >
						<img id="logoutIcon" loading="lazy" src="../Assets/Images/sign-out-icon.svg" alt="logout Icon" height="30px" width="30px">
						<span>Sign Out</span>
					</button>
				</div>
			</div>
			<div class="greetings-and-update" id="update-container">
				<span>Hello ${userSessionObj.username}, Welcome to your dashboard!</span>
				<!-- button to update users details add events handlers later -->
				<button class="edit-btn" onClick="showUpdateUserDetailsForm()" type="button">Update My Details</button>
				<!-- Form to be dipays once the update details button is clicked -->
				<form id="updateDetails" onSubmit="updateUserDetails(event)" method="post"
					style="display: none;">
					<div class="input-item">
						<label for="phone">Phone Number:</label>
						<input type="text" id="phone" name="phone" value="${userSessionObj.phone}"/>
					</div>
					<div class="input-item">
						<label for="address">Home/Company Address:</label>
						<input type="text" id="address" name="address" value="${userSessionObj.address}"/>
					</div>
					<div class="input-item">
						<label for="postcode">Postcode:</label>
						<input type="text" id="postcode" name="postcode" value="${userSessionObj.postcode}"/>
					</div>
					<div class="input-item">
						<label for="old_password">Old Password:</label>
						<input type="password" required id="old_password" name="old_password"/>
					</div>
					<div class="input-item">
						<label for="password">New Password:</label>
						<input type="password" id="password" name="password"/>
					</div>
					<button type="submit" class="submit-button update-btn">Update</button>
				</form>
			</div>
		</div>
        
        <!-- Booking Details -->
        <div class="bookings"></div>

        <!-- Tickets -->
        <div class="tickets">
            <h2>Tickets</h2>
            <div id="tickets-list"></div>
        </div>

        <!--statistics-->
        <div class="statistics">
            <canvas id="salesPieChart" style="width:45%; max-width:600px; height:100%"></canvas>
            <canvas id="barGraph" style="width:45%; max-width:600px"></canvas>
        </div>
        `;
	} else if (userSessionObj.RecycleNowJwt && userSessionObj.type === "false") {
		document.getElementById("userDashboardContainer").innerHTML = `
        <!--profile details-->
		<div class="profile">
			<div id="details">
				<!-- image with lazy loading for better rendering performnance -->
				<img id="profilePicture" loading="lazy" src="../Assets/Images/user-solid.svg" alt="profile picture"
					height="150px" width="150px">
				<div class="username">
					<p>${userSessionObj.username}</p>
					<p>${userSessionObj.email}</p>
					<button class="signOut" onClick="HandleSignOut()">
						<img id="logoutIcon" loading="lazy" src="../Assets/Images/sign-out-icon.svg" alt="logout Icon" height="30px" width="30px">
						<span>Sign Out</span>
					</button>
				</div>
			</div>
			<div class="greetings-and-update" id="update-container">
				<span>Hello ${userSessionObj.username}, Welcome to your dashboard!</span>
				<!-- button to update users details add events handlers later -->
				<button class="edit-btn" onClick="showUpdateUserDetailsForm()" type="button">Update My Details</button>
				<!-- Form to be dipays once the update details button is clicked -->
				<form id="updateDetails" onSubmit="updateUserDetails(event)" method="post"
					style="display: none;">
					<div class="input-item">
						<label for="phone">Phone Number:</label>
						<input type="text" id="phone" name="phone" value="${userSessionObj.phone}"/>
					</div>
					<div class="input-item">
						<label for="address">Home/Company Address:</label>
						<input type="text" id="address" name="address" value="${userSessionObj.address}"/>
					</div>
					<div class="input-item">
						<label for="postcode">Postcode:</label>
						<input type="text" id="postcode" name="postcode" value="${userSessionObj.postcode}"/>
					</div>
					<div class="input-item">
						<label for="old_password">Old Password:</label>
						<input type="password" required id="old_password" name="old_password"/>
					</div>
					<div class="input-item">
						<label for="password">New Password:</label>
						<input type="password" id="password" name="password"/>
					</div>
					<button type="submit" class="submit-button update-btn">Update</button>
				</form>
			</div>
		</div>
        
        <!-- Booking Details -->
        <div class="bookings">
            <h2>Recurring Bookings</h2>
            <div id="multi-bookings"></div>
            <h2>Single Bookings</h2>
            <div id="single-bookings"></div>
        </div>

        <!-- Tickets/Complaints -->
        <div class="tickets">
            <h2>Tickets/Complaints</h2>
            <div id="tickets-list"></div>
        </div>
        `;
	} else {
		window.location.href = "../login/login.html";
	}
}

displayDashboard();


