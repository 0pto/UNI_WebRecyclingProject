document.addEventListener("DOMContentLoaded", () => {
    const recyinfoForm = document.getElementById("recyinfo-form");
    const BACKEND_URL = "http://localhost:3000";
  
    if (recyinfoForm) {
      recyinfoForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const prodcode = document.getElementById("Subject").value;
        const id = localStorage.getItem("userID");
        const description = document.getElementById("Description").value;
        if(!subject || !description){
          alert('Please fill in all fields.');
          return;
        }
        if (!id){
          alert('Please log in to send a ticket')
          return
        }
        const code = {
            prodcode
        }
  
        try {
          const response = await fetch(`${BACKEND_URL}/api/recyinfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(code),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Sending failed: ${errorData.error || response.statusText}`
            );
          }
          let productdata = await response.JSON();
          console.log("Fetched product data" + productdata);
          document.getElementById("materials").value = productdata.materials|| "";
          document.getElementById("canRecycle").value = productdata.canRecycle|| "";

        } catch (error) {
          alert("Failed to refresh discounts " + error.message);
        }
      });
    }
  });
  