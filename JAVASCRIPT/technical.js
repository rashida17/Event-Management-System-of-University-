const technicalEvents = [
  {
    id: 103,
    title: "Robotics Challenge",
    venue: "STEM Hall, Science Institute",
    date: "06 Dec 2025",
    time: "10:00 AM – 4:00 PM",
    image: "../media/IMAGE/robotics.jpeg",
    description: "A thrilling robotics competition among university teams."
  },
  {
    id: 104,
    title: "Coding Hackathon",
    venue: "Digital Innovation Center",
    date: "10 Nov 2025",
    time: "9:00 AM – 9:00 AM (24 Hours)",
    image: "../media/IMAGE/hackathon.jpeg",
    description: "24-hour hackathon to build innovative software solutions."
  }
];

const container = document.getElementById("event-container");
technicalEvents.forEach(event => {

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
