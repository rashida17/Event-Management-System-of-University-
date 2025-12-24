<%@ page import="java.sql.*" %>
<%
    // Get student ID from session
    String studentId = (String) session.getAttribute("student_id");
    if(studentId == null){
        response.sendRedirect("../HTML/LOGIN.html"); 
        return;
    }

    // Get event_id from form submission
    String eventIdStr = request.getParameter("event_id");
    if(eventIdStr == null){
        out.println("No event selected!");
        return;
    }
    int eventId = Integer.parseInt(eventIdStr);

    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/eventdb", "root", "");

        // Get student name
        ps = conn.prepareStatement("SELECT stu_name FROM students WHERE student_id=?"); // ✅ corrected
        ps.setString(1, studentId);
        rs = ps.executeQuery();

        String studentName = "Student";
        if(rs.next()){
            studentName = rs.getString("stu_name");
            session.setAttribute("stu_name", studentName); // store in session
        }
        rs.close();
        ps.close();

        // Check if already enrolled
        ps = conn.prepareStatement("SELECT * FROM enrollments WHERE student_id=? AND event_id=?");
        ps.setString(1, studentId);
        ps.setInt(2, eventId);
        rs = ps.executeQuery();

        if(!rs.next()){
            rs.close();
            ps.close();

            // Insert enrollment
            ps = conn.prepareStatement(
                "INSERT INTO enrollments(student_id, event_id, status) VALUES(?, ?, 'Registered')"
            );
            ps.setString(1, studentId);
            ps.setInt(2, eventId);
            ps.executeUpdate();
        }
        rs.close();
        ps.close();
        conn.close();

        // Redirect to dashboard to show enrolled events
        response.sendRedirect("UserDashboard.jsp");

    } catch(Exception e){
        e.printStackTrace();
        out.println("Error: " + e.getMessage());
    } finally {
        try { if(rs != null) rs.close(); } catch(Exception e){}
        try { if(ps != null) ps.close(); } catch(Exception e){}
        try { if(conn != null) conn.close(); } catch(Exception e){}
    }
%>
