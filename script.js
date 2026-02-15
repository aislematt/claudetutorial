// Toggle lesson content open/closed
function toggleLesson(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.lesson-toggle');
    const isActive = content.classList.contains('active');

    // Close all other lessons
    document.querySelectorAll('.lesson-content.active').forEach(el => {
        el.classList.remove('active');
        el.previousElementSibling.querySelector('.lesson-toggle').textContent = '+';
    });

    // Toggle current
    if (!isActive) {
        content.classList.add('active');
        toggle.textContent = '−';
    }
}

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const original = button.textContent;
        button.textContent = 'Copied!';
        button.style.color = '#4caf50';
        setTimeout(() => {
            button.textContent = original;
            button.style.color = '';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const original = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => { button.textContent = original; }, 2000);
    });
}

// Mobile nav toggle
function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Auto-open first lesson on page load if navigated via "Start Learning"
window.addEventListener('load', () => {
    if (window.location.hash === '#lesson-0') {
        const firstLesson = document.querySelector('#lesson-0 .lesson-header');
        if (firstLesson) {
            setTimeout(() => toggleLesson(firstLesson), 300);
        }
    }
});
