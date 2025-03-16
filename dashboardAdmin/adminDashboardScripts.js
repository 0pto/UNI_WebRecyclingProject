let allBookingCategory = [
	"House Furnitures",
	"Electricals",
	"Clothing",
	"Auto parts",
	"Building material"
];
/* Total bookings array for each category per year 
( this is just some dummy data; to be replaced by fetched data later)*/
let totalBookings = [4678, 106788, 5798, 2778, 40778];
let barColors = ["#18db55", "#f4a845", "#145d9f", "#fdf9b4", "#c1ff72"];

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
let sectionsColors = ["#18db55", "#f4a845", "#145d9f", "#fdf9b4", "#c1ff72"];

// Generate pie chart
function generatePieChart(categories, values, colors) {
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
				text: "Sales Statistics Past Year By Category"
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
				text: "Booking Statistics Past Year"
			}
		}
	});
}

generatePieChart(salesData, salesDataValue, sectionsColors);
generateBarGraph(allBookingCategory, totalBookings, barColors);
