//Check if the email format is valid
export const isEmailValid = async (req, res, next) => {
	try {
		const regexForValidEmail = /^\S+@\S+\.\S+$/;
		const email = req.body.email;

		if (regexForValidEmail.test(email)) {
			console.log("the emails format is valid");
			next();
		} else {
			//Send feedback throw and Throw error if entered emails format is not valid
			res.status(400).send({
				success: false,
				message: {
					reason: "Invalid email used"
				}
			});
			throw Error("please enter a valid email");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

//Check if the password is valid and secure
export const isPasswordValid = async (req, res, next) => {
	if (req.method === "POST") {
		checkPasswordValidity(req, res, next)
	}
	else if (req.method === "PUT") {
		if (req.body.password.trim() !== "" && req.body.username.trim() !== "") {
			checkPasswordValidity(req, res, next)
		}
		next(); //move to next validations if successfull action
	}
};

function checkPasswordValidity(req, res, next) {
	try {
		const regexForValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
		const chosenPassword = req.body.password;
		const commonPassList = [".Qwerty1", "!Q1w2e3r4", ".Password123"];
		const isPasswordCommon = commonPassList.includes(chosenPassword);

		if (regexForValidPassword.test(chosenPassword) && !isPasswordCommon) {
			console.log("the passwords format is valid");
			next(); //move to next validations if successfull action
		} else {
			// throw an error if entered emails format is not valid
			res.status(400).send({
				success: false,
				message: {
					reason: "Password must follow the following criteria:",
					criteria1: "Minimum 8 characters",
					criteria2: "Minimum one uppercase letter",
					criteria3: "Minimum one lowercase English letter",
					criteria4: "At least one digit",
					criteria5: "At least one special character"
				}
			});
			throw Error("please enter a valid password");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
}