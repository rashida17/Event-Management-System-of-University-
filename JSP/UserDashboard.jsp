<%@ page import="java.sql.*" %>
<%@ page import="java.time.*, java.time.format.*" %>

<%
String studentId = (String) session.getAttribute("student_id");
if (studentId == null) {
    response.sendRedirect("../JSP/loginProcess.jsp");
    return;
}

Connection conn = null;
PreparedStatement ps = null;
ResultSet rs = null;

String studentName = "Student";

try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    conn = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/eventdb",
        "root",
        ""
    );

    // Fetch student name
    ps = conn.prepareStatement("SELECT stu_name FROM students WHERE student_id=?");
    ps.setString(1, studentId);  // use setString for VARCHAR
    rs = ps.executeQuery();
    if (rs.next()) {
        studentName = rs.getString("stu_name");
    }
    rs.close();
    ps.close();

    // Fetch enrolled events sorted by date
    String sql = "SELECT e.event_id, e.event_name, e.category, e.event_date, e.location, en.status " +
                 "FROM enrollments en " +
                 "JOIN events e ON en.event_id = e.event_id " +
                 "WHERE en.student_id=? " +
                 "ORDER BY e.event_date ASC";

    ps = conn.prepareStatement(sql);
    ps.setString(1, studentId); // setString for VARCHAR student_id
    rs = ps.executeQuery();
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Campus Events Hub - Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/dasboardUser.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap" rel="stylesheet">

    <style>
        /* New CSS for Unregister button */
        .unregister-btn {
            padding: 6px 12px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 10px;
            transition: background-color 0.3s;
        }
        .unregister-btn:hover {
            background-color: #c0392b;
        }
    </style>
</head>

<body>

<header class="navbar">
    <div class="logo">
        <img src="../media/IMAGE/logo2.png" alt="Campus Events Hub">
    </div>
       
    <nav id="navContent">
        <a href="../HTML/HOME.html">Home</a>

        <!-- Categories Dropdown -->
        <div class="navOptions">
            <a class="drop-btn">Categories</a>
            <ul class="dropdown">
                <li><a href="../HTML/academicEvents.html">Academic</a></li>
                <li><a href="../HTML/technicalEvents.html">Technical</a></li>
                 <li><a href="../HTML/workshopEvents.html">Workshop</a></li>
                <li><a href="../HTML/careerEvents.html">Career</a></li>
                <li><a href="../HTML/culturalEvents.html">Cultural</a></li>
                <li><a href="../HTML/festivalEvents.html">Festivals</a></li>
                <li><a href="../HTML/sportsEvents.html">Sports</a></li>
                <li><a href="../HTML/socialEvents.html">Social & Community</a></li>
            </ul>
        </div>

        <!-- Upcoming Events Dropdown -->
        <div class="navOptions">
            <a class="drop-btn">Upcoming Events</a>
            <ul class="dropdown">
                <li><a href="#" onclick="filterEvents('today')">Today</a></li>
                <li><a href="#" onclick="filterEvents('tomorrow')">Tomorrow</a></li>
                <li><a href="#" onclick="filterEvents('week')">This Week</a></li>
                <li><a href="#" onclick="filterEvents('month')">This Month</a></li>
            </ul>
        </div>

        <a href="../JSP/UserDashboard.jsp">My Enrollments</a>
    </nav>

    <span class="searchCont">
        <form action="../JSP/search.jsp" class="searchBar" autocomplete="off">
            <input type="text" placeholder="Search Events" name="query">
            <button type="submit"><img src="../media/IMAGE/searchicon2.png"></button>
        </form>
    </span>

    <a href="../JSP/logout.jsp"><img src="../media/IMAGE/logout.png" alt="Logout" id="logout"></a>
</header>

<section class="dashboard-header">
   <div class="welcome-card">
  <img src="../media/IMAGE/profile.png" class="avatar">

  <div class="welcome-text">
    <h2>Hey, <span><%= studentName %></span></h2>
    <p>Your enrolled campus events at a glance.</p>
  </div>
</div>

<div class="event-grid">
<%
    while (rs.next()) {
%>
    <div class="event-card">
        <span class="event-tag <%= rs.getString("category").toLowerCase() %>">
            <%= rs.getString("category") %>
        </span>

        <h3><%= rs.getString("event_name") %></h3>

        <%
            LocalDate eventDate = rs.getDate("event_date").toLocalDate();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
            String formattedDate = eventDate.format(formatter);
        %>

        <p><img src="../media/IMAGE/location.png" class="icon"> <%= rs.getString("location") %></p>
        <p><img src="../media/IMAGE/datetime1.png" class="icon"> <%= formattedDate %></p>

       <div class="status-unregister">
    <span class="event-status"><%= rs.getString("status") %></span>
    <form method="post" action="unregister.jsp">
        <input type="hidden" name="event_id" value="<%= rs.getString("event_id") %>">
        <button type="submit" class="unregister-btn">Unregister</button>
    </form>
</div>

    </div>
<%
    }
} catch (Exception e) {
    out.println("<p>Error loading events: " + e.getMessage() + "</p>");
} finally {
    try { if (rs != null) rs.close(); } catch(Exception e){}
    try { if (ps != null) ps.close(); } catch(Exception e){}
    try { if (conn != null) conn.close(); } catch(Exception e){}
}
%>
</div>

</body>
</html>
