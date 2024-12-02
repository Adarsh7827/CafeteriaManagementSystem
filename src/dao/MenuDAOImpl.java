package dao;

import model.Menu;
import utils.DBConnection;

import java.sql.*;

public class MenuDAOImpl {
    public void addMenuItem(Menu menu) {
        String query = "INSERT INTO menu (item_name, price) VALUES (?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, menu.getItemName());
            stmt.setDouble(2, menu.getPrice());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Menu getMenuItem(int id) {
        String query = "SELECT * FROM menu WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String itemName = rs.getString("item_name");
                double price = rs.getDouble("price");
                return new Menu(itemName, price);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
