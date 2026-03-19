/* Roll Up Rentals Website - Shared JavaScript Functionality */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to current nav item based on URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '')) {
            link.classList.add('active');
        }
    });
    
    // Form validation and submission for contact page
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const details = document.getElementById('details').value.trim();
            
            if (name === '' || phone === '' || email === '' || details === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (in real app, this would send to server)
            // Hide form and show success message
            this.style.display = 'none';
            successMessage.classList.add('show');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                this.style.display = 'block';
            }, 3000);
        });
    }
    
    // Service selection functionality for contact page
    const serviceOptions = document.querySelectorAll('.service-option');
    const serviceSelect = document.getElementById('service');
    
    if (serviceOptions.length > 0 && serviceSelect) {
        serviceOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update form selection
                const serviceValue = this.dataset.service;
                if (serviceValue === 'multiple') {
                    serviceSelect.value = 'multiple';
                } else {
                    serviceSelect.value = serviceValue;
                }
            });
        });
    }
    
    // Add CSS animation classes on scroll
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .stats-section .stat-card');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                // Trigger animation
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
});