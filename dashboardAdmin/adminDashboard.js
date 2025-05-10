//Keys for the booking barchart
let allBookingCategory = [
	"Single: House Furnitures",
	"Reoccuring: House Furnitures",
	"Single: Electronics",
	"Reoccuring: Electronics",
	"Single: Clothing",
	"Reoccuring: Clothing",
	"Single: Auto Parts",
	"Reoccuring: Auto Parts",
	"Single: Building Materials",
	"Reoccuring: Building Materials",
	"Single: Plastic",
	"Reoccuring: Plastic",
	"Single: Paper",
	"Reoccuring: Paper",
	"Single: Glass",
	"Reoccuring: Glass"
];
let barColors = [
	"#76db18",
	"#18db55",
	"#d9b382",
	"#f4a845",
	"#68a8b0",
	"#145d9f",
	"#b8c288",
	"#fdf9b4",
	"#9c6e6e",
	"#ff7272",
	"#737d4d",
	"#c4cca5",
	"#cca5a5",
	"#d63636",
	"#364ed6",
	"#434f91"
];

//Keys for the refuse amount recycled pie chart
let salesData = [
	"House Furnitures",
	"Electricals",
	"Clothing",
	"Auto parts",
	"Building material"
];
/* Total sales array in pounds for each category per year 
( this is just some dummy data; to be replaced by fetched data later)*/
let salesDataValue = [4678, 106788, 5798, 2778, 40778];
let sectionsColors = [
	"#76db18",
	"#18db55",
	"#d9b382",
	"#f4a845",
	"#68a8b0",
	"#145d9f",
	"#b8c288",
	"#fdf9b4"
];


// Generate pie chart
async function generatePieChart(categories, values, colors) {
	new Chart("salesPieChart", {
		type: "pie",
		data: {
			labels: categories,
			datasets: [
				{
					backgroundColor: colors,
					data: values
				}
			]
		},
		options: {
			title: {
				display: true,
				text: "Sales Statistics Past Month By Category"
			}
		}
	});
}

// Generate bar graph
function generateBarGraph(categories, values, colors) {
	new Chart("barGraph", {
		type: "bar",
		data: {
			labels: categories,
			datasets: [
				{
					backgroundColor: colors,
					data: values
				}
			]
		},
		options: {
			title: {
				display: true,
				text: "Booking Statistics Past Month"
			}
		}
	});
}

//Get data and generate graph and pie chart
async function populateCharts() {

	try {
		await fetch("http://localhost:8000/user/statistics/", {
			method: "GET",
			headers: {
				"Content-type": "application/json",//Set datatype being sent to JSON
				"Authorization": `Bearer ${userSessionObj.RecycleNowJwt}`//send token for authentication
			}
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				let bookingsList = Object.values(result.bookingTotals[0])
				bookingsList = bookingsList.slice(2);
				console.log(bookingsList);
				let quantityRecycledList = Object.values(result.salesTotals[0])
				quantityRecycledList = quantityRecycledList;
				console.log(quantityRecycledList)
				// if (service.monthlyPrice && service.monthlyPrice !== 0) {
				generatePieChart(salesData, quantityRecycledList, sectionsColors);
				generateBarGraph(allBookingCategory, bookingsList, barColors);
				// } else {

				// }
			});

	} catch (error) {
		console.log(error);
	}
}

populateCharts();

/***** Scripts for tickets *****/
document.addEventListener("DOMContentLoaded", async () => {
	const BACKEND_URL = "http://localhost:8000"; // Adjust if your backend runs on a different port
	const ticketsContainer = document.getElementById("tickets-list");

	// Check if the user is an admin using cookies from user session object.
	let isAdmin = userSessionObj.type;

	if (isAdmin !== "true") {
		alert("Access denied. You do not have permission to view this page.");
		window.location.href = "../index.html";
		return;
	}

	// Fetch all tickets
	try {
		const response = await fetch(`${BACKEND_URL}/api/tickets`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Is-Admin": isAdmin, // Pass isAdmin in headers for backend validation
			},
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`Failed to fetch tickets: ${errorData.error || response.statusText}`
			);
		}
		const tickets = await response.json();
		console.log("Fetched tickets:", tickets);

		if (tickets.length === 0) {
			ticketsContainer.innerHTML = "<p>No tickets found.</p>";
		} else {
			const table = document.createElement("table");
			table.innerHTML = `
		  <tr>
			<th>Ticket ID</th>
			<th>Account</th>
			<th>Subject</th>
			<th>Description</th>
			<th>Admin Response</th>
			<th>Date/Time</th>
			<th>Status</th>
			<th>Actions</th>
		  </tr>
		`;
			tickets.forEach((ticket) => {
				const row = document.createElement("tr");
				row.innerHTML = `
			<td>${ticket.ticketid}</td>
			<td>${ticket.account}</td>
			<td>${ticket.subject}</td>
			<td>${ticket.description}</td>
			<td>${ticket.adminResponce || ""
					}</td> <!-- Changed from adminResponse -->
			<td>${ticket.datetime}</td>
			<td>${ticket.status}</td>
			<td>
			  <button class="edit-btn" data-id="${ticket.ticketid}">Edit</button>
			  <button class="delete-btn" data-id="${ticket.ticketid
					}">Delete</button>
			</td>
		  `;
				table.appendChild(row);

				// Add edit form below the row (hidden by default)
				const editRow = document.createElement("tr");
				editRow.classList.add("edit-form");
				editRow.style.display = "none";
				editRow.innerHTML = `
			<td colspan="8">
			  <form class="edit-ticket-form" data-id="${ticket.ticketid}">
				<div class="input-item">
				  <label>Status:</label>
				  <select name="status" required>
					<option value="Open" ${ticket.status === "Open" ? "selected" : ""
					}>Open</option>
					<option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""
					}>In Progress</option>
					<option value="Resolved" ${ticket.status === "Resolved" ? "selected" : ""
					}>Resolved</option>
					<option value="Closed" ${ticket.status === "Closed" ? "selected" : ""
					}>Closed</option>
				  </select>
				</div>
				<div class="input-item">
				  <label>Admin Response:</label>
				  <textarea name="adminResponce" required>${ticket.adminResponce || ""
					}</textarea> <!-- Changed from adminResponse -->
				</div>
				<button type="submit" class="submit-button">Save</button>
				<button type="button" class="cancel-btn">Cancel</button>
			  </form>
			</td>
		  `;
				table.appendChild(editRow);
			});
			ticketsContainer.appendChild(table);
		}
	} catch (error) {
		console.error("Error loading tickets:", error);
		ticketsContainer.innerHTML = `<p>Error loading tickets: ${error.message}</p>`;
	}

	// Event listeners for edit and delete buttons
	ticketsContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("edit-btn")) {
			const ticketId = e.target.dataset.id;
			const editForm = ticketsContainer.querySelector(
				`.edit-ticket-form[data-id="${ticketId}"]`
			).parentElement.parentElement;
			editForm.style.display =
				editForm.style.display === "none" ? "table-row" : "none";
		}
		if (e.target.classList.contains("cancel-btn")) {
			const editForm = e.target.closest("tr");
			editForm.style.display = "none";
		}
		if (e.target.classList.contains("delete-btn")) {
			const ticketId = e.target.dataset.id;
			deleteTicket(ticketId);
		}
	});

	// Handle edit form submission
	ticketsContainer.addEventListener("submit", async (e) => {
		if (e.target.classList.contains("edit-ticket-form")) {
			e.preventDefault();
			const ticketId = e.target.dataset.id;
			const formData = new FormData(e.target);
			const updatedTicket = {
				status: formData.get("status"),
				adminResponce: formData.get("adminResponce"), // Changed from adminResponse
			};

			try {
				const response = await fetch(`${BACKEND_URL}/api/tickets/${ticketId}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedTicket),
				});

				const responseBody = await response.json();
				if (!response.ok) {
					throw new Error(
						`Failed to update ticket: ${responseBody.error || response.statusText
						}`
					);
				}

				alert("✅ Ticket updated successfully!");
				window.location.reload(); // Refresh to show updated data
			} catch (error) {
				console.error("Error updating ticket:", error);
				alert("❌ Failed to update ticket: " + error.message);
			}
		}
	});

	// Function to delete a ticket
	async function deleteTicket(ticketId) {
		if (!confirm("Are you sure you want to delete this ticket?")) return;

		try {
			const response = await fetch(`${BACKEND_URL}/api/tickets/${ticketId}`, {
				method: "DELETE",
			});

			const responseBody = await response.json();
			if (!response.ok) {
				throw new Error(
					`Failed to delete ticket: ${responseBody.error || response.statusText
					}`
				);
			}

			alert("✅ Ticket deleted successfully!");
			window.location.reload(); // Refresh to update the table
		} catch (error) {
			console.error("Error deleting ticket:", error);
			alert("❌ Failed to delete ticket: " + error.message);
		}
	}
});  