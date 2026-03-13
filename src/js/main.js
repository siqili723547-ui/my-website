// ============================================
// 个人作品集网站 - 主要 JavaScript
// ============================================

// 网站配置数据
const siteConfig = {
    name: '李斯祺',
    subtitle: '大一计科学生 | 热爱编程与探索',
    about: '我是一名大一计算机科学专业的学生，对编程充满热情。我喜欢学习新技术，探索不同的编程领域，并通过项目来实践所学知识。目前专注于 Web 开发和机器人技术。',
    skills: ['Python', 'JavaScript', 'HTML/CSS', 'C++', 'Git', 'ROS'],
    social: [
        { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'gh' },
        { name: '邮箱', url: 'mailto:your@email.com', icon: '✉' }
    ]
};

// 项目数据（可以从 JSON 文件加载）
let projects = [];

// 文章数据（可以从 JSON 文件加载）
let articles = [];

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initTypewriter();
    loadContent();
    initContactForm();
    updateFooterYear();
});

// ============================================
// 粒子背景
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ============================================
// 导航栏
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 滚动时高亮当前区域
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
}

// ============================================
// 打字机效果
// ============================================
function initTypewriter() {
    const nameElement = document.getElementById('typedName');
    const subtitleElement = document.getElementById('typedSubtitle');

    typeText(nameElement, siteConfig.name, 150, () => {
        setTimeout(() => {
            typeText(subtitleElement, siteConfig.subtitle, 100);
        }, 500);
    });
}

function typeText(element, text, speed = 100, callback = null) {
    let i = 0;
    element.innerHTML = '<span class="cursor"></span>';

    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            element.innerHTML += '<span class="cursor"></span>';
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = text;
            if (callback) callback();
        }
    }

    type();
}

// ============================================
// 加载内容数据
// ============================================
async function loadContent() {
    try {
        // 尝试从 JSON 文件加载
        const [projectsRes, articlesRes] = await Promise.all([
            fetch('../../content/projects.json'),
            fetch('../../content/articles.json')
        ]);

        if (projectsRes.ok) projects = await projectsRes.json();
        else loadDefaultProjects();

        if (articlesRes.ok) articles = await articlesRes.json();
        else loadDefaultArticles();
    } catch (e) {
        // 如果加载失败，使用默认数据
        loadDefaultProjects();
        loadDefaultArticles();
    }

    renderContent();
}

function loadDefaultProjects() {
    projects = [
        {
            title: '油茶果采摘机器人',
            description: '基于 ROS 的采摘机器人，包含视觉定位、导航避障、STM32 控制等模块。',
            tags: ['Python', 'ROS', 'OpenCV', 'STM32'],
            image: '',
            link: '#',
            github: '#'
        },
        {
            title: '个人作品集网站',
            description: '使用纯 HTML/CSS/JS 构建的响应式个人网站，包含创意动画效果。',
            tags: ['HTML', 'CSS', 'JavaScript'],
            image: '',
            link: '#',
            github: '#'
        }
    ];
}

function loadDefaultArticles() {
    articles = [
        {
            title: '开始我的编程之旅',
            description: '分享我学习编程的经历和心得体会。',
            date: '2024-01-15'
        }
    ];
}

// ============================================
// 渲染内容
// ============================================
function renderContent() {
    renderAbout();
    renderProjects();
    renderArticles();
    renderSocialLinks();
}

function renderAbout() {
    const aboutDesc = document.getElementById('aboutDescription');
    const skillsCloud = document.getElementById('skillsCloud');

    aboutDesc.textContent = siteConfig.about;

    skillsCloud.innerHTML = siteConfig.skills.map(skill =>
        `<span class="skill-tag">${skill}</span>`
    ).join('');
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');

    grid.innerHTML = projects.map(project => `
        <div class="project-card scale-in">
            <div class="project-image" style="background: var(--primary-gradient);"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
                    ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">查看项目</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderArticles() {
    const grid = document.getElementById('blogGrid');

    if (articles.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1/-1;">暂无文章</p>';
        return;
    }

    grid.innerHTML = articles.map(article => `
        <div class="blog-card scale-in">
            <div class="blog-date">${formatDate(article.date)}</div>
            <h3 class="blog-title">${article.title}</h3>
            <p class="blog-description">${article.description}</p>
            <a href="${article.link || '#'}" class="blog-link">
                阅读更多 →
            </a>
        </div>
    `).join('');
}

function renderSocialLinks() {
    const container = document.getElementById('socialLinks');

    container.innerHTML = siteConfig.social.map(social => `
        <a href="${social.url}" class="social-link" target="_blank" title="${social.name}">
            ${social.icon}
        </a>
    `).join('');
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ============================================
// 联系表单
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 这里可以添加表单提交逻辑
        // 例如：使用 FormSubmit.io 等服务

        alert('感谢你的留言！这是一个演示表单，实际使用时需要配置后端服务。');
        form.reset();
    });
}

// ============================================
// 工具函数
// ============================================
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
