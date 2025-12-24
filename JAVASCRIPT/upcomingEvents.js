function filterEvents(period) {
    const container = document.getElementById("event-container");
    container.innerHTML = ""; // clear current cards

    const today = new Date();
    let filtered = [];

    allEvents.forEach(event => {
        const eventDate = new Date(event.date);

        switch(period) {
            case 'today':
                if (eventDate.toDateString() === today.toDateString()) filtered.push(event);
                break;
            case 'tomorrow':
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                if (eventDate.toDateString() === tomorrow.toDateString()) filtered.push(event);
                break;
            case 'week':
                const weekEnd = new Date(today);
                weekEnd.setDate(today.getDate() + 7);
                if (eventDate >= today && eventDate <= weekEnd) filtered.push(event);
                break;
            case 'month':
                const monthEnd = new Date(today);
                monthEnd.setMonth(today.getMonth() + 1);
                if (eventDate >= today && eventDate <= monthEnd) filtered.push(event);
                break;
        }
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No upcoming events in this period.</p>";
        return;
    }

    // display filtered events
    filtered.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");

        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>${event.date}</strong> | ${event.category}</p>
            <form action="../JSP/EnrollEvent.jsp" method="post">
                <input type="hidden" name="event_id" value="${event.id}">
                <button type="submit" class="enroll-btn">JOIN NOW</button>
            </form>
        `;

        container.appendChild(card);
    });
}
