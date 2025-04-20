document.addEventListener("DOMContentLoaded", () => {
  const recbookingForm = document.getElementById("recbooking-form");
  const BACKEND_URL = "http://localhost:3000";

  if (complaintForm) {
    complaintForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const stdate = document.getElementById("StartDate").value;
      const enddate = document.getElementById("EndDate").value;
      const collday = document.getElementById("CollectDay").value;
      const id = localStorage.getItem("userID");
      const address = document.getElementById("Address").value;
      const type = document.getElementById("Type").value;
      const binsize = document.getElementById("BinSize").value;
      const price = document.getElementById("Price").value;
      if(!subject || !address || !type){
        alert('Please fill in all fields.');
        return;
      }
      if(!id){
        alert('Please log in to create a booking.');
        return;
      }
      const bookdata = {
        date,
        id,
        address,
        type,
        price
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookdata),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Sending failed: ${errorData.error || response.statusText}`
          );
        }
  
        alert("✅ Booking Created for " + date +"!");
      } catch (error) {
        alert("❌ Booking failed! " + error.message);
      }
    });
  }
});