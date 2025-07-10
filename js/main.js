document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  // Load events data
  fetch("../data/events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch event data.");
      }
      return response.json();
    })
    .then((events) => {
      events.forEach((event, index) => {
        const card = document.createElement("div");
        card.classList.add("event-card");

        // Animate on scroll attributes
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", `${index * 100}`);

        card.innerHTML = `
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Category:</strong> ${event.category}</p>
          <p>${event.description}</p>
          <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        `;

        container.appendChild(card);
      });

      // Reinitialize AOS after DOM updates
      AOS.init();
    })
    .catch((error) => {
      container.innerHTML = `<p class="error">🚫 ${error.message}</p>`;
      console.error("Error loading events:", error);
    });
});
