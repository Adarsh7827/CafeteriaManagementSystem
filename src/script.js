// Cart functionality
let cart = [];
let totalAmount = 0;

// Menu item click handlers
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.menu-item');
        const itemName = menuItem.querySelector('h5').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
        
        addToCart(itemName, itemPrice);
        updateCartDisplay();
        
        // Show success toast
        showToast(`Added ${itemName} to cart`);
    });
});

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalAmount += price;
    updateCartBadge();
}

function updateCartBadge() {
    const cartBadge = document.querySelector('#cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

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

// Form Validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            handleFormSubmit(form);
        }
        
        form.classList.add('was-validated');
    });
});

function handleFormSubmit(form) {
    switch(form.id) {
        case 'orderForm':
            submitOrder(form);
            break;
        case 'inventoryForm':
            updateInventory(form);
            break;
    }
}

function submitOrder(form) {
    const orderData = {
        customerName: form.querySelector('#customerName').value,
        tableNumber: form.querySelector('#tableNumber').value,
        items: cart,
        total: totalAmount
    };
    
    // Simulate API call
    console.log('Submitting order:', orderData);
    
    // Show success message and reset
    showToast('Order placed successfully!');
    resetOrder(form);
}

function updateInventory(form) {
    const inventoryData = {
        itemName: form.querySelector('#itemName').value,
        quantity: form.querySelector('#itemQuantity').value
    };
    
    // Simulate API call
    console.log('Updating inventory:', inventoryData);
    
    // Show success message and reset
    showToast('Inventory updated successfully!');
    form.reset();
    form.classList.remove('was-validated');
}

function resetOrder(form) {
    cart = [];
    totalAmount = 0;
    updateCartBadge();
    updateCartDisplay();
    form.reset();
    form.classList.remove('was-validated');
    
    // Close modal
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
    toastElement.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Real-time inventory status update
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

// Search functionality
document.querySelector('#searchInput')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h5').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();
        
        if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}); 