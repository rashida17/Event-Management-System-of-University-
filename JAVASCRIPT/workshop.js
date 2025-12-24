const academicEvents = [
  {
    id: 115,
    title: "Skill Development Workshop",
    venue: "Seminar Hall A",
    date: "12 Jan 2026",
    time: "10:00 AM – 1:00 PM",
    category: "Workshop",
    image: "../media/IMAGE/skillDev.jpeg",
    description: "Improves practical and professional skills through hands-on activities."
  },
  {
    id: 116,
    title: "Web Development Training Workshop",
    venue: "Main Auditorium",
    date: "20 Dec 2025",
    time: "10:00 AM – 1:00 PM",
    category: "Workshop",
    image: "../media/IMAGE/webTraining.jpeg",
    description: "Teaches industry-relevant software and tools."
  },
  {
    id: 117,
    title: "Communication & Soft Skills Workshop",
    venue: "Conference Room 2",
    date: "4 Jan 2026",
    time: "11:00 AM – 2:00 PM",
    category: "Workshop",
    image: "../media/IMAGE/communicationSkill.jpeg",
    description: "Enhances speaking, teamwork, and interpersonal skills."
  },
  {
    id: 118,
    title: "Leadership & Personality Development Workshop",
    venue: "Seminar Hall B",
    date: "3 Feb 2026",
    time: "9:30 AM – 12:30 PM",
    category: "Workshop",
    image: "../media/IMAGE/leadership.jpeg",
    description: "Builds leadership qualities and self-confidence."
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
    <p>
  <strong>
    <img src="../media/IMAGE/location.png" class="icon-tilt" alt="Location"> ${event.venue}<br>
    <img src="../media/IMAGE/datetime1.png" class="icon-tilt" alt="Date"> ${event.date} | ${event.time}
  </strong>
</p>

    <form action="../JSP/EnrollEvent.jsp" method="post">
        <input type="hidden" name="event_id" value="${event.id}">
        <button type="submit" class="enroll-btn">JOIN NOW</button>
    </form>
  `;

  container.appendChild(card);
});

