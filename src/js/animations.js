// ============================================
// 滚动动画系统
// ============================================

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

// ============================================
// Intersection Observer 配置
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,           // 使用视口作为根
        rootMargin: '0px',    // 根边距
        threshold: 0.1        // 元素可见 10% 时触发
    };

    // 创建观察者
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：动画后停止观察
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有带动画类的元素
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, ' +
        '.scale-in, .slide-up, .rotate-in'
    );

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// 视差滚动效果（可选）
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ============================================
// 数字计数动画
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ============================================
// 平滑滚动到元素
// ============================================
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// ============================================
// 鼠标跟随效果（可选）
// ============================================
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // 悬停在可点击元素上时放大
    const clickableElements = document.querySelectorAll('a, button, .btn');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });
}

// ============================================
// 页面加载进度条
// ============================================
function initLoadingBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ============================================
// 导出函数供外部使用
// ============================================
window.AnimationUtils = {
    animateCounter,
    smoothScrollTo,
    initParallax,
    initMouseFollower,
    initLoadingBar
};
