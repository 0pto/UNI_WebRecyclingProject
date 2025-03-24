document.addEventListener("DOMContentLoaded", () => {
  const summaryItems = document.querySelector(".summary-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const checkoutForm = document.getElementById("checkout-form");

  // Load basket from localStorage
  const basket = JSON.parse(localStorage.getItem("basket")) || [];

  // Render order summary
  let total = 0;
  basket.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item");
    summaryItem.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${itemTotal.toFixed(2)}</span>
      `;
    summaryItems.appendChild(summaryItem);
  });
  checkoutTotal.textContent = (total + 5.0).toFixed(2); // Include shipping

  // Format input helpers
  const cardNumberInput = document.getElementById("card-number");
  const expDateInput = document.getElementById("exp-date");

  // Format card number as 1234 5678 9012 3456
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 16); // Limit to 16 digits
    e.target.value = value.replace(/(\d{4})/g, "$1 ").trim();
  });

  // Format expiration date as MM/YY
  expDateInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 4); // Limit to 4 digits
    if (value.length > 2) {
      e.target.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      e.target.value = value;
    }
  });

  // Form validation and submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cardNumber = cardNumberInput.value.replace(/\s/g, "");
    const secCode = document.getElementById("sec-code").value;
    const expDate = expDateInput.value;
    const cardHolder = document.getElementById("card-holder").value;

    // Basic format validation
    const isCardNumberValid = /^\d{16}$/.test(cardNumber); // 16 digits
    const isSecCodeValid = /^\d{3,4}$/.test(secCode); // 3 or 4 digits
    const isExpDateValid =
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate) && isFutureDate(expDate); // MM/YY and not expired
    const isCardHolderValid = cardHolder.trim().length > 0; // Non-empty

    if (
      isCardNumberValid &&
      isSecCodeValid &&
      isExpDateValid &&
      isCardHolderValid
    ) {
      alert("Order placed successfully! (This is a front-end demo)");
      localStorage.removeItem("basket"); // Clear basket
      window.location.href = "../index.html"; // Redirect to home
    } else {
      alert(
        "Please check your payment details:\n" +
          (!isCardNumberValid ? "- Card number must be 16 digits\n" : "") +
          (!isSecCodeValid ? "- Security code must be 3 or 4 digits\n" : "") +
          (!isExpDateValid
            ? "- Expiration date must be MM/YY and not expired\n"
            : "") +
          (!isCardHolderValid ? "- Name on card is required\n" : "")
      );
    }
  });
});

// Check if expiration date is in the future
function isFutureDate(expDate) {
  const [month, year] = expDate.split("/").map(Number);
  const fullYear = 2000 + year; // Assuming 20XX
  const today = new Date();
  const exp = new Date(fullYear, month - 1); // Month is 0-indexed
  return exp >= today;
}
