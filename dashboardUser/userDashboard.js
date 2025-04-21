document.addEventListener("DOMContentLoaded", async () => {
  const BACKEND_URL = "http://localhost:8000";
  const multiBookingsContainer = document.getElementById("multi-bookings");
  const singleBookingsContainer = document.getElementById("single-bookings");
  const ticketsContainer = document.getElementById("tickets-list");

  const userId = userSessionObj.userId;
  const isAdmin = userSessionObj.type;

  // Helper function to convert YYYY-MM-DD to DD/MM/YYYY for display
  function formatDateForDisplay(date) {
    if (!date || date === "undefined") return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  // Helper function to check if a date is in the past (for filtering)
  function isDateInPast(date) {
    if (!date) return false;
    const [year, month, day] = date.split("-");
    const bookingDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, ignoring time
    return bookingDate < today;
  }

  // Fetch and display multi-bookings
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/multi-bookings?userId=${userId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch multi-bookings: ${
          errorData.error || response.statusText
        }`
      );
    }
    const multiBookings = await response.json();
    console.log("Fetched multi-bookings:", multiBookings);

    if (multiBookings.length === 0) {
      multiBookingsContainer.innerHTML = "<p>No recurring bookings found.</p>";
    } else {
      const table = document.createElement("table");
      table.innerHTML = `
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Collection Day</th>
          <th>Address</th>
          <th>Item Type</th>
          <th>Bin Size</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      `;
      multiBookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${booking.startdate}</td>
          <td>${booking.enddate || "Indefinite"}</td>
          <td>${booking.collectday}</td>
          <td>${booking.address}</td>
          <td>${booking.itemtype}</td>
          <td>${booking.binsize}</td>
          <td>$${booking.price.toFixed(2)}</td>
          <td>
            <button class="edit-btn" data-id="${
              booking.multiBookingsid
            }">Edit</button>
            <button class="delete-btn" data-id="${
              booking.multiBookingsid
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
            <form class="edit-multi-booking-form" data-id="${
              booking.multiBookingsid
            }">
              <div class="input-item">
                <label>Start Date:</label>
                <input type="date" name="startdate" value="${
                  booking.startdate
                }" required />
              </div>
              <div class="input-item">
                <label>Indefinite:</label>
                <input type="checkbox" name="indefinite" ${
                  !booking.enddate ? "checked" : ""
                } />
              </div>
              <div class="input-item">
                <label>End Date:</label>
                <input type="date" name="enddate" value="${
                  booking.enddate || ""
                }" ${!booking.enddate ? "disabled" : ""} />
              </div>
              <div class="input-item">
                <label>Collection Day:</label>
                <select name="collectday" required>
                  <option value="Monday" ${
                    booking.collectday === "Monday" ? "selected" : ""
                  }>Monday</option>
                  <option value="Tuesday" ${
                    booking.collectday === "Tuesday" ? "selected" : ""
                  }>Tuesday</option>
                  <option value="Wednesday" ${
                    booking.collectday === "Wednesday" ? "selected" : ""
                  }>Wednesday</option>
                  <option value="Thursday" ${
                    booking.collectday === "Thursday" ? "selected" : ""
                  }>Thursday</option>
                  <option value="Friday" ${
                    booking.collectday === "Friday" ? "selected" : ""
                  }>Friday</option>
                  <option value="Saturday" ${
                    booking.collectday === "Saturday" ? "selected" : ""
                  }>Saturday</option>
                  <option value="Sunday" ${
                    booking.collectday === "Sunday" ? "selected" : ""
                  }>Sunday</option>
                </select>
              </div>
              <div class="input-item">
                <label>Address:</label>
                <input type="text" name="address" value="${
                  booking.address
                }" required />
              </div>
              <div class="input-item">
                <label>Item Type:</label>
                <select name="itemtype" required>
                  <option value="Paper" ${
                    booking.itemtype === "Paper" ? "selected" : ""
                  }>Paper</option>
                  <option value="Plastic" ${
                    booking.itemtype === "Plastic" ? "selected" : ""
                  }>Plastic</option>
                  <option value="Electronics" ${
                    booking.itemtype === "Electronics" ? "selected" : ""
                  }>Electronics</option>
                  <option value="Glass" ${
                    booking.itemtype === "Glass" ? "selected" : ""
                  }>Glass</option>
                </select>
              </div>
              <div class="input-item">
                <label>Bin Size:</label>
                <select name="binsize" required>
                  <option value="Small" ${
                    booking.binsize === "Small" ? "selected" : ""
                  }>Small</option>
                  <option value="Medium" ${
                    booking.binsize === "Medium" ? "selected" : ""
                  }>Medium</option>
                  <option value="Big" ${
                    booking.binsize === "Big" ? "selected" : ""
                  }>Big</option>
                </select>
              </div>
              <button type="submit" class="submit-button">Save</button>
              <button type="button" class="cancel-btn">Cancel</button>
            </form>
          </td>
        `;
        table.appendChild(editRow);
      });
      multiBookingsContainer.appendChild(table);
    }
  } catch (error) {
    console.error("Error loading multi-bookings:", error);
    multiBookingsContainer.innerHTML = `<p>Error loading recurring bookings: ${error.message}</p>`;
  }

  // Fetch and display single-bookings
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/single-bookings?userId=${userId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch single-bookings: ${
          errorData.error || response.statusText
        }`
      );
    }
    const singleBookings = await response.json();
    console.log("Fetched single-bookings:", singleBookings);

    // Filter out past bookings
    const currentDateTime = new Date();
    currentDateTime.setHours(0, 0, 0, 0); // Compare dates only
    const filteredBookings = singleBookings.filter((booking) => {
      if (!booking.date) return false;
      const [year, month, day] = booking.date.split("-");
      const bookingDate = new Date(year, month - 1, day);
      return bookingDate >= currentDateTime;
    });

    if (filteredBookings.length === 0) {
      singleBookingsContainer.innerHTML =
        "<p>No upcoming single bookings found.</p>";
    } else {
      const table = document.createElement("table");
      table.innerHTML = `
        <tr>
          <th>Date</th>
          <th>Address</th>
          <th>Item Type</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      `;
      filteredBookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${formatDateForDisplay(booking.date)}</td>
          <td>${booking.address}</td>
          <td>${booking.itemtype}</td>
          <td>$${booking.price.toFixed(2)}</td>
          <td>
            <button class="edit-btn" data-id="${
              booking.singlebookingid
            }">Edit</button>
            <button class="delete-btn" data-id="${
              booking.singlebookingid
            }">Delete</button>
          </td>
        `;
        table.appendChild(row);

        // Add edit form below the row (hidden by default)
        const editRow = document.createElement("tr");
        editRow.classList.add("edit-form");
        editRow.style.display = "none";
        editRow.innerHTML = `
          <td colspan="5">
            <form class="edit-single-booking-form" data-id="${
              booking.singlebookingid
            }">
              <div class="input-item">
                <label>Date:</label>
                <input type="date" name="date" value="${
                  booking.date
                }" min="${currentDateTime
          .toISOString()
          .slice(0, 10)}" required />
              </div>
              <div class="input-item">
                <label>Address:</label>
                <input type="text" name="address" value="${
                  booking.address
                }" required />
              </div>
              <div class="input-item">
                <label>Item Type:</label>
                <input type="text" name="itemtype" value="${
                  booking.itemtype
                }" required />
              </div>
              <button type="submit" class="submit-button">Save</button>
              <button type="button" class="cancel-btn">Cancel</button>
            </form>
          </td>
        `;
        table.appendChild(editRow);
      });
      singleBookingsContainer.appendChild(table);
    }
  } catch (error) {
    console.error("Error loading single-bookings:", error);
    singleBookingsContainer.innerHTML = `<p>Error loading single bookings: ${error.message}</p>`;
  }

  // Fetch and display tickets
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/tickets?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Is-Admin": isAdmin,
        },
      }
    );
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
          <td>${ticket.subject}</td>
          <td>${ticket.description}</td>
          <td>${ticket.adminResponce || "No response yet"}</td>
          <td>${ticket.datetime}</td>
          <td>${ticket.status}</td>
          <td>
            <button class="edit-btn" data-id="${
              ticket.ticketid
            }">Edit Description</button>
            <button class="delete-btn" data-id="${
              ticket.ticketid
            }">Delete</button>
          </td>
        `;
        table.appendChild(row);

        // Add edit form below the row (hidden by default)
        const editRow = document.createElement("tr");
        editRow.classList.add("edit-form");
        editRow.style.display = "none";
        editRow.innerHTML = `
          <td colspan="7">
            <form class="edit-ticket-form" data-id="${ticket.ticketid}">
              <div class="input-item">
                <label>Description:</label>
                <textarea name="description" required>${ticket.description}</textarea>
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

  // Handle edit button clicks for multi-bookings
  multiBookingsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const bookingId = e.target.dataset.id;
      const editForm = multiBookingsContainer.querySelector(
        `.edit-multi-booking-form[data-id="${bookingId}"]`
      ).parentElement.parentElement;
      editForm.style.display =
        editForm.style.display === "none" ? "table-row" : "none";

      // Handle indefinite checkbox
      const indefiniteCheckbox = editForm.querySelector(
        'input[name="indefinite"]'
      );
      const endDateInput = editForm.querySelector('input[name="enddate"]');
      indefiniteCheckbox.addEventListener("change", () => {
        endDateInput.disabled = indefiniteCheckbox.checked;
        if (indefiniteCheckbox.checked) {
          endDateInput.value = "";
        }
      });

      // Client-side validation for start date
      const startDateInput = editForm.querySelector('input[name="startdate"]');
      const today = new Date().toISOString().split("T")[0];
      startDateInput.setAttribute("min", today);

      // Client-side validation for end date
      startDateInput.addEventListener("change", () => {
        const startDate = new Date(startDateInput.value);
        endDateInput.setAttribute("min", startDate.toISOString().split("T")[0]);
      });
    }
    if (e.target.classList.contains("cancel-btn")) {
      const editForm = e.target.closest("tr");
      editForm.style.display = "none";
    }
    if (e.target.classList.contains("delete-btn")) {
      const bookingId = e.target.dataset.id;
      deleteMultiBooking(bookingId);
    }
  });

  // Handle edit form submission for multi-bookings
  multiBookingsContainer.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("edit-multi-booking-form")) {
      e.preventDefault();
      const bookingId = e.target.dataset.id;
      const formData = new FormData(e.target);
      const updatedBooking = {
        startdate: formData.get("startdate"),
        enddate:
          formData.get("indefinite") === "on" ? null : formData.get("enddate"),
        collectday: formData.get("collectday"),
        address: formData.get("address"),
        itemtype: formData.get("itemtype"),
        binsize: formData.get("binsize"),
      };

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/multi-bookings/${bookingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBooking),
          }
        );

        const responseBody = await response.json();
        if (!response.ok) {
          throw new Error(
            `Failed to update booking: ${
              responseBody.error || response.statusText
            }`
          );
        }

        alert("✅ Booking updated successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error updating booking:", error);
        alert("❌ Failed to update booking: " + error.message);
      }
    }
  });

  // Handle edit button clicks for single-bookings
  singleBookingsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const bookingId = e.target.dataset.id;
      const editForm = singleBookingsContainer.querySelector(
        `.edit-single-booking-form[data-id="${bookingId}"]`
      ).parentElement.parentElement;
      editForm.style.display =
        editForm.style.display === "none" ? "table-row" : "none";
    }
    if (e.target.classList.contains("cancel-btn")) {
      const editForm = e.target.closest("tr");
      editForm.style.display = "none";
    }
    if (e.target.classList.contains("delete-btn")) {
      const bookingId = e.target.dataset.id;
      deleteSingleBooking(bookingId);
    }
  });

  // Handle edit form submission for single-bookings
  singleBookingsContainer.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("edit-single-booking-form")) {
      e.preventDefault();
      const bookingId = e.target.dataset.id;
      const formData = new FormData(e.target);
      const updatedBooking = {
        date: formData.get("date"), // Corrected field name to match database
        address: formData.get("address"),
        itemtype: formData.get("itemtype"),
      };

      console.log("Updating single booking with data:", updatedBooking);

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/single-bookings/${bookingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBooking),
          }
        );

        const responseBody = await response.json();
        console.log("Backend response:", responseBody);

        if (!response.ok) {
          throw new Error(
            `Failed to update booking: ${
              responseBody.error || response.statusText
            }`
          );
        }

        alert("✅ Booking updated successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error updating booking:", error);
        alert("❌ Failed to update booking: " + error.message);
      }
    }
  });

  // Handle edit button clicks for tickets
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

  // Handle edit form submission for tickets
  ticketsContainer.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("edit-ticket-form")) {
      e.preventDefault();
      const ticketId = e.target.dataset.id;
      const formData = new FormData(e.target);
      const updatedTicket = {
        description: formData.get("description"),
      };

      try {
        const response = await fetch(`${BACKEND_URL}/api/tickets/${ticketId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Is-Admin": isAdmin, // Add X-Is-Admin header
          },
          body: JSON.stringify(updatedTicket),
        });

        const responseBody = await response.json();
        console.log("Backend response for ticket update:", responseBody);

        if (!response.ok) {
          throw new Error(
            `Failed to update ticket: ${
              responseBody.error || response.statusText
            }`
          );
        }

        alert("✅ Ticket description updated successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error updating ticket:", error);
        alert("❌ Failed to update ticket: " + error.message);
      }
    }
  });

  // Function to delete a multi-booking
  async function deleteMultiBooking(bookingId) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/multi-bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to delete booking: ${
            responseBody.error || response.statusText
          }`
        );
      }

      alert("✅ Booking deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("❌ Failed to delete booking: " + error.message);
    }
  }

  // Function to delete a single-booking
  async function deleteSingleBooking(bookingId) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/single-bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to delete booking: ${
            responseBody.error || response.statusText
          }`
        );
      }

      alert("✅ Booking deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("❌ Failed to delete booking: " + error.message);
    }
  }

  // Function to delete a ticket
  async function deleteTicket(ticketId) {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/tickets/${ticketId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Is-Admin": isAdmin, // Add X-Is-Admin header for consistency
        },
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to delete ticket: ${
            responseBody.error || response.statusText
          }`
        );
      }

      alert("✅ Ticket deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("❌ Failed to delete ticket: " + error.message);
    }
  }
});
