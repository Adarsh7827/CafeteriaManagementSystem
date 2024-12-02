package main;

import dao.MenuDAOImpl;
import model.Menu;

public class CafeteriaApp {
    public static void main(String[] args) {
        MenuDAOImpl menuDAO = new MenuDAOImpl();

        // Adding a menu item
        Menu menu = new Menu("Pizza", 9.99);
        menuDAO.addMenuItem(menu);

        // Retrieving a menu item
        Menu retrievedMenu = menuDAO.getMenuItem(1);  // Assume the ID is 1
        System.out.println("Menu Item: " + retrievedMenu.getItemName() + " Price: " + retrievedMenu.getPrice());
    }
}
