const academicEvents = [
  {
    id: 101,
    title: "AI Seminar",
    venue: "Campus Auditorium",
    date: "28 Dec 2025",
    time: "10:00 AM – 1:00 PM",
    category: "Academic",
    image: "../media/IMAGE/ai seminar.jpeg",
    description: "An informative session on Artificial Intelligence trends."
  },
  {
    id: 102,
    title: "Research Conference",
    venue: "Dr. A.P. Science Auditorium",
    date: "02 Jan 2026",
    time: "9:00 AM – 5:00 PM",
    category: "Academic",
    image: "../media/IMAGE/research.jpg",
    description: "Annual academic conference for research students."
  }
];


const container = document.getElementById("event-container");

academicEvents.forEach(event => {
const card = document.createElement("div");  
  card.id = "event_" + event.id;          
  card.classList.add("event-card");

  card.innerHTML = `
    <img src="${event.image}" alt="${event.title}">
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p> <strong>
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

