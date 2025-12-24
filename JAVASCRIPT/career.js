const careerEvents = [
  {
   
    id: 119,
    title: "Resume Building Workshop",
    venue: "Training Room 2",
    date: "22 Jan 2026",
    time: "10:00 AM – 1:00 PM",
    category: "Career",
    image: "../media/IMAGE/resume.jpeg",
    description: "Hands-on workshop to create professional resumes and LinkedIn profiles."
  },
  {
    id: 120,
    title: "Mock Interview Session",
    venue: "Placement Cell",
    date: "28 Jan 2026",
    time: "2:00 PM – 5:00 PM",
    category: "Career",
    image: "../media/IMAGE/mock-interview.jpg",
    description: "Practice technical and HR interviews with industry professionals."
  }
];


const container = document.getElementById("event-container");
careerEvents.forEach(event => {
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
