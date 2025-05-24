// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add animation class to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add interactive hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.6)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
        });
    });

    // Add typing effect to the name
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);

    // Add click to copy functionality for contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            navigator.clipboard.writeText(text).then(function() {
                // Show temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #2c3e50;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                    transform: translateY(-30px);
                `;
                item.style.position = 'relative';
                item.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    });

    // Add progress bars to skills (animated on scroll)
    function addProgressBars() {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const skillLevels = {
                'Adobe Illustrator': 90,
                'Arbortext Editor & Styler 7.1': 95,
                'X-Metal': 85,
                'ODYSSEY': 80,
                'PTS': 85,
                'Technical Documentation': 95,
                'CAD Analysis': 88,
                'Quality Assurance': 92,
                'HTML/CSS': 75,
                'JavaScript': 70
            };

            skillItems.forEach(item => {
                const skillName = item.textContent;
                if (skillLevels[skillName]) {
                    const level = skillLevels[skillName];
                    item.setAttribute('data-skill-level', level);
                    
                    // Add progress bar on hover
                    item.addEventListener('mouseenter', function() {
                        if (!this.querySelector('.progress-bar')) {
                            const progressBar = document.createElement('div');
                            progressBar.className = 'progress-bar';
                            progressBar.innerHTML = `
                                <div class="progress-fill" style="width: 0%"></div>
                                <span class="progress-text">${level}%</span>
                            `;
                            progressBar.style.cssText = `
                                position: absolute;
                                bottom: -5px;
                                left: 0;
                                right: 0;
                                height: 4px;
                                background: rgba(255,255,255,0.3);
                                border-radius: 2px;
                                overflow: hidden;
                            `;
                            
                            const progressFill = progressBar.querySelector('.progress-fill');
                            progressFill.style.cssText = `
                                height: 100%;
                                background: rgba(255,255,255,0.9);
                                transition: width 1s ease;
                                border-radius: 2px;
                            `;
                            
                            const progressText = progressBar.querySelector('.progress-text');
                            progressText.style.cssText = `
                                position: absolute;
                                top: -20px;
                                right: 0;
                                font-size: 10px;
                                color: white;
                                font-weight: bold;
                            `;
                            
                            this.style.position = 'relative';
                            this.appendChild(progressBar);
                            
                            // Animate progress bar
                            setTimeout(() => {
                                progressFill.style.width = level + '%';
                            }, 100);
                        }
                    });
                }
            });
        }
    }

    addProgressBars();

    // Add subtle parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
                    `;
                    printButton.addEventListener('click', function() {
                        window.print();
                    });
                    document.body.appendChild(printButton);
                }
                addPrintButton();
            });