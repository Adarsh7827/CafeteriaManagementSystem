let currentUserType = '';

function showLoginForm(userType) {
    currentUserType = userType;
    const loginForm = document.querySelector('.login-form-container');
    const loginTitle = document.getElementById('loginTitle');
    
    // Update form title
    loginTitle.textContent = userType === 'employee' ? 'Employee Login' : 'Customer Login';
    
    // Show form with animation
    loginForm.style.display = 'block';
    loginForm.classList.add('fade-in');
    
    // Scroll to form
    loginForm.scrollIntoView({ behavior: 'smooth' });
}

function hideLoginForm() {
    const loginForm = document.querySelector('.login-form-container');
    loginForm.style.display = 'none';
    currentUserType = '';
}

// Password visibility toggle
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Form validation and submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add('was-validated');
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulate login validation
    if (currentUserType === 'employee') {
        if (username === 'employee' && password === 'emp123') {
            showSuccessMessage('Employee login successful!');
            setTimeout(() => window.location.href = 'employee-dashboard.html', 1500);
        } else {
            showErrorMessage('Invalid employee credentials');
        }
    } else {
        if (username === 'customer' && password === 'cust123') {
            showSuccessMessage('Customer login successful!');
            setTimeout(() => window.location.href = 'customer-dashboard.html', 1500);
        } else {
            showErrorMessage('Invalid customer credentials');
        }
    }
});

function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center ${type === 'success' ? 'bg-success' : 'bg-danger'} text-white border-0`;
    toastElement.setAttribute('role', 'alert');
    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}