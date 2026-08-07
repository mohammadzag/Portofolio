/* ----------------------------------------------------
   MOHAMMAD AL-ZAGHAMEEM - CYBERSECURITY PORTFOLIO
   Core Javascript Functionality
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       THEME SWITCHER (LIGHT/DARK MODE)
       ==================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check local storage for preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleIcon) themeToggleIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        if (themeToggleIcon) themeToggleIcon.className = 'fa-solid fa-moon';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            if (isLight) {
                themeToggleIcon.className = 'fa-solid fa-sun';
            } else {
                themeToggleIcon.className = 'fa-solid fa-moon';
            }
        });
    }

    /* ====================================================
       NAVIGATION HEADER EFFECTS & MOBILE MENU
       ==================================================== */
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll class to header
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });

    // Mobile nav toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            if (navToggle) {
                navToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('show-menu') && 
            navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            navToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
    });

    // Scroll active link tracking
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    });


    /* ====================================================
       TYPEWRITER EFFECT (HERO SUBTITLE)
       ==================================================== */
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const words = JSON.parse(typewriter.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            typewriter.textContent = currentText;

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && currentText === currentWord) {
                typeSpeed = 2000; // Hold full word
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Delay before starting next word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000); // Initial delay
    }


    /* ====================================================
       INTERACTIVE CYBER TERMINAL
       ==================================================== */
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalOutput && terminalBody) {
        
        // Auto-focus input on clicking anywhere inside terminal
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                executeTerminalCommand(command);
                terminalInput.value = '';
            }
        });

        function printLine(text, cssClass = '') {
            const line = document.createElement('div');
            line.className = `terminal-line ${cssClass}`;
            line.innerHTML = text;
            terminalOutput.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        function executeTerminalCommand(cmd) {
            // Print input prompt line
            printLine(`<span class="prompt">guest@mz-cyber-core:~$</span> ${cmd}`);

            if (cmd === '') return;

            switch(cmd) {
                case 'help':
                    printLine('Available secure operations commands:');
                    printLine('  <span class="text-green">about</span>    - Display professional summary matrix');
                    printLine('  <span class="text-green">skills</span>   - List technical competencies');
                    printLine('  <span class="text-green">projects</span> - View developed software / lab files');
                    printLine('  <span class="text-green">contact</span>  - Print secure communication paths');
                    printLine('  <span class="text-green">cv</span>       - Fetch direct CV payload link');
                    printLine('  <span class="text-green">clear</span>    - Wipe active terminal terminal log');
                    break;
                case 'about':
                    printLine('Mohammad Al-Zaghameem - B.Sc in Cybersecurity (Tafila Technical University).');
                    printLine('Graduation Expected: August 2026.');
                    printLine('Completed threat analyst training with the National Cybersecurity Center (NCSC).');
                    printLine('Academic Teaching Assistant for Operating Systems (Linux), Discrete Math, and AI.');
                    printLine('Co-founded the Jordan Cybersecurity Club Platform (JCC).');
                    break;
                case 'skills':
                    printLine('--- CORE SECURITY TOOLKIT ---');
                    printLine('  - Forensics: Autopsy, FTK Imager');
                    printLine('  - Ops/Scanning: Wireshark, Nmap, Kali, Metasploit');
                    printLine('  - Networks/Systems: TCP/IP, Linux, Windows Server, AD');
                    printLine('  - Code: Python Scripting, C++, ESP32 Microcontrollers');
                    break;
                case 'projects':
                    printLine('--- PROJECT METRIC ARTIFACTS ---');
                    printLine('  1. <span class="text-green">Digital Forensics Insider Investigation</span> - Mock endpoint disk image timeline analysis.');
                    printLine('  2. <span class="text-green">Secure E-Commerce Risk Assessment</span> - OWASP Top 10 threat modeling & WAF segmentation.');
                    printLine('  3. <span class="text-green">EduKernel-Suite</span> - Virtualized cybersecurity lab (Docker multi-host node network).');
                    printLine('  4. <span class="text-green">MHZTools</span> - Custom systems security and automation utilities.');
                    printLine('  5. <span class="text-green">GravityUtilities_</span> - Systems helper scripts and performance tweaks.');
                    printLine('Type \'<span class="text-green">projects --view</span>\', \'<span class="text-green">mhztools --view</span>\', or \'<span class="text-green">gravity --view</span>\' to launch links.');
                    break;
                case 'projects --view':
                    printLine('Opening EduKernel-Suite GitHub Repository...');
                    window.open('https://github.com/Dalcots/EduKernel-Suite', '_blank');
                    break;
                case 'mhztools --view':
                    printLine('Opening MHZTools GitHub Repository...');
                    window.open('https://github.com/mohammadzag/MHZTools', '_blank');
                    break;
                case 'gravity --view':
                    printLine('Opening GravityUtilities_ GitHub Repository...');
                    window.open('https://github.com/mohammadzag/GravityUtilities_', '_blank');
                    break;
                case 'contact':
                    printLine('--- SECURE CONTACT COORDINATES ---');
                    printLine('  - Email: <a href="mailto:mohzag615@gmail.com" class="text-green">mohzag615@gmail.com</a>');
                    printLine('  - Phone: +962 799919621');
                    printLine('  - Location: Tafilah, Jordan');
                    printLine('  - LinkedIn: <a href="https://www.linkedin.com/in/mohammad-zaghameem-0b01511b6" target="_blank" class="text-green">linkedin.com/in/mohammad-zaghameem-0b01511b6</a>');
                    break;
                case 'cv':
                    printLine('Payload: mohammad_cv.pdf');
                    printLine('<a href="assets/mohammad_cv.pdf?v=3.0" download class="text-green"><i class="fa-solid fa-file-arrow-down"></i> [CLICK TO DOWNLOAD RESUME]</a>');
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    break;
                default:
                    printLine(`mz-cyber-core: Command not recognized: '${cmd}'. Type '<span class="text-green">help</span>' for authorized console access commands.`, 'text-dim');
            }
        }
    }


    /* ====================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ==================================================== */
    const reveals = document.querySelectorAll('.scroll-reveal');
    if (reveals.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, observerOptions);

        reveals.forEach(el => observer.observe(el));
    }


    /* ====================================================
       PROJECTS FILTERING
       ==================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ====================================================
       PROJECT DETAILS MODAL DRAWER
       ==================================================== */
    const projectModal = document.getElementById('project-modal');
    const projectModalClose = document.getElementById('project-modal-close');
    const modalTitle = document.getElementById('modal-project-title');
    const modalTag = document.getElementById('modal-project-tag');
    const modalBody = document.getElementById('project-modal-body');
    const projectDetailBtns = document.querySelectorAll('.btn-project-detail');

    const projectData = {
        'insider-threat': {
            title: 'Digital Forensics Insider Threat Investigation',
            tag: 'Forensics / Endpoint Analysis',
            content: `
                <p><strong>Scenario:</strong> A corporation suspected an employee of leaking confidential proprietary intellectual property before resigning. I conducted a mock forensic acquisition and endpoint analysis.</p>
                
                <h4>Technical Operations:</h4>
                <ul>
                    <li><strong>Disk Acquisition:</strong> Captured raw DD forensic disk images of the target Windows endpoint using FTK Imager, preserving cryptographic checksum hashes (MD5/SHA1).</li>
                    <li><strong>Registry Analysis:</strong> Parsed NTUSER.DAT and system hive files to track recently executed USB storage devices, connected network adapters, and executed command structures.</li>
                    <li><strong>Prefetch & Event Log Analysis:</strong> Investigated Windows prefetch files and application event logs to prove execution of unauthorized file-sharing utilities.</li>
                    <li><strong>Timeline Creation:</strong> Created an interactive, millisecond-accurate timeline in Autopsy to reconstruct document modification dates, browser history exfiltration logs, and email exports.</li>
                </ul>
            `
        },
        'ecommerce-risk': {
            title: 'Secure E-Commerce Infrastructure Risk Analysis',
            tag: 'Threat Modeling & Documentation',
            content: `
                <p><strong>Scenario:</strong> Conducted a complete defensive architecture review and vulnerability assessment of a simulated distributed e-commerce web platform.</p>
                
                <h4>Technical Operations:</h4>
                <ul>
                    <li><strong>Threat Modeling:</strong> Formulated threat models using STRIDE methodology to evaluate attack paths across API endpoints, payment bridges, and client databases.</li>
                    <li><strong>OWASP Top 10 Assessment:</strong> Outlined remediation protocols for critical vulnerabilities including SQL injection, cross-site scripting (XSS), and insecure direct object references (IDOR).</li>
                    <li><strong>Defensive Controls Design:</strong> Designed security network topologies featuring segmented Demilitarized Zones (DMZs), Web Application Firewalls (WAF) rule sets, and secure encrypted backup strategies.</li>
                    <li><strong>Policy Documentation:</strong> Created detailed Risk Registers and Compliance assessment document logs ready for executive audit review.</li>
                </ul>
            `
        }
    };

    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prjKey = btn.getAttribute('data-project');
            const data = projectData[prjKey];
            if (data) {
                modalTitle.textContent = data.title;
                modalTag.textContent = data.tag;
                modalBody.innerHTML = data.content;
                
                projectModal.classList.add('active');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop page scrolling
            }
        });
    });

    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    function closeProjectModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }


    /* ====================================================
       CERTIFICATES MATRIX & FULLSCREEN GALLERY LIGHTBOX
       ==================================================== */
    
    // We map our files list in assets/certificates/
    const certificatesList = [
        {
            filename: 'certificate-ay78f2mpnxt8-1785585074.pdf',
            title: 'Claude Code in Action Certificate of Completion',
            issuer: 'Anthropic',
            type: 'pdf'
        },
        {
            filename: '1758244069702.jpg',
            title: 'Trainer of Trainers (ToT) Professional Certificate',
            issuer: 'Technical & Vocational Skills Development Commission',
            type: 'image'
        },
        {
            filename: 'Screenshot 2026-08-01 145718.png',
            title: 'Defensive Security & Threat Hunting Paths',
            issuer: 'TryHackMe Practical Labs',
            type: 'image'
        },
        {
            filename: '1759512538251.jpg',
            title: 'Data Entry Professional Certification',
            issuer: 'Education for Employment (EFE-Jordan)',
            type: 'image'
        },
        {
            filename: '1758140443911.jpg',
            title: 'Advanced Computer Networking Specialist',
            issuer: 'Academic Accreditation Board',
            type: 'image'
        },
        {
            filename: '1756737580011.jpg',
            title: 'Python Scripting for Information Security & Automation',
            issuer: 'Academic Accreditation Board',
            type: 'image'
        },
        {
            filename: '1757866268691.jpg',
            title: 'Cybersecurity Trainee CNI Certification',
            issuer: 'National Cybersecurity Center (NCSC)',
            type: 'image'
        },
        {
            filename: '1758375924112.jpg',
            title: 'Security Operations & Incident Response Course',
            issuer: 'Security Training Institution',
            type: 'image'
        },
        {
            filename: '1758467425803.jpg',
            title: 'Active Directory & Network Footprints Analysis',
            issuer: 'Security Training Institution',
            type: 'image'
        }
    ];

    const certThumbnailsContainer = document.getElementById('cert-thumbnails-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const openGalleryBtns = document.querySelectorAll('.open-gallery');

    let currentCertIndex = 0;

    // Load thumbnails dynamically
    if (certThumbnailsContainer) {
        certificatesList.forEach((cert, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `thumb-item ${cert.type === 'pdf' ? 'pdf-thumb' : ''}`;
            thumb.setAttribute('data-index', idx);
            
            if (cert.type === 'pdf') {
                // Placeholder background for PDFs
                thumb.innerHTML = `
                    <div style="width:100%;height:100%;background:#091512;display:flex;align-items:center;justify-content:center;"></div>
                    <div class="thumb-label">${cert.title}</div>
                `;
            } else {
                thumb.innerHTML = `
                    <img src="assets/certificates/${cert.filename}" alt="${cert.title}">
                    <div class="thumb-label">${cert.title}</div>
                `;
            }

            thumb.addEventListener('click', () => {
                openLightbox(idx);
            });

            certThumbnailsContainer.appendChild(thumb);
        });
    }

    // Connect certification grid "View Document" buttons
    openGalleryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-cert-index'), 10);
            openLightbox(idx);
        });
    });

    function openLightbox(index) {
        currentCertIndex = index;
        const cert = certificatesList[currentCertIndex];
        
        lightboxMediaContainer.innerHTML = '';
        
        if (cert.type === 'pdf') {
            // Render iframe or direct PDF embed for PDF certificates
            const iframe = document.createElement('iframe');
            iframe.src = `assets/certificates/${cert.filename}`;
            iframe.style.width = '80vw';
            iframe.style.height = '60vh';
            iframe.style.border = 'none';
            lightboxMediaContainer.appendChild(iframe);
        } else {
            // Render standard image tag
            const img = document.createElement('img');
            img.src = `assets/certificates/${cert.filename}`;
            img.alt = cert.title;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '70vh';
            img.style.objectFit = 'contain';
            lightboxMediaContainer.appendChild(img);
        }

        lightboxCaption.innerHTML = `<strong>${cert.title}</strong> — Verified by ${cert.issuer}`;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxMediaContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigation arrows inside Lightbox
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIdx = currentCertIndex - 1;
            if (newIdx < 0) newIdx = certificatesList.length - 1;
            openLightbox(newIdx);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIdx = (currentCertIndex + 1) % certificatesList.length;
            openLightbox(newIdx);
        });
    }

    // Keyboard controls for modals
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') lightboxNext.click();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
        }
        if (projectModal && projectModal.classList.contains('active')) {
            if (e.key === 'Escape') closeProjectModal();
        }
    });


    /* ====================================================
       CRYPTOGRAPHIC FORM TRANSMISSION LOGGER
       ==================================================== */
    const contactForm = document.getElementById('contact-form');
    const formLogger = document.getElementById('form-logger');
    const loggerStatus = document.getElementById('logger-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && formLogger && loggerStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const callerName = document.getElementById('form-name').value;
            const callerEmail = document.getElementById('form-email').value;
            const callerSubject = document.getElementById('form-subject').value;

            // Start logger animation simulation
            submitBtn.disabled = true;
            contactForm.style.opacity = '0.5';
            contactForm.style.pointerEvents = 'none';

            function updateLog(text, isSuccess = false, isLoading = false) {
                const line = document.createElement('div');
                line.className = `logger-line ${isSuccess ? 'success' : ''} ${isLoading ? 'loading' : ''}`;
                line.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}`;
                formLogger.appendChild(line);
                formLogger.scrollTop = formLogger.scrollHeight;
            }

            // Step 1: Input Validation
            updateLog(`Incoming transmission from ${callerName} (${callerEmail})...`);
            updateLog(`Verifying authentication tokens & validating payload formats...`, false, true);

            setTimeout(() => {
                // Step 2: Encrypting
                updateLog(`Input fields validated successfully.`, true);
                updateLog(`Encrypting communication packet...`);
                updateLog(`Generating 256-bit AES cryptographic session key...`, false, true);

                setTimeout(() => {
                    updateLog(`Payload cipher text blocks created: AES-256-CBC mode active.`, true);
                    updateLog(`Establishing TCP secure handshake with SMTP gateway...`, false, true);

                    setTimeout(() => {
                        updateLog(`Secure SSL/TLS channel configured. Tunnel: open.`, true);
                        updateLog(`Transmitting cipher block stream packets...`);
                        updateLog(`Sending subject: "${callerSubject}"...`, false, true);

                        setTimeout(() => {
                            // Step 4: Finished
                            updateLog(`Data packet transmitted successfully to SMTP server destination!`, true);
                            updateLog(`SYSTEM RESPONSE: [200 OK] Connection closed securely.`, true);
                            
                            // Reset form elements
                            contactForm.reset();
                            contactForm.style.opacity = '1';
                            contactForm.style.pointerEvents = 'auto';
                            submitBtn.disabled = false;
                            
                            // Display final feedback popup or alert
                            alert("Message transmitted securely! Mohammad will respond shortly.");
                        }, 1200);

                    }, 1200);

                }, 1000);

            }, 1000);
        });
    }

});
