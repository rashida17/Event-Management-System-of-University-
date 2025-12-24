const socialEvents = [
  {
    id: 112,
    title: "Blood Donation Drive",
    venue: "Campus Health Center",
    date: "31 Jan 2026",
    time: "9:00 AM – 3:00 PM",
    image: "../media/IMAGE/blooddonation.jpeg",
    description: "Join hands to save lives by donating blood at the community hall."
  },
  {
    id: 113,
    title: "Tree Plantation Campaign",
    venue: "Green Campus Grounds",
    date: "17 Feb 2026",
    time: "7:00 AM – 11:00 AM",
    image: "../media/IMAGE/treeplantation.jpeg",
    description: "Contribute towards a greener campus with our annual plantation drive."
  },
  {
    id: 114,
    title: "Charity Fundraiser",
    venue: "University Auditorium",
    date: "09 Jan 2026",
    time: "5:00 PM – 8:00 PM",
    image: "../media/IMAGE/charityevent.jpeg",
    description: "Help support underprivileged communities through student initiatives."
  }
];

const container = document.getElementById("event-container");

socialEvents.forEach(event => {
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
