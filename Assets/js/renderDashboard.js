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

function HandleSignOut() {
	try {
		document.cookie = `RecycleNowJwt =; Max-Age=-99999999; domain=127.0.0.1; path=/`
		document.cookie = `type =; Max-Age=-99999999; domain=127.0.0.1; path=/`
		document.cookie = `email =; Max-Age=-99999999; domain=127.0.0.1; path=/`
		document.cookie = `username =; Max-Age=-99999999; domain=127.0.0.1; path=/`
		window.location.href = "../index.html";
	} catch (error) {
		console.log("Error:", error)
	}
}

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
	} else if (userSessionObj.RecycleNowJwt && userSessionObj.type === "false") {
		document.getElementById("userDashboardContainer").innerHTML = `<!--profile details-->
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
		`

	} else {
		window.location.href = "../login/login.html";
	}
}

displayDashboard(); //render dashboard if user session exists