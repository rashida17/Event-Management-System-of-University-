<%@ page import="java.sql.*, java.net.URLEncoder" %>
<%
String email = request.getParameter("email");
String password = request.getParameter("password");
String error = request.getParameter("error");
String errorMsg = "";

// Display error message if redirected with error
if ("1".equals(error)) {
    errorMsg = "Incorrect email or password!";
}

if (request.getMethod().equalsIgnoreCase("POST")) {

    Connection conn = null;
    PreparedStatement pst = null;
    ResultSet rs = null;

    try {
        // Load MySQL Driver
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/eventdb", "root", ""
        );

        /* ========= 1️⃣ ADMIN LOGIN CHECK ========= */
        String adminSql = "SELECT admin_id, role FROM admin WHERE email=? AND password=?";
        pst = conn.prepareStatement(adminSql);
        pst.setString(1, email);
        pst.setString(2, password);
        rs = pst.executeQuery();

        if (rs.next()) {
            // Admin login success
            session.setAttribute("admin_id", rs.getInt("admin_id"));
            session.setAttribute("role", "admin");
            response.sendRedirect("../HTML/AdminDashboard.html"); // redirect admin
            return;
        }

        rs.close();
        pst.close();

        /* ========= 2️⃣ STUDENT LOGIN CHECK ========= */
        String studentSql = "SELECT student_id FROM students WHERE email=? AND password=?";
        pst = conn.prepareStatement(studentSql);
        pst.setString(1, email);
        pst.setString(2, password);
        rs = pst.executeQuery();

        if (rs.next()) {
            // Student login success
            session.setAttribute("student_id", rs.getString("student_id")); // ✅ getString for VARCHAR
            session.setAttribute("role", "student");
            response.sendRedirect("../HTML/HOME.html"); // redirect student
            return;
        }

        // Neither admin nor student matched
        response.sendRedirect("signIn.jsp?error=1&email=" + URLEncoder.encode(email, "UTF-8"));
        return;

    } catch(Exception e) {
        errorMsg = "Database error: " + e.getMessage();
    } finally {
        try { if(rs != null) rs.close(); } catch(Exception e) {}
        try { if(pst != null) pst.close(); } catch(Exception e) {}
        try { if(conn != null) conn.close(); } catch(Exception e) {}
    }
}
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sign In</title>
<link rel="stylesheet" href="../CSS/log.css">
</head>
<body>
<video autoplay muted loop id="bg-video">
  <source src="../media/VIDEO/final4.mp4" type="video/mp4">
</video>

<div class="container">
<form method="post" action="signIn.jsp" autocomplete="on"> 
<h2 id="heading">Sign in to explore</h2><hr>

<label for="email">Email ID:</label>
<input type="email" id="email" name="email" placeholder="Email Id" value="<%= email != null ? email : "" %>" required><br>

<label for="password">Password:</label>
<input type="password" id="password" name="password" placeholder="Password" required><br>

<% if (!errorMsg.isEmpty()) { %>
    <p style="color:red;"><i><%= errorMsg %></i></p>
<% } %>

<div id="myButton">
<button type="submit">Sign in</button>
</div>
</form>
</div>
</body>
</html>
