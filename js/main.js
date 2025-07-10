// Read URL parameters
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    city: params.get("city")?.toLowerCase() || "",
    date: params.get("date"),
    category: params.get("category")
  };
}

async function loadEvents() {
  const response = await fetch("data/events.json");
  const events = await response.json();

  const { city, date, category } = getParams();
  const filtered = events.filter(event => {
    return (
      event.city.toLowerCase().includes(city) &&
      (!date || event.date === date) &&
      (!category || event.category === category)
    );
  });

  const container = document.getElementById("eventList");
  if (container) {
    container.innerHTML = filtered.length
      ? filtered.map(event => `
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${event.date} | ${event.city}</h6>
                <p class="card-text">${event.description}</p>
                <a href="event-details.html?id=${event.id}" class="btn btn-outline-primary">View Details</a>
              </div>
            </div>
          </div>
        `).join("")
      : `<p class="text-center">No events found matching your criteria.</p>`;
  }

  const detailsContainer = document.getElementById("eventDetails");
  if (detailsContainer) {
    const id = new URLSearchParams(window.location.search).get("id");
    const event = events.find(e => e.id == id);
    if (event) {
      detailsContainer.innerHTML = `
        <h2>${event.name}</h2>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>City:</strong> ${event.city}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <a href="events.html" class="btn btn-secondary mt-3">Back to Events</a>
      `;
    } else {
      detailsContainer.innerHTML = `<p class="text-danger">Event not found.</p>`;
    }
  }
}

window.onload = loadEvents;
