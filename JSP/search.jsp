<%@ page import="java.sql.*" %>
<%
String query = request.getParameter("query");

if (query == null || query.trim().equals("")) {
%>
    <script>alert("Please enter an event name!"); window.history.back();</script>
<%
    return;
}

Connection conn = null;
PreparedStatement pst = null;
ResultSet rs = null;

try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/eventdb", "root", "");

    String sql = "SELECT * FROM events WHERE event_name LIKE ?";
    pst = conn.prepareStatement(sql);
    pst.setString(1, "%" + query + "%");
    rs = pst.executeQuery();

    if (rs.next()) {
        String category = rs.getString("category");
        int eventId = rs.getInt("event_id");

        // redirect with highlight parameter
        String categoryLower = category.toLowerCase();

response.sendRedirect("../HTML/" + categoryLower + "Events.html?highlight=" + eventId);
        return;
    } else {

        response.sendRedirect("../HTML/searchRetry.html");
         return;
    }

} catch (Exception e) {
    out.println(e);
} finally {
    if (rs != null) rs.close();
    if (pst != null) pst.close();
    if (conn != null) conn.close();
}
%>
