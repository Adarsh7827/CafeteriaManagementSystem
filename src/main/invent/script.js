// Cart functionality
let cart = [];
let totalAmount = 0;

// Add event listeners for menu items
document.querySelector('.menu-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('order-btn')) {
        const menuItem = e.target.closest('.menu-item');
        const itemName = menuItem.querySelector('h5').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));

        addToCart(itemName, itemPrice);
        updateCartDisplay();
        showToast(`Added ${itemName} to cart`);
    }
});

// Add item to cart
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalAmount += price;
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('#cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cart.length || '';
    }
}

// Update cart display
function updateCartDisplay() {
    const selectedItems = document.querySelector('#selectedItems');
    const totalPrice = document.querySelector('#totalPrice');

    if (selectedItems && totalPrice) {
        selectedItems.innerHTML = cart.map(item => `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');

        totalPrice.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
}

// Form validation
document.addEventListener('submit', function(event) {
    const form = event.target;

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else if (form.id === 'orderForm') {
        submitOrder(form);
    } else if (form.id === 'inventoryForm') {
        updateInventory(form);
    }

    form.classList.add('was-validated');
});

// Submit order
function submitOrder(form) {
    const orderData = {
        customerName: form.querySelector('#customerName').value,
        tableNumber: form.querySelector('#tableNumber').value,
        items: cart,
        total: totalAmount
    };

    console.log('Submitting order:', orderData);

    showToast('Order placed successfully!');
    resetOrder(form);
}

// Update inventory
function updateInventory(form) {
    const inventoryData = {
        itemName: form.querySelector('#itemName').value,
        quantity: form.querySelector('#itemQuantity').value
    };

    console.log('Updating inventory:', inventoryData);

    showToast('Inventory updated successfully!');
    form.reset();
    form.classList.remove('was-validated');
}

// Reset order form
function resetOrder(form) {
    cart = [];
    totalAmount = 0;
    updateCartBadge();
    updateCartDisplay();
    form.reset();
    form.classList.remove('was-validated');

    const modal = bootstrap.Modal.getInstance(document.querySelector('#orderModal'));
    if (modal) {
        modal.hide();
    }
}

// Toast notifications
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();

    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.innerHTML = `<div class="toast-body">${message}</div>`;

    toastContainer.appendChild(toastElement);

    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// Create toast container
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Search functionality
document.querySelector('#searchInput')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h5').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();

        item.style.display = itemName.includes(searchTerm) || itemDescription.includes(searchTerm) ? '' : 'none';
    });
});

// Real-time inventory status
function updateInventoryStatus(itemId, quantity) {
    const statusElement = document.querySelector(`#status-${itemId}`);
    if (statusElement) {
        if (quantity <= 10) {
            statusElement.className = 'badge bg-danger';
            statusElement.textContent = 'Low Stock';
        } else if (quantity <= 30) {
            statusElement.className = 'badge bg-warning';
            statusElement.textContent = 'Medium Stock';
        } else {
            statusElement.className = 'badge bg-success';
            statusElement.textContent = 'In Stock';
        }
    }
}

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(el => new bootstrap.Tooltip(el));
    [...document.querySelectorAll('[data-bs-toggle="popover"]')].forEach(el => new bootstrap.Popover(el));
});
