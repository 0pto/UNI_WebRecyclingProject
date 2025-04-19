document.addEventListener("DOMContentLoaded", () => {
  const ticketForm = document.getElementById("ticket-form");

  if (ticketForm) {
    ticketForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = document.getElementById("ticket-subject").value;
      const category = document.getElementById("ticket-category").value;
      const description = document.getElementById("ticket-description").value;

      alert(
        `Ticket Submitted!\nSubject: ${subject}\nCategory: ${category}\nDescription: ${description}`
      );
      ticketForm.reset(); // Reset the form after submission
    });
  }
});
