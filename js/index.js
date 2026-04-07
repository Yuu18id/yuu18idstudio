// Initialize AOS
AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar scroll effect
const navbar = document.querySelector('#mainNavbar');
const navLinks = document.querySelectorAll('.nav-link');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 20, 33, 0.95)';
    } else {
        navbar.style.background = 'rgba(13, 20, 33, 0.9)';
    }
}

window.addEventListener('scroll', updateNavbar);

// Active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.portfolio-filter .btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === '*' || category === filter) {
                item.style.display = 'block';
                // Re-trigger AOS animation
                setTimeout(() => {
                    item.classList.add('aos-animate');
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio modal functionality
const portfolioModal = document.getElementById('portfolioModal');
const modalTitle = portfolioModal.querySelector('.modal-title');
const modalImage = portfolioModal.querySelector('#modalImage');
let skinViewer = null;
const SKINS = {
    serana: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAApSSURBVHic5VpvbBTHFf+tOQw9NfTcm9o5jNxW9Z+TrPNJJ1V1IBGyQSbImAISIBUq20j9QKmSVgbVX6qq6qeKoDZSSfqpbVRRJeEDtGBFWMUWKg6uKp1iX6jONp+u2MeRvUAC2sYE2H5Yv/Xs7pvdvbOpIP1J1p7nzbyZN/PmzXtvRkMAMqm0KYSArusQQgCA/VvXdcdvjl4ozmtBfQShp2ubOTp+WVOVZVJpM5ubctC5Mg6RoAqyUAQSkGjyZLjbFYrzQV34ghMeAEbHL2s9XdtMXdfBCZrNTWlhJiFwhjKptCkLJoME98NqaMCTRFUaQOUy7e+nf+Wgv3TspxBCrFgDnjQCJ8Ct2nI5fT9//BlQJxz0zx9/FqgdTwNqVspACIHJt894yiffPmNryNOM0BMgCyP/9lvlZ0EDIuOn93+569jZ+6oKsqVXlt1ZErTO+f9q2gCy+MSXOxmqQWTod7P3erq2Oc5uQhgVFkJg789POv6XfYIgPyKbm9JUR91KIPP08yPYLaASXGUQ/doEIZNKBwqfSaVNd/9UpsLo+GUtk0qbKv5E95wC8krJZe7/VfUqnYgw3pqq/5XyzuamNMcEcB0Rzv3iBADrfFfVV5WFoXGQV14WRghhyvQwk6hCjWrPuwfbefRV28gVb9900Px4uGlhTxAZbm8ym5vSVsvDZG0ADax4+yaKt29i6EAf9pTKwB3L49tTKmPoQJ9Nl9usJrK5Kc1vdYPoYWBPgJ8ArwwPY/jwYUsD6gSGDx/GK8PDyvpBW0P+3ZRoVBozMmLV0psSjaYf/6ZEo1kjD8g98ET9JiTqN6Fw7Sqw7+Vlwr6XUbh21abL4HjJZW56oTivqYSgFeboFOmpNCCTSpuF4rym4k90T+OurVtMAMjn8wCAnp27HQMeuXjBV+USDXEzUb/JPhFoi8g+Rne6zcGT7MLY1AyKpbIv/1R7m8Mhuvjb14E7Or6+73BVW8FzDEajUd9vEKLRKNaur8Ha9TX45P7HjvZBvK1vOZC/h+diuLFxqBn/9Y9jVbf+AiDS9ZPf3JULDMPw/QbBMAz7b/LN1wFYRyiVrbQPNx/DMICQY+MQ6dq6xSSV4gYw+t5fIdMTDXETAJLJJADLVvi15zA5929HfbGoOVxc2X4IIZT8dV1H95EfAIA9LsCyDbnrM6FsQkTXdU8HzS3NvukuIQRidTHcmLuB7nSbp/3CkkCdR191tOlojAOAsj45SrKxXFjUPPWFEKi995GL15cAAA+e+9pSjzNh5EekozHuYaIX5qDramOk6zo2rjPR0SgwNjXjGWAymfSkzADLynMTQNokh9lCCIxNfcDWlxGN/sdF8zeingmYni97mDS3tDjU0g0hBKJNzZieu8GqqMoRIgG5+kSjVBpNgop/c0szy+vG0piKpYlwE6DqIFYXQ6wuxnYiD1plA/wiyjD1c//6gC0HgI7GOPTCHDFz8OpoFFhYDBacwCZFm6JrAAAF4xHbiOiqjrhMcpBNUdXnbFRe19H5QicAyT9Zoo1dm6woJI/E6mI2k9p1tRYv+McGBeORZQgV/gcnbNAEqOo3fbPVMwGZb2/Gp3dvs7x6du6GruvIXQ9pBDfE6u0OIrVWB5/evQ0hBB48tGIlN7028hgAsCFWzzJ1J0yCIkV3/aCU+q1paX+7JscozCGysc23PxmsDeCuumRsiNXbg+3Zudtuf/XK3zyCyaA2L27d7ugv+8/32fo9O3ezRvDWg2VLz9mT55NJjFy8ECC6BdYPqGTF5AGSZZ5c2ody0KJL+5YmQlZpIQT+/KffAwC+9/0jvuk1Mr7cBNCRGhasBsiCqgZA3w/H/uJp39EYR7Sp2Z4QANi4zoSxZLk/1Oc9/Ynu79qRJ2Cp+a2lPirxNHVdB0ImZ7Zv336X1QCbkU8ntKqcH9GdbgOMOw4NiAohOULe+remJ+z6D21HaAZiUfPUpxDY4uUae53Arh8te6B+wv9j+tRXAisCQP/AoNm7q883Df2sIjBgOPrDY3ZmFgDOvvvOU33dXSlWfDn6f4Ev9Bbg8gHjVyY0Ob7mjGSxVNa6tm4xx69MOLZEoiFuFktljb6qMr/6TYlGs1CcZ+vLbTiB/GgclKdAkOtaLJVZuty5PIluGqE73YYzo5YjlGpvMxP1m+wzfikfwCZsVNFeMplEMgnPwqigHerZ7OmAjjcCN4COxjiEEDgz+r5nRZPJJHsbnM/nPZNA9fP5PJLJJNbWrLfrU0Tonw/gaWG1gM0H5K7PanL62Q0hBC5lZ7RUu+axC8VSWRNCN3PXZ7SurdYdXu76jJZqB6uaVJ/LByzX90tyVJYAcWPVjzRSe3dGyL5uYzSAyulOQrZByWTSs8rjVya0HZlWE/BqwKXsLGubVGDzAYd6NpsAPOodlk6C0yBS7W2myqbQhMgaR0bQ4qV7tmiiIW5Gm1oAePMBifmyUnM5PDGnJtXeZlJmVv7thmwzCJ98fB/fav0GazMIe/f0shpw7vxIRTJF+gcGPTP81h//oAEAnf1uOl2P9Q8MmlRXFohWO9XeZnuRtMJugcgGcPmAYqms9e7q84xv5OIFzVCkxGjcQVd49gRw0dbQ8ROmXz6gf2DQVIWqlkDC4T7LNI6XKh9A/bjHF3tQVvooh3qEWUk+YNWxd0+v6T7/AUszSG3d6B8YNIeOnzATDXEz0RA3h46fMPsHBv8nnmdk6PgJ1g+Qv1zGiL6nXjvpWFWjMIdiqay5hT13fkQzCnMeoXZkWs1b0xN4KzurkdCnXjup7ci0mjsyrawGhBmbykC7oQHLEd+bb5y297au6/Ze33/goAksR4K9u/pMIQTc+x+wVpquv2kQdGpw199B9bkJCLr28jO67AQEwU9gN9x3h9HnvgpgeWWCeMh+xMVf/sxOcIQVqFIEhsP7Dxw06R6eNMUPVFf1V237J4UV5wOe9fcFgc/lz777jta7q880DINV36D3BViz3vl/ADx3/+uM0G2rgZZoiCvCzWXfvJp8gZye5ugU8qrofhepND6VUJXkC1gNcMf71eQL6P0A115+f8Bdzy/f8fPHXO29j1AsqaNAygmoxi7nEpQaQPE+x6SSfEG17YNocrZpJe2VGiDH+9XkC+j9ANdefn/Q+UKn8o6fE4DeBpw7PyIJUn2+YMVn60svfke5ApE11vy66Q8fPbTrRI07rJovLGps243rTOi6jkvZWQ2wPElVToBrT7kEav9E8gFB7wfk9wfRphbfO37l24DsrEVn2ss5AWUuYak9OwFBfnQQ3f1+oNL3B3THzwng9zaAUCyVNT8jCcA+wSKqeBuwYgJuEKp8ger9gN/7A6MwU9Edv+NtwFJdVU6AG7sjlwCFBrjj/UrzBfL7Aa69/P5AFe09T7GE8m3ArM1LlRPg2i/nEqz2KzaCnAYRgpwZAHi4wD+zIw3wGNCFGeTzedsIrhTsFpDjfT8Bwrwf4NoTVO3lO/6gtwHcKeCnfcSfJjBUvO+XL1BpQJhBAMAbRw763vG7aWGfx1M+MiiX8F9sUUun3CI+JwAAAA5lWElmTU0AKgAAAAgAAAAAAAAA0lOTAAAAAElFTkSuQmCC",
};

// Setup event listener untuk semua skin elements (hanya sekali)
document.querySelectorAll('.skin').forEach(skinEl => {
    skinEl.addEventListener('click', (e) => {
        const key = e.currentTarget.dataset.skin;

        // Simpan data skin untuk digunakan di modal
        portfolioModal.setAttribute('data-current-skin', key);
    });
});

portfolioModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget; // Ambil element yang trigger modal
    const key = trigger.dataset.skin;    // Ambil data langsung dari trigger
    const skin = SKINS[key];

    // Hapus instance lama
    cleanupSkinViewer();

    // Buat instance baru
    skinViewer = new skinview3d.SkinViewer({
        canvas: document.getElementById("skin_container"),
        width: 500,
        height: 400,
        skin: skin
    });
});

// Event ketika modal ditutup
portfolioModal.addEventListener('hidden.bs.modal', event => {
    cleanupSkinViewer();
});

// Fungsi untuk membersihkan SkinViewer
function cleanupSkinViewer() {
    if (skinViewer) {
        if (typeof skinViewer.dispose === 'function') {
            skinViewer.dispose();
        } else {
            // Fallback untuk cleanup manual
            if (skinViewer.animation) skinViewer.animation.stop();
            if (skinViewer.renderer) skinViewer.renderer.dispose();
        }
        skinViewer = null;
    }

    // Bersihkan canvas
    const canvas = document.getElementById("skin_container");
    if (canvas) {
        canvas.width = canvas.width; // Reset canvas
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Minecraft-style interactions
document.querySelectorAll('.minecraft-hover').forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    element.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add pixelated cursor effect
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
                position: fixed;
                width: 16px;
                height: 16px;
                background: var(--accent-green);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.2s;
                image-rendering: pixelated;
                border-radius: 2px;
                box-shadow: 0 0 10px var(--accent-green);
            `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 8 + 'px';
        cursor.style.top = e.clientY - 8 + 'px';
        cursor.style.opacity = '0.5';
    });

    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
});

// Pixel rain effect
function createPixelRain() {
    const colors = ['var(--accent-green)', 'var(--accent-blue)', 'var(--accent-gold)'];
    const pixel = document.createElement('div');
    pixel.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 1;
                opacity: 0.6;
                image-rendering: pixelated;
                top: -10px;
                left: ${Math.random() * 100}vw;
            `;
    document.body.appendChild(pixel);

    const fallSpeed = Math.random() * 3 + 2;
    const fallAnimation = pixel.animate([
        { transform: 'translateY(-10px)' },
        { transform: `translateY(${window.innerHeight + 10}px)` }
    ], {
        duration: fallSpeed * 1000,
        easing: 'linear'
    });

    fallAnimation.addEventListener('finish', () => {
        pixel.remove();
    });
}

// Trigger pixel rain occasionally
setInterval(() => {
    if (Math.random() < 0.3) {
        createPixelRain();
    }
}, 500);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.hero-stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 50);
    });
}

// Trigger stats animation when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('hero-stats')) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
});

// Block break sound effect simulation (visual feedback)
document.querySelectorAll('.portfolio-item, .service-card, .testimonial-card').forEach(item => {
    item.addEventListener('click', function () {
        this.style.animation = 'blockBreak 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// Add minecraft-style tooltips
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border: 2px solid var(--accent-green);
                border-radius: 4px;
                font-family: 'Press Start 2P', cursive;
                font-size: 10px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                image-rendering: pixelated;
            `;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });

    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
    });
}

// Add tooltips to social links
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-links a');
    const tooltipTexts = ['Discord Server', 'Twitter Updates', 'Instagram Gallery', 'YouTube Tutorials'];

    socialLinks.forEach((link, index) => {
        if (tooltipTexts[index]) {
            createTooltip(link, tooltipTexts[index]);
        }
    });
});