<%@ page import="java.sql.*" %>
<%
String studentId = (String) session.getAttribute("student_id");
if (studentId == null) {
    response.sendRedirect("loginProcess.jsp");
    return;
}

String eventId = request.getParameter("event_id");

if (eventId != null) {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/eventdb","root","");

        String sql = "DELETE FROM enrollments WHERE student_id=? AND event_id=?";
        ps = conn.prepareStatement(sql);
        ps.setString(1, studentId);
        ps.setString(2, eventId);
        int deleted = ps.executeUpdate();

        if (deleted > 0) {
            response.sendRedirect("UserDashboard.jsp"); // success
        } else {
            out.println("<p>Error: Could not unregister.</p>");
        }

    } catch(Exception e) {
        out.println("<p>Database Error: " + e.getMessage() + "</p>");
    } finally {
        try { if(ps != null) ps.close(); } catch(Exception e){}
        try { if(conn != null) conn.close(); } catch(Exception e){}
    }
} else {
    response.sendRedirect("UserDashboard.jsp");
}
%>
