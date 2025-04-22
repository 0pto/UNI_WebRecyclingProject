import jwt from "jsonwebtoken";
import User from "../models/users.js";
import BookingStats from "../models/bookingStats.js";
import SalesStats from "../models/salesStats.js";
import { Op } from "sequelize";

//Handle user registration
export const registerAUser = async (req, res) => {
	try {
		let doesUserExist = await User.findOne({
			where: {
				[Op.or]: [{
					username: req.body.username
				},
				{
					email: req.body.email
				}
				]
			}
		});

		//Send existing data response if user name or email already exist.
		if (doesUserExist) {
			res.status(409).json({
				message: "Looks like either the username or the email already exist.Please chose new dertails and try again"
			});
		} else {
			const userObject = {
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
				first_name: req.body.firstName,
				surname: req.body.surname,
				address: req.body.address,
				postcode: req.body.postcode,
				phone: req.body.phone,
				image: req.body.image,
				is_admin: parseInt(req.body.role)
			};
			await User.create(userObject);
			res.status(201).send({
				success: true,
				message: `New user with username ${userObject.username} successfully created...`
			});
		}
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};

//Handle user athentication for login
export const loginUser = async (req, res) => {
	try {
		/*generate token for user session more information on jwt and how it is 
		used can be found here: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
		#*/
		const usersToken = jwt.sign(req.body.username, process.env.JWT_SECRET);
		res.status(200).json({
			success: true,
			userId: req.matchingUser.id,
			username: req.matchingUser.username,
			email: req.matchingUser.email,
			type: req.matchingUser.is_admin,
			phone: req.matchingUser.phone,
			address: req.matchingUser.address,
			postcode: req.matchingUser.postcode,
			usersToken
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

//Handle user's details update.
export const updateUser = async (req, res) => {
	try {
		// define the filter
		const filter = { username: req.body.username };

		const updateData = {};

		//Populate "updateData" object with client data  
		for (const [key, value] of Object.entries(req.body)) {
			if (value.trim() !== "" && key !== "old_password") {
				updateData[key] = value;
			}
		}

		await User.update(
			{
				...updateData
			},
			{ where: { ...filter } }
		)

		const newUserData = await User.findOne({ where: { ...filter } });

		res.status(200).json({
			success: true,
			userId: newUserData.id,
			username: newUserData.username,
			email: newUserData.email,
			type: newUserData.is_admin,
			phone: newUserData.phone,
			address: newUserData.address,
			postcode: newUserData.postcode
		});
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};

//Get all data for bookings statistics and recycled items statistics
export const getBookingsAndSalesTotals = async (req, res) => {
	try {
		//Get totals for bookings
		const allMonthlyTotalBookings = await BookingStats.findAll({
			attributes: {
				exclude: [
					'id',
					'startDate',
					'createdAt',
					'updatedAt'
				]
			},
		});

		//Get recycled quantities totals.
		const allMonthlyTotalSales = await SalesStats.findAll({
			attributes: {
				exclude: [
					'id',
					'startDate',
					'createdAt',
					'updatedAt'
				]
			},
		});

		//send response dynamically.
		if (allMonthlyTotalBookings && allMonthlyTotalSales) {
			res.status(200).send({
				success: true,
				salesTotals: allMonthlyTotalSales,
				bookingTotals: allMonthlyTotalBookings
			});
		} else if (allMonthlyTotalBookings && !allMonthlyTotalSales) {
			res.status(200).send({
				success: true,
				salesTotals: ["No sales data yet"],
				bookingTotals: allMonthlyTotalBookings
			});
		} else if (!allMonthlyTotalBookings && allMonthlyTotalSales) {
			res.status(200).send({
				success: true,
				salesTotals: allMonthlyTotalSales,
				bookingTotals: ["No bookings data yet"]
			});
		} else {
			//Send no content client response
			res.status(204).send({
				success: true,
				message: ["No data yet"]
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};

//Get user by id
export const getUserByid = async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

/*****may be later if time *****/
export const deleteUser = async (req, res) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).send({
			success: true,
			message: `${req.body.username} has been deleted`
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error: error.message });
	}
};