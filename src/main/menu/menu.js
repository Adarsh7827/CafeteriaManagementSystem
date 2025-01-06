// JavaScript to handle "Add to Cart" functionality
let cart = [];

function addToCart(itemName, price) {
    // Add the item to the cart array
    const item = {
        name: itemName,
        price: price
    };
    cart.push(item);
    
    // Display alert for adding to cart
    alert(`${itemName} has been added to your cart!`);
    
    // Log the cart content for debugging
    console.log('Cart:', cart);
}

// Optional: Function to show cart items in a pop-up or a dedicated cart page
function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let cartDetails = "Items in your cart:\n";
    let totalPrice = 0;
    
    cart.forEach(item => {
        cartDetails += `${item.name} - $${item.price}\n`;
        totalPrice += item.price;
    });
    
    cartDetails += `\nTotal Price: $${totalPrice.toFixed(2)}`;
    
    alert(cartDetails);
}
