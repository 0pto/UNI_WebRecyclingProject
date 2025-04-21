// Function to parse cookies into an object
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
    window.location.href = "/UNI_WebRecyclingProject/Login/login.html"; // Redirect to login
    return;
  }

  const singleTab = document.getElementById("singleTab");
  const multiTab = document.getElementById("multiTab");
  const singleForm = document.getElementById("singleBookingForm");
  const multiForm = document.getElementById("multiBookingForm");
  const singleSubmitForm = document.getElementById("singleBookingSubmit");
  const multiSubmitForm = document.getElementById("multiBookingSubmit");
  const singleError = document.getElementById("singleError");
  const multiError = document.getElementById("multiError");
  const singleSuccess = document.getElementById("singleSuccess");
  const multiSuccess = document.getElementById("multiSuccess");
  const indefiniteCheckbox = document.getElementById("indefiniteCheckbox");
  const multiEndDate = document.getElementById("multiEndDate");

  // Handle indefinite checkbox
  indefiniteCheckbox.addEventListener("change", () => {
    if (indefiniteCheckbox.checked) {
      multiEndDate.value = "";
      multiEndDate.disabled = true;
      multiEndDate.removeAttribute("required");
    } else {
      multiEndDate.disabled = false;
      multiEndDate.setAttribute("required", "required");
    }
  });

  // Tab switching logic
  singleTab.addEventListener("click", () => {
    singleTab.classList.add("active");
    singleTab.classList.remove("tab");
    multiTab.classList.add("tab");
    multiTab.classList.remove("active");
    singleForm.classList.remove("hidden");
    multiForm.classList.add("hidden");
  });

  multiTab.addEventListener("click", () => {
    multiTab.classList.add("active");
    multiTab.classList.remove("tab");
    singleTab.classList.add("tab");
    singleTab.classList.remove("active");
    multiForm.classList.remove("hidden");
    singleForm.classList.add("hidden");
  });

  // Form submission for single booking
  singleSubmitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    singleError.textContent = "";
    singleSuccess.textContent = "";

    const formData = new FormData(singleSubmitForm);
    const data = {
      date: formData.get("date"),
      address: formData.get("address"),
      itemtype: formData.get("itemtype"),
      userid: userSession.userid,
    };

    if (!data.date || !data.address || !data.itemtype || !data.userid) {
      singleError.textContent = "Please fill in all required fields.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/bookings/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      const result = await response.json();
      singleSuccess.textContent = "Single booking submitted successfully!";
      singleSubmitForm.reset();
      document.getElementById("singlePrice").value = result.booking.price;
    } catch (error) {
      singleError.textContent = error.message;
    }
  });

  // Form submission for multi booking
  multiSubmitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    multiError.textContent = "";
    multiSuccess.textContent = "";

    const formData = new FormData(multiSubmitForm);
    const isIndefinite = indefiniteCheckbox.checked;
    const data = {
      startdate: formData.get("startdate"),
      enddate: isIndefinite ? null : formData.get("enddate"),
      collectday: formData.get("collectday"),
      address: formData.get("address"),
      itemtype: formData.get("itemtype"),
      binsize: formData.get("binsize"),
      userid: userSession.userid,
    };

    if (
      !data.startdate ||
      (!data.enddate && !isIndefinite) ||
      !data.collectday ||
      !data.address ||
      !data.itemtype ||
      !data.binsize ||
      !data.userid
    ) {
      multiError.textContent = "Please fill in all required fields.";
      return;
    }

    if (data.enddate && new Date(data.startdate) > new Date(data.enddate)) {
      multiError.textContent = "End date must be after start date.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/bookings/multi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      const result = await response.json();
      multiSuccess.textContent = "Multi booking submitted successfully!";
      multiSubmitForm.reset();
      indefiniteCheckbox.checked = false;
      multiEndDate.disabled = false;
      multiEndDate.setAttribute("required", "required");
      document.getElementById("multiPrice").value = result.booking.price;
    } catch (error) {
      multiError.textContent = error.message;
    }
  });
});
