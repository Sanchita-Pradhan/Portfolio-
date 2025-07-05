// JavaScript for Sanchita Pradhan's Portfolio

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS ONCE
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: '-JOzN6OXh2jAHKsys',
        });
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS script not loaded!');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // Typing animation for hero section
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const phrases = [
            'Computer Science Student',
            'Full Stack Developer',
            'Problem Solver',
            'Tech Enthusiast'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before starting new phrase
            }

            setTimeout(typeWriter, typingSpeed);
        }

        typeWriter();
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .skill-item, .education-item, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Contact form validation and submission
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const subject = document.querySelector('#subject').value.trim();
            const message = document.querySelector('#message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Basic validation
            if (!name || !email || !message) {
                showAlert('Please fill in all required fields (Name, Email, and Message).', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }

            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;

            // Prepare template params
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject || 'New message from portfolio contact form',
                message: message,
                to_name: 'Sanchita Pradhan'
            };

            console.log('Attempting to send email with EmailJS...');
            
            // Check if EmailJS is properly initialized
            if (typeof emailjs === 'undefined') {
                console.error('EmailJS is not loaded!');
                showAlert('Email service is not available. Please try again later or contact directly via email.', 'danger');
                resetSubmitButton();
                return;
            }

            emailjs.send('service_d8eoxpc', 'template_g7d4u51', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response);
                    showAlert('Thank you for your message! I will get back to you soon.', 'success');
                    contactForm.reset();
                    resetSubmitButton();
                })
                .catch(function(error) {
                    console.error('Email send error:', error);
                    showAlert('Sorry, there was an error sending your message. Please try contacting me directly at pradhansanchita748@gmail.com', 'danger');
                    resetSubmitButton();
                });

            function resetSubmitButton() {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show alert function
    function showAlert(message, type) {
        // Remove any existing alerts first
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '100px';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translateX(-50%)';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.style.maxWidth = '500px';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remove alert after 7 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 7000);
    }

    // Add active class to current navigation link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentLocation === href || (currentLocation === '/' && href === '/')) {
            link.classList.add('active');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-section');
        
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add enhanced hover effects to skill tags with sparkles
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            
            // Create mini sparkles around the tag
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                    sparkle.style.background = 'var(--pink-primary)';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 1500);
                }, i * 100);
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Enhanced stagger animation for project cards with pink glow
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        
        // Add pink glow on hover
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 107, 157, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add pink glow to buttons on hover
    document.querySelectorAll('.btn-primary, .btn-outline-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Create glow particles around button
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                    sparkle.style.background = 'var(--pink-primary)';
                    sparkle.style.width = '6px';
                    sparkle.style.height = '6px';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 1500);
                }, i * 80);
            }
        });
    });

    // Initialize enhanced pink effects
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        const colors = ['pink', 'purple', 'blue'];
        const sizes = [4, 6, 8, 10];
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.className = `particle ${color}`;
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 10 + 10}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Create sparkle effects on mouse movement
    function createSparkles(e) {
        if (Math.random() > 0.7) { // Only create sparkles 30% of the time
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }
    }

    // Create cursor trail effect
    function createCursorTrail(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 800);
    }

    // Initialize enhanced pink effects
    function initializePinkEffects() {
        createFloatingParticles();
        
        // Add mouse move effects
        let lastTrailTime = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            
            // Create sparkles
            createSparkles(e);
            
            // Create cursor trail (throttled)
            if (now - lastTrailTime > 50) {
                createCursorTrail(e);
                lastTrailTime = now;
            }
        });
        
        // Add click sparkle burst
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.left = (e.clientX + Math.random() * 40 - 20) + 'px';
                    sparkle.style.top = (e.clientY + Math.random() * 40 - 20) + 'px';
                    document.body.appendChild(sparkle);
                    setTimeout(() => {
                        sparkle.remove();
                    }, 1500);
                }, i * 50);
            }
        });
    }

    // Initialize all effects when DOM is loaded
    initializePinkEffects();
});
