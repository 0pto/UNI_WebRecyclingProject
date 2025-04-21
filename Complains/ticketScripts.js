function getCookieObject() {
  const allCookies = document.cookie;
  let userSessionObj = {};
  if (allCookies) {
    const cookiesArray = allCookies.split(";");
    cookiesArray.forEach((cookie) => {
      const keyValueArray = cookie.split("=");
      const newKey = keyValueArray[0].trim().toLowerCase();
      const newValue = keyValueArray[1];
      userSessionObj[newKey] = newValue;
    });
  }
  console.log("Cookies:", userSessionObj);
  return userSessionObj;
}

document.addEventListener("DOMContentLoaded", () => {
  const userSession = getCookieObject();
  if (!userSession.username || !userSession.userid) {
    window.location.href = "/UNI_WebRecyclingProject/Login/login.html";
    return;
  }

  const ticketForm = document.getElementById("ticket-form");
  const ticketError = document.getElementById("ticketError");
  const ticketSuccess = document.getElementById("ticketSuccess");

  if (ticketForm) {
    ticketForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      ticketError.textContent = "";
      ticketSuccess.textContent = "";

      const formData = new FormData(ticketForm);
      const data = {
        account: userSession.userid,
        subject: formData.get("subject"),
        description: formData.get("description"),
        datetime: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD
        status: "Open",
      };

      if (!data.subject || !data.description || !data.account) {
        ticketError.textContent = "Please fill in all required fields.";
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/tickets/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to submit ticket");
        }

        const result = await response.json();
        ticketSuccess.textContent = "Ticket submitted successfully!";
        ticketForm.reset();
      } catch (error) {
        ticketError.textContent = error.message;
      }
    });
  }
});
