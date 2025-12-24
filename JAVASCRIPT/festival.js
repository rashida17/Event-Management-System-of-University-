const festivalEvents = [
  {
    id: 107,
    title: "Art & Creativity Festival",
    venue: "Campus Art Gallery",
    date: "15 Feb 2026",
    time: "11:00 AM – 6:00 PM",
    image: "../media/IMAGE/art-festival.jpeg",
    description: "Showcase of student talent through painting, crafts and live art exhibitions."
  },
  {
    id: 108,
    title: "Food Carnival",
    venue: "Expo Center, Riverside",
    date: "25 Feb 2026",
    time: "3:00 PM – 10:00 PM",
    image: "../media/IMAGE/food-carnival1.jpeg",
    description: "Taste the best dishes and cultural cuisines prepared by students."
  }
];

const container = document.getElementById("event-container");

festivalEvents.forEach(event => {
  const card = document.createElement("div");  
  card.id = "event_" + event.id;         
  card.classList.add("event-card");

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
