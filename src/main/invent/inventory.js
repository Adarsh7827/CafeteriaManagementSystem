document.addEventListener('DOMContentLoaded', function() {
    // Example of dynamically updating status
    const statusElements = document.querySelectorAll('.status-warning');
    statusElements.forEach((element) => {
        element.addEventListener('click', function() {
            alert("Status: Low Stock!");
        });
    });
});
