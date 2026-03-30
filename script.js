// Tab System
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Particle System
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        document.getElementById('particles').appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 9000);
    }

    // Generate 3-5 particles per second
    setInterval(createParticle, 250);
    createParticle(); // Initial particle

    // Skill filtering
    document.querySelectorAll('.skill-card, .tag').forEach(card => {
        card.addEventListener('click', function() {
            const skills = this.dataset.skills || this.textContent.trim();
            filterBySkill(skills);
        });
    });

    // Smooth animations for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });

    // Console Easter Egg
    console.log('%cSkillsHub Pro Loaded! Edit script.js to customize.', 
        'color: #ffd700; font-size: 18px; font-weight: bold;');
});

function filterBySkill(skill) {
    // Highlight matching cards
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        if (card.dataset.skills?.includes(skill.toLowerCase())) {
            card.style.borderColor = '#ffd700';
            card.style.boxShadow = '0 0 30px rgba(255,215,0,0.6)';
        } else {
            card.style.borderColor = 'rgba(255,255,255,0.2)';
            card.style.boxShadow = 'none';
        }
    });
    
    // Show toast
    showToast(`${skill} projects highlighted!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 100px; right: 30px; 
        background: rgba(0,0,0,0.8); backdrop-filter: blur(20px);
        color: #ffd700; padding: 20px 30px; border-radius: 15px;
        font-weight: 600; z-index: 1000; transform: translateX(400px);
        transition: all 0.4s; border-left: 5px solid #ffd700;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}