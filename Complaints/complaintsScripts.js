document.addEventListener("DOMContentLoaded", () => {
  const complaintForm = document.getElementById("complaint-form");
  const BACKEND_URL = "http://localhost:3000";
  if (complaintForm) {
    complaintForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const subject = document.getElementById("Subject").value;
      function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      const id = getCookie("username");
      if (id != "") {
       alert("Welcome again " + id);
      }
      const description = document.getElementById("Description").value;
      if(!subject || !description){
        alert('Please fill in all fields.');
        return;
      }
      if (!id){
        alert('Please log in to send a ticket')
        return
      }
      const ticketdata = {
        id,
        subject,
        description
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/complaints`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketdata),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Sending failed: ${errorData.error || response.statusText}`
          );
        }
  
        alert("✅ Complaint Sent!");
      } catch (error) {
        alert("❌ Complaint failed! " + error.message);
      }
    });
  }
});
