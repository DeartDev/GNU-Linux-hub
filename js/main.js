/**
 * GNU/Linux Hub - JavaScript Principal
 * Autor: TerWorks - DeartDev
 * Año: 2026
 * 
 * Funcionalidades:
 * - Navegación responsive con menú hamburguesa
 * - Toggle de tema claro/oscuro con persistencia
 * - Botones flotantes (toTop + refresh)
 * - Efecto typewriter
 * - Tabs para categorías de distros
 * - Acordeón FAQ
 * - Copiar comandos al portapapeles
 * - Smooth scroll y scroll spy
 * - Animaciones al hacer scroll
 */

// ============================================
// UTILIDADES
// ============================================

/**
 * Debounce para optimizar event listeners
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Mostrar notificación toast
 */
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ============================================
// NAVEGACIÓN Y HEADER
// ============================================

const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle del menú móvil
 */
function initMobileMenu() {
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;
        
        // Ocultar/mostrar header al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Shadow cuando hay scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, 10));
}

// ============================================
// TOGGLE DE TEMA
// ============================================

const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-footer');

/**
 * Inicializar tema
 */
function initTheme() {
    // Obtener tema guardado o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Event listeners para los toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
    });
}

/**
 * Cambiar tema
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    showToast(`Tema cambiado a ${newTheme === 'light' ? 'claro' : 'oscuro'}`);
}

// ============================================
// BOTONES FLOTANTES
// ============================================

const floatingButtons = document.getElementById('floating-buttons');
const topBtn = document.getElementById('top-btn');
const refreshBtn = document.getElementById('refresh-btn');

/**
 * Inicializar botones flotantes
 */
function initFloatingButtons() {
    if (!floatingButtons) return;
    
    // Mostrar/ocultar botones al hacer scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            floatingButtons.classList.add('visible');
        } else {
            floatingButtons.classList.remove('visible');
        }
    }, 50));
    
    // Botón "To Top"
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Botón Refresh
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            // Añadir clase de animación
            refreshBtn.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                // Recargar página forzando limpieza de caché
                location.reload(true);
            }, 300);
        });
    }
}

// ============================================
// EFECTO TYPEWRITER
// ============================================

const typewriterElement = document.querySelector('.typewriter');

/**
 * Efecto de escritura carácter por carácter
 */
function initTypewriter() {
    if (!typewriterElement) return;
    
    const text = typewriterElement.getAttribute('data-text');
    if (!text) return;
    
    typewriterElement.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Iniciar después de un breve delay
    setTimeout(type, 500);
}

// ============================================
// SMOOTH SCROLL Y SCROLL SPY
// ============================================

/**
 * Smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = header ? header.offsetHeight : 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll spy - resaltar sección activa
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Actualizar nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ============================================
// TABS - TOP DISTROS
// ============================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

/**
 * Inicializar tabs
 */
function initTabs() {
    if (!tabBtns.length || !tabPanels.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Desactivar todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Activar seleccionado
            btn.classList.add('active');
            const panel = document.getElementById(`tab-${tabId}`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

// ============================================
// FAQ ACORDEÓN
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

/**
 * Inicializar FAQ acordeón
 */
function initFAQ() {
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los demás (comportamiento acordeón)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle actual
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });
}

// ============================================
// COPIAR COMANDOS
// ============================================

const copyButtons = document.querySelectorAll('.cmd-copy');

/**
 * Inicializar botones de copiar
 */
function initCopyCommands() {
    if (!copyButtons.length) return;
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            
            const row = btn.closest('.cmd-row');
            if (!row) return;
            
            const cmdCode = row.querySelector('.cmd-code');
            if (!cmdCode) return;
            
            // Limpiar el comando de tags HTML
            const command = cmdCode.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(command);
                showToast('¡Comando copiado!');
                
                // Feedback visual
                btn.textContent = '✓';
                setTimeout(() => {
                    btn.textContent = '📋';
                }, 2000);
            } catch (err) {
                showToast('Error al copiar', 2000);
            }
        });
    });
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

/**
 * Inicializar animaciones con Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.info-card, .timeline-item, .philosophy-card, .distro-card, .use-case-card, .cmd-category, .faq-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para elementos múltiples
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ============================================
// ÁRBOL DE DISTROS - INTERACTIVO
// ============================================

const distroFamilies = document.querySelectorAll('.distro-family');

/**
 * Animación hover para el árbol de distros
 */
function initDistroTree() {
    if (!distroFamilies.length) return;
    
    distroFamilies.forEach(family => {
        family.addEventListener('mouseenter', () => {
            family.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        family.addEventListener('mouseleave', () => {
            family.style.transform = '';
        });
    });
}

// ============================================
// EFECTO DE PARTÍCULAS EN HERO
// ============================================

/**
 * Crear partículas sutiles en el hero (opcional)
 */
function initParticles() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    
    // Crear canvas para partículas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.3';
    canvas.style.pointerEvents = 'none';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 25;
    
    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function init() {
        resize();
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', resize);
}

// ============================================
// TECLAS RÁPIDAS
// ============================================

/**
 * Atajos de teclado
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K para búsqueda (placeholder)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Aquí se podría implementar búsqueda
        }
        
        // Escape para cerrar menú móvil
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// QUIZ INTERACTIVO - ¿Qué distro eres?
// ============================================

const quizQuestions = [
    {
        id: 1,
        question: "¿Cuál es tu nivel de experiencia con computadoras?",
        icon: "💻",
        options: [
            { text: "Soy principiante, uso Windows/macOS", value: "beginner", scores: { ubuntu: 3, mint: 3, zorin: 3 } },
            { text: "Intermedio, me defiendo bien", value: "intermediate", scores: { fedora: 3, manjaro: 3, popos: 3 } },
            { text: "Avanzado, me gusta la terminal", value: "advanced", scores: { arch: 3, debian: 2, gentoo: 1 } },
            { text: "Experto, compilo mi propio kernel", value: "expert", scores: { arch: 3, gentoo: 3, nixos: 2 } }
        ]
    },
    {
        id: 2,
        question: "¿Para qué usarás principalmente Linux?",
        icon: "🎯",
        options: [
            { text: "Uso cotidiano y productividad", value: "daily", scores: { ubuntu: 3, mint: 3, fedora: 2 } },
            { text: "Desarrollo de software", value: "dev", scores: { fedora: 3, popos: 3, manjaro: 2 } },
            { text: "Gaming y entretenimiento", value: "gaming", scores: { popos: 3, manjaro: 3, nobara: 3 } },
            { text: "Servidores y sistemas", value: "server", scores: { debian: 3, rhel: 3, arch: 2 } }
        ]
    },
    {
        id: 3,
        question: "¿Qué tan potente es tu hardware?",
        icon: "⚙️",
        options: [
            { text: "PC moderno y potente", value: "high", scores: { fedora: 3, ubuntu: 2, popos: 3 } },
            { text: "PC medio, de hace unos años", value: "medium", scores: { mint: 3, manjaro: 2, fedora: 2 } },
            { text: "PC básico o antiguo", value: "low", scores: { lubuntu: 3, xfce: 3, antiX: 2 } },
            { text: "No lo sé / No importa", value: "unknown", scores: { ubuntu: 3, mint: 3, manjaro: 2 } }
        ]
    },
    {
        id: 4,
        question: "¿Te gusta personalizar y configurar todo?",
        icon: "🎨",
        options: [
            { text: "No, quiero que funcione de una", value: "no", scores: { mint: 3, ubuntu: 3, zorin: 3 } },
            { text: "Un poco, las opciones básicas", value: "little", scores: { fedora: 3, popos: 2, manjaro: 2 } },
            { text: "Sí, me gusta modificar todo", value: "yes", scores: { arch: 3, kde: 3, manjaro: 2 } },
            { text: "Quiero control total del sistema", value: "total", scores: { arch: 3, gentoo: 3, nixos: 3 } }
        ]
    },
    {
        id: 5,
        question: "¿Cuánto tiempo tienes para resolver problemas?",
        icon: "⏱️",
        options: [
            { text: "Ninguno, necesito estabilidad", value: "none", scores: { debian: 3, mint: 3, rhel: 2 } },
            { text: "Poco, prefiero cosas probadas", value: "little", scores: { ubuntu: 3, mint: 2, fedora: 2 } },
            { text: "Moderado, puedo googlear", value: "moderate", scores: { manjaro: 3, popos: 2, fedora: 2 } },
            { text: "Mucho, disfruto solucionando", value: "lots", scores: { arch: 3, gentoo: 3, nixos: 2 } }
        ]
    },
    {
        id: 6,
        question: "¿Qué tan importante es el software más reciente?",
        icon: "🔄",
        options: [
            { text: "No importa, prefiero estabilidad", value: "stable", scores: { debian: 3, mint: 3, rhel: 3 } },
            { text: "Moderado, pero actualizado", value: "moderate", scores: { ubuntu: 3, fedora: 2, opensuse: 2 } },
            { text: "Importante, quiero lo último", value: "important", scores: { fedora: 3, manjaro: 3, arch: 2 } },
            { text: "Crítico, siempre bleeding-edge", value: "critical", scores: { arch: 3, gentoo: 2, tumbleweed: 3 } }
        ]
    }
];

const distroResults = {
    ubuntu: {
        name: "Ubuntu",
        tagline: "La distro más popular para principiantes",
        icon: "🟠",
        description: "Ubuntu es la puerta de entrada perfecta al mundo Linux. Con su interfaz limpia, comunidad masiva y documentación infinita, nunca estarás solo. Es la elección de millones de usuarios y empresas worldwide.",
        difficulty: "easy",
        resources: "medium",
        pros: [
            "Documentación extensa y comunidad gigante",
            "Software y drivers funcionan out-of-the-box",
            "Ciclos de release predecibles (LTS cada 2 años)",
            "Compatible con la mayoría de hardware"
        ],
        url: "https://ubuntu.com/download",
        alternatives: ["mint", "popos", "fedora"]
    },
    mint: {
        name: "Linux Mint",
        tagline: "Elegancia y familiaridad desde el inicio",
        icon: "🌿",
        description: "Linux Mint toma lo mejor de Ubuntu y lo mejora con una interfaz más tradicional y familiar para usuarios de Windows. Viene con todos los codecs multimedia incluidos y una experiencia pulida sin configuración adicional.",
        difficulty: "easy",
        resources: "low",
        pros: [
            "Interfaz similar a Windows, sin curva de aprendizaje",
            "Codecs multimedia preinstalados",
            "Gestor de actualizaciones conservador y seguro",
            "Excelente para hardware antiguo y moderno"
        ],
        url: "https://linuxmint.com/download.php",
        alternatives: ["ubuntu", "zorin", "popos"]
    },
    fedora: {
        name: "Fedora Workstation",
        tagline: "Innovación libre y software de vanguardia",
        icon: "🔵",
        description: "Fedora es el laboratorio de Red Hat donde se prueban las tecnologías del futuro. Es la elección de desarrolladores y entusiastas que quieren lo último en software libre sin sacrificar estabilidad.",
        difficulty: "medium",
        resources: "medium",
        pros: [
            "Software más reciente sin ser inestable",
            "Excelente para desarrollo de software",
            "SELinux integrado para mayor seguridad",
            "Containers y virtualización nativos"
        ],
        url: "https://getfedora.org/",
        alternatives: ["popos", "manjaro", "ubuntu"]
    },
    popos: {
        name: "Pop!_OS",
        tagline: "Productividad y gaming optimizados",
        icon: "🚀",
        description: "Desarrollada por System76, Pop!_OS está diseñada para maximizar la productividad. Incluye soporte NVIDIA out-of-the-box, tiling window manager integrado y optimizaciones para desarrollo y gaming.",
        difficulty: "easy",
        resources: "medium",
        pros: [
            "Soporte NVIDIA sin configuración",
            "Tiling window manager integrado",
            "Stacks para organización de ventanas",
            "Optimizada para laptops y desktops System76"
        ],
        url: "https://pop.system76.com/",
        alternatives: ["ubuntu", "fedora", "mint"]
    },
    manjaro: {
        name: "Manjaro",
        tagline: "El poder de Arch sin la complejidad",
        icon: "⛰️",
        description: "Manjaro te da acceso al universo Arch Linux con instaladores amigables y configuración automática. Obtén software actualizado sin compilar nada y acceso al Arch User Repository (AUR) masivo.",
        difficulty: "medium",
        resources: "medium",
        pros: [
            "Rolling release con estabilidad",
            "Acceso al enorme Arch User Repository",
            "Gestores de kernels gráficos",
            "Hardware detection automática"
        ],
        url: "https://manjaro.org/download/",
        alternatives: ["arch", "fedora", "popos"]
    },
    arch: {
        name: "Arch Linux",
        tagline: "Keep It Simple, Stupid",
        icon: "🏗️",
        description: "Arch Linux es para quienes quieren construir su sistema desde cero. Comienzas con una terminal y vas añadiendo exactamente lo que necesitas. La mejor documentación del mundo Linux (Arch Wiki) es tu guía.",
        difficulty: "hard",
        resources: "low",
        pros: [
            "Rolling release con lo último siempre",
            "Control total de cada componente",
            "Arch Wiki: la biblia de Linux",
            "Sin bloatware, solo lo que instalas"
        ],
        url: "https://archlinux.org/download/",
        alternatives: ["manjaro", "endeavouros", "artix"]
    },
    debian: {
        name: "Debian",
        tagline: "La roca madre universal",
        icon: "🔴",
        description: "Debian es el estándar de estabilidad en Linux. Funciona en cualquier arquitectura, dura años sin reiniciarse y es la base de Ubuntu y cientos de otras distros. Perfecto para servidores y sistemas críticos.",
        difficulty: "medium",
        resources: "low",
        pros: [
            "Estabilidad extrema probada por décadas",
            "Repositorios masivos con 60,000+ paquetes",
            "Ciclos de release de 2 años probados",
            "100% software libre por defecto"
        ],
        url: "https://www.debian.org/distrib/",
        alternatives: ["ubuntu", "mint", "devuan"]
    },
    gentoo: {
        name: "Gentoo",
        tagline: "Velocidad infinita, paciencia requerida",
        icon: "🐧",
        description: "Gentoo es Linux en su forma más pura y potente. Compilas TODO desde fuentes optimizadas para TU hardware específico. El resultado es un sistema extremadamente rápido y personalizado.",
        difficulty: "hard",
        resources: "medium",
        pros: [
            "Optimización extrema para tu hardware",
            "USE flags para control granular",
            "Aprendizaje profundo de Linux",
            "Sin dependencias innecesarias"
        ],
        url: "https://www.gentoo.org/downloads/",
        alternatives: ["arch", "funtoo", "clear"]
    },
    nixos: {
        name: "NixOS",
        tagline: "Reproducible y declarativo",
        icon: "❄️",
        description: "NixOS revoluciona la administración de sistemas con configuración puramente declarativa. Tu sistema entero se define en un archivo, es 100% reproducible y los rollbacks son instantáneos.",
        difficulty: "hard",
        resources: "medium",
        pros: [
            "Configuración declarativa del sistema",
            "Rollbacks atómicos instantáneos",
            "Entornos de desarrollo reproducibles",
            "Gestión de paquetes funcional pura"
        ],
        url: "https://nixos.org/download/",
        alternatives: ["arch", "guix", "gentoo"]
    },
    rhel: {
        name: "RHEL",
        tagline: "El estándar empresarial",
        icon: "🔴",
        description: "Red Hat Enterprise Linux es lo que usan las Fortune 500. Soporte de 10 años, certificaciones de hardware/software y el respaldo de IBM. El estándar de facto para servidores corporativos.",
        difficulty: "medium",
        resources: "high",
        pros: [
            "Soporte empresarial de 10 años",
            "Certificaciones de hardware exhaustivas",
            "SELinux enterprise-grade",
            "Ecosistema OpenShift/Kubernetes"
        ],
        url: "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
        alternatives: ["rocky", "almalinux", "oracle"]
    }
};

let currentQuestion = 0;
let answers = [];
let quizScores = {};

/**
 * Inicializar el Quiz
 */
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    // Inicializar scores
    Object.keys(distroResults).forEach(key => {
        quizScores[key] = 0;
    });
    
    // Event Listeners
    document.getElementById('start-quiz')?.addEventListener('click', startQuiz);
    document.getElementById('next-question')?.addEventListener('click', nextQuestion);
    document.getElementById('prev-question')?.addEventListener('click', prevQuestion);
    document.getElementById('restart-quiz')?.addEventListener('click', restartQuiz);
}

/**
 * Iniciar el quiz
 */
function startQuiz() {
    currentQuestion = 0;
    answers = [];
    
    // Resetear scores
    Object.keys(quizScores).forEach(key => {
        quizScores[key] = 0;
    });
    
    // Ocultar pantalla de inicio, mostrar preguntas
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    
    renderQuestion();
    updateProgress();
}

/**
 * Renderizar pregunta actual
 */
function renderQuestion() {
    const question = quizQuestions[currentQuestion];
    const container = document.getElementById('question-container');
    
    container.innerHTML = `
        <div class="question-card">
            <span class="question-icon">${question.icon}</span>
            <span class="question-number">PREGUNTA ${question.id}</span>
            <h3 class="question-text">${question.question}</h3>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <button class="option-btn ${answers[currentQuestion] === index ? 'selected' : ''}" 
                            data-index="${index}"
                            onclick="selectOption(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Actualizar botones de navegación
    document.getElementById('prev-question').disabled = currentQuestion === 0;
    document.getElementById('next-question').disabled = answers[currentQuestion] === undefined;
    document.getElementById('next-question').innerHTML = 
        currentQuestion === quizQuestions.length - 1 
            ? 'Ver Resultado <span class="btn-icon">✓</span>' 
            : 'Siguiente <span class="btn-icon">→</span>';
}

/**
 * Seleccionar opción
 */
window.selectOption = function(index) {
    answers[currentQuestion] = index;
    
    // Añadir puntos
    const question = quizQuestions[currentQuestion];
    const selectedOption = question.options[index];
    
    Object.entries(selectedOption.scores).forEach(([distro, points]) => {
        if (quizScores[distro] !== undefined) {
            quizScores[distro] += points;
        }
    });
    
    // Actualizar UI
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    
    document.getElementById('next-question').disabled = false;
};

/**
 * Siguiente pregunta
 */
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

/**
 * Pregunta anterior
 */
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        updateProgress();
    }
}

/**
 * Actualizar barra de progreso
 */
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestion + 1;
}

/**
 * Mostrar resultados
 */
function showResults() {
    // Encontrar ganador
    const winner = Object.entries(quizScores)
        .sort((a, b) => b[1] - a[1])[0][0];
    
    const result = distroResults[winner];
    
    // Ocultar preguntas, mostrar resultado
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    // Llenar datos del resultado
    document.getElementById('result-icon').textContent = result.icon;
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-tagline').textContent = result.tagline;
    document.getElementById('result-description').textContent = result.description;
    
    // Dificultad
    const diffBar = document.getElementById('difficulty-bar');
    diffBar.innerHTML = `<div class="stat-fill ${result.difficulty}"></div>`;
    document.getElementById('difficulty-text').textContent = 
        result.difficulty === 'easy' ? 'Fácil' : 
        result.difficulty === 'medium' ? 'Medio' : 'Difícil';
    
    // Recursos
    const resBar = document.getElementById('resources-bar');
    resBar.innerHTML = `<div class="stat-fill ${result.resources}"></div>`;
    document.getElementById('resources-text').textContent = 
        result.resources === 'low' ? 'Bajo' : 
        result.resources === 'medium' ? 'Medio' : 'Alto';
    
    // Pros
    const prosList = document.getElementById('result-pros');
    prosList.innerHTML = result.pros.map(pro => `<li>${pro}</li>`).join('');
    
    // Link de descarga
    const downloadLink = document.getElementById('result-download');
    downloadLink.href = result.url;
    
    // Alternativas
    const altContainer = document.getElementById('alt-distro-list');
    altContainer.innerHTML = result.alternatives.map(alt => {
        const altDistro = distroResults[alt];
        return `
            <div class="alt-distro">
                <span class="alt-distro-name">${altDistro?.name || alt}</span>
                <span class="alt-distro-reason">Alternativa similar</span>
            </div>
        `;
    }).join('');
    
    // Scroll al resultado
    document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Reiniciar quiz
 */
function restartQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
    
    // Resetear todo
    currentQuestion = 0;
    answers = [];
    Object.keys(quizScores).forEach(key => {
        quizScores[key] = 0;
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializar todas las funcionalidades
 */
function init() {
    // Verificar que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Inicializar todas las funciones
    initMobileMenu();
    initHeaderScroll();
    initTheme();
    initFloatingButtons();
    initTypewriter();
    initSmoothScroll();
    initScrollSpy();
    initTabs();
    initFAQ();
    initCopyCommands();
    initScrollAnimations();
    initDistroTree();
    initKeyboardShortcuts();
    initQuiz();
    
    // Opcional: partículas (descomentar si se desea)
    // initParticles();
    
    // Log de bienvenida
    console.log('%cGNU/Linux Hub', 'font-size: 24px; font-weight: bold; color: #00ffff;');
    console.log('%cBienvenido al portal del software libre 🐧', 'font-size: 14px; color: #00ff88;');
    console.log('%c2026 - TerWorks - DeartDev', 'font-size: 12px; color: #ffd700;');
}

// Iniciar la aplicación
init();

// Exportar funciones útiles para debugging
window.LinuxHub = {
    toggleTheme,
    showToast
};