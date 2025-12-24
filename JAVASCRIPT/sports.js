const sportsEvents = [
  {
    id: 109,
    title: "Inter-University Football Championship",
    venue: "National Football Arena",
    date: "26 Feb 2026",
    time: "9:00 AM – 6:00 PM",
    image: "../media/IMAGE/football.jpeg",
    description: "Top university teams compete for the annual football trophy."
  },
  {
    id: 110,
    title: "Athletics Meet 2025",
    venue: "Olympic Track, University Campus",
    date: "28 Dec 2025",
    time: "8:00 AM – 5:00 PM",
    image: "../media/IMAGE/athletics1.jpeg",
    description: "Track and field events showcasing student talent and spirit."
  },
  {
    id: 111,
    title: "Table Tennis Tournament",
    venue: "City Club Sports Hall",
    date: "10 Feb 2026",
    time: "10:00 AM – 4:00 PM",
    image: "../media/IMAGE/tabletennis.jpeg",
    description: "Singles and doubles tournaments among campus players."
  }
];

const container = document.getElementById("event-container");

sportsEvents.forEach(event => {
const card = document.createElement("div");   
  card.id = "event_" + event.id;           card.classList.add("event-card");

  card.innerHTML = `
    <img src="${event.image}" alt="${event.title}">
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p><strong>
    <img src="../media/IMAGE/location.png" class="icon-tilt" alt="Location"> ${event.venue}<br>
    <img src="../media/IMAGE/datetime1.png" class="icon-tilt" alt="Date"> ${event.date} | ${event.time}
  </strong></p>
  <form action="../JSP/EnrollEvent.jsp" method="post">
        <input type="hidden" name="event_id" value="${event.id}">
        <button type="submit" class="enroll-btn">JOIN NOW</button>
    </form>
  `;

  container.appendChild(card);
});
