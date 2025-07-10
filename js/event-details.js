const eventId = new URLSearchParams(window.location.search).get("id");

const events = [
  {
    id: "1",
    name: "Kigali Music Festival",
    date: "2025-07-20",
    location: "Kigali Convention Centre",
    category: "music",
    description: "Join the biggest music event in Rwanda with top African artists.",
  },
  {
    id: "2",
    name: "Tech Expo Africa",
    date: "2025-08-10",
    location: "Kigali Arena",
    category: "tech",
    description: "Explore innovations in AI, IoT, and startups across Africa.",
  },
  {
    id: "3",
    name: "Rwanda Art Week",
    date: "2025-07-22",
    location: "Downtown Art Gallery",
    category: "art",
    description: "Celebrate local artists and cultural diversity through exhibitions.",
  },
];

const selectedEvent = events.find(e => e.id === eventId);

const details = document.getElementById("eventDetails");
if (selectedEvent) {
  details.innerHTML = `
    <h2>${selectedEvent.name}</h2>
    <p><strong>Date:</strong> ${selectedEvent.date}</p>
    <p><strong>Location:</strong> ${selectedEvent.location}</p>
    <p><strong>Category:</strong> ${selectedEvent.category}</p>
    <p>${selectedEvent.description}</p>
    <a href="events.html" class="btn btn-secondary mt-3">← Back to Events</a>
  `;
} else {
  details.innerHTML = `<p class="text-danger">Event not found.</p>`;
}
