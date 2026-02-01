// Floating Petals Animation
function createPetals() {
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 50;
    
    // Create different petal styles
    const petalStyles = [
        { color: '#C8A2C8', size: '12px' },
        { color: '#B19CD9', size: '15px' },
        { color: '#9370DB', size: '10px' },
        { color: '#E6D3E6', size: '14px' },
        { color: '#9B7A9B', size: '13px' }
    ];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Random style
        const style = petalStyles[Math.floor(Math.random() * petalStyles.length)];
        petal.style.background = style.color;
        petal.style.width = style.size;
        petal.style.height = style.size;
        
        // Random starting position
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = Math.random() * 100 + '%';
        
        // Random animation duration (10-20 seconds)
        const duration = 10 + Math.random() * 10;
        petal.style.animationDuration = duration + 's';
        
        // Random delay
        petal.style.animationDelay = Math.random() * 5 + 's';
        
        // Random rotation
        const rotation = Math.random() * 360;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        petalsContainer.appendChild(petal);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(200, 162, 200, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(200, 162, 200, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-scale-in, .animate-slide-in-left, .animate-slide-in-right');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});

// Gallery item hover effect enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Form submission
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message (in a real app, this would send to a server)
    alert(`¡Gracias ${data.name}! Tu confirmación ha sido recibida. Te esperamos el 15 de Marzo, 2025.`);
    
    // Reset form
    this.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 1000);
    }
});

// Add sparkle effect to certain elements
function addSparkleEffect() {
    const sparkleElements = document.querySelectorAll('.hero-title, .section-title, .logo');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(200, 162, 200, 0.8), 0 0 40px rgba(147, 112, 219, 0.6)';
            this.style.transition = 'text-shadow 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
}

// Animated counter for event cards (if needed)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    addSparkleEffect();
    
    // Add entrance animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating animation to heritage items
document.querySelectorAll('.heritage-item').forEach((item, index) => {
    item.style.animation = `float 3s ease-in-out infinite`;
    item.style.animationDelay = `${index * 0.2}s`;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced petal animation with more variety
function enhancePetals() {
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        // Add random horizontal movement
        const horizontalMovement = (Math.random() - 0.5) * 200;
        petal.style.setProperty('--h-move', `${horizontalMovement}px`);
        
        // Create custom animation
        const keyframes = `
            @keyframes float-petal-${index} {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.6;
                }
                25% {
                    transform: translate(${horizontalMovement * 0.25}px, -25vh) rotate(90deg);
                }
                50% {
                    transform: translate(${horizontalMovement * 0.5}px, -50vh) rotate(180deg);
                    opacity: 0.8;
                }
                75% {
                    transform: translate(${horizontalMovement * 0.75}px, -75vh) rotate(270deg);
                }
                100% {
                    transform: translate(${horizontalMovement}px, -100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        petal.style.animation = `float-petal-${index} ${10 + Math.random() * 10}s linear infinite`;
    });
}

// Call enhance petals after initial creation
setTimeout(enhancePetals, 100);
