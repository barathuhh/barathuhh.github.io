// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Enhanced Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    // Ensure body doesn't scroll during loading
    document.body.style.overflow = 'hidden';
    
    // Loading sequence - Extended timing for better user experience
    const loadingSequence = [
        { text: "Initializing...", duration: 600 },
        { text: "Loading portfolio data...", duration: 400 },
        { text: "Preparing skills showcase...", duration:400 },
        { text: "Setting up projects...", duration: 400 },
        { text: "Finalizing experience...", duration: 200 },
        { text: "Portfolio ready!", duration: 200 }
    ];
    
    let currentStep = 0;
    let currentProgress = 0;
    
    // Mobile optimization: Reduce animation complexity on mobile
    const isMobile = window.innerWidth <= 768;
    const animationSpeed = isMobile ? 100 : 50; // Slower typing on mobile for better visibility
    
    // Start the enhanced loading animation
    function startLoadingAnimation() {
        // Start typing animations
        setTimeout(() => startTypingSequence(), 800);
        
        // Start progress animation
        setTimeout(() => startProgressAnimation(), 1000);
        
        // Show skills preview
        setTimeout(() => showSkillsPreview(), 3000);
    }
    
    // Typing sequence animation
    function startTypingSequence() {
        const typingLines = document.querySelectorAll('.typing-line');
        let currentLine = 0;
        
        function typeNextLine() {
            if (currentLine < typingLines.length) {
                const line = typingLines[currentLine];
                const text = line.getAttribute('data-text');
                const typedTextElement = line.querySelector('.typed-text');
                
                line.classList.add('active');
                
                // Type out the text character by character
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        typedTextElement.textContent = text.slice(0, charIndex + 1);
                        charIndex++;
                    } else {
                        clearInterval(typingInterval);
                        setTimeout(() => {
                            currentLine++;
                            typeNextLine();
                        }, 500);
                    }
                }, animationSpeed);
            }
        }
        
        typeNextLine();
    }
    
    // Progress animation
    function startProgressAnimation() {
        const progressSection = document.querySelector('.loading-progress');
        progressSection.classList.add('active');
        
        function updateProgress() {
            if (currentStep < loadingSequence.length) {
                const step = loadingSequence[currentStep];
                progressText.textContent = step.text;
                
                const targetProgress = ((currentStep + 1) / loadingSequence.length) * 100;
                
                // Animate progress bar
                const progressInterval = setInterval(() => {
                    if (currentProgress < targetProgress) {
                        currentProgress += 2;
                        progressFill.style.width = currentProgress + '%';
                        progressPercent.textContent = Math.round(currentProgress) + '%';
                    } else {
                        clearInterval(progressInterval);
                        currentStep++;
                        
                        if (currentStep < loadingSequence.length) {
                            setTimeout(updateProgress, step.duration);
                        } else {
                            // Complete loading and auto-redirect
                            setTimeout(() => {
                                progressText.textContent = "Portfolio ready!";
                                progressFill.style.width = '100%';
                                progressPercent.textContent = "100%";
                                // Auto-redirect after reaching 100%
                                setTimeout(() => {
                                    hideLoadingScreen();
                                }, 500); // Give time to see 100% completion
                            }, 200);
                        }
                    }
                }, 50);
            }
        }
        
        updateProgress();
    }
    
    // Skills preview animation
    function showSkillsPreview() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const delay = parseInt(item.getAttribute('data-delay')) || 0;
            setTimeout(() => {
                item.classList.add('active');
                
                // Add hover pulse effect
                item.addEventListener('mouseenter', () => {
                    item.style.animation = 'skillPulse 0.3s ease';
                });
                
                item.addEventListener('animationend', () => {
                    item.style.animation = '';
                });
            }, delay);
        });
    }
    
    // Hide loading screen with enhanced animation (auto-triggered at 100%)
    function hideLoadingScreen() {
        // Add exit animation for elements
        const elements = [
            '.loader-avatar',
            '.typing-container',
            '.loading-progress',
            '.skills-preview'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.transition = 'all 0.5s ease';
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(-20px) scale(0.9)';
                }, index * 100);
            }
        });
        
        // Hide the entire loading screen
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 800);
    }
    
    // Auto-start loading animation
    startLoadingAnimation();
    
    // Optional: Skip loading with spacebar (for testing)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && loadingScreen.style.display !== 'none') {
            e.preventDefault();
            hideLoadingScreen();
        }
    });
});

// Add skill pulse animation keyframe via JavaScript
const skillPulseStyle = document.createElement('style');
skillPulseStyle.textContent = `
    @keyframes skillPulse {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-3px) scale(1.05); }
        100% { transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(skillPulseStyle);

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const texts = [
    'Web Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Start typewriter effect after loading
setTimeout(type, 3000);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 30);
        } else {
            counter.innerText = target;
        }
    });
}

// Trigger counter animation when about section is in view
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// // Skills Progress Animation
// function animateSkills() {
//     const skillBars = document.querySelectorAll('.skill-progress');
//     console.log('Animating skills, found', skillBars.length, 'skill bars');
    
//     skillBars.forEach((bar, index) => {
//         const width = bar.getAttribute('data-width');
//         console.log(`Skill bar ${index}: width = ${width}%`);
//         // Reset width first
//         bar.style.width = '0%';
        
//         // Animate with delay for staggered effect
//         setTimeout(() => {
//             bar.style.width = width + '%';
//         }, index * 200); // 200ms delay between each bar
//     });
// }

// // Trigger skills animation when skills section is in view
// const skillsSection = document.getElementById('skills');
// if (skillsSection) {
//     const skillsObserver = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 console.log('Skills section is in view, starting animation');
//                 // Small delay to ensure section is fully visible
//                 setTimeout(() => {
//                     animateSkills();
//                 }, 300);
//                 skillsObserver.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.3 });

//     skillsObserver.observe(skillsSection);
// } else {
//     console.log('Skills section not found!');
// }

// skillsObserver.observe(skillsSection);

// Smooth scrolling for anchor links
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

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Add 'valid' class for label animation
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
        }
    });
    
    // Check on page load for autofilled inputs
    if (input.value.trim() !== '') {
        input.classList.add('valid');
    }
});

// Form submission with animation
contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Reset after form processes (Web3Forms will handle the actual submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && heroContent) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Mouse Parallax Effect for Floating Shapes
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Project Cards Hover Effect Enhancement
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Add loading class to body initially
document.body.classList.add('loading');

// Remove loading class after everything is loaded
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
});

// Intersection Observer for advanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add stagger effect for child elements
            const children = entry.target.querySelectorAll('.project-card, .skill-item, .about-card, .contact-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Create confetti effect
        createConfetti();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '10000';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Add CSS keyframes for rainbow and fall animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fallback: Trigger skills animation after page load (for testing)
setTimeout(() => {
    if (document.getElementById('skills')) {
        console.log('Fallback: Triggering skills animation');
        animateSkills();
    }
}, 3000);
