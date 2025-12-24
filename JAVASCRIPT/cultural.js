const culturalEvents = [
  {
    id: 105,
    title: "Food Festival",
    venue: "Community Hall, Riverside",
    date: "05 Jan 2026",
    time: "4:00 PM – 10:00 PM",
    image: "../media/IMAGE/GlobalFlavors.jpg",
    description: "Experience global cuisines and cultural food stalls on campus."
  },
  {
    id: 106,
    title: "Drama Night",
    venue: "Community Hall, Riverside",
    date: "08 Jan 2026",
    time: "6:00 PM – 9:00 PM",
    image: "../media/IMAGE/dramanight.jpeg",
    description: "An evening of live theatre and student performances."
  }
];


const container = document.getElementById("event-container");

culturalEvents.forEach(event => {
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
