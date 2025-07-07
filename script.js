// 平滑滚动导航
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时高亮当前导航项
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // 移除所有活动状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加当前活动状态
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // 技能进度条动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 研究卡片悬停效果增强
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 弹窗功能
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 添加淡入动画
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // 添加淡出动画
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        }, 300);
    }
}

// 点击弹窗外部关闭弹窗
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.getAttribute('id');
        closeModal(modalId);
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            const modalId = modal.getAttribute('id');
            closeModal(modalId);
        });
    }
});

// 导航栏滚动效果和背景图渐变消失效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');
    const heroAfter = heroSection ? heroSection.querySelector('::after') : null;
    
    // 导航栏效果
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // 背景图渐变消失效果
    if (heroSection) {
        const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
        const opacity = Math.max(0.3 - (scrollProgress * 0.3), 0);
        
        // 通过CSS自定义属性来控制背景图透明度
        heroSection.style.setProperty('--bg-opacity', opacity);
    }
    

});

// 页面加载动画
window.addEventListener('load', function() {
    // 为页面元素添加淡入动画
    const animateElements = document.querySelectorAll('.hero-content, .timeline-item, .research-card, .skill-category');
    
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(element);
    });
});

// 添加CSS样式用于活动导航链接
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2c3e50 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .modal {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// 平滑的页面滚动到顶部功能（可选）
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加回到顶部按钮（当页面滚动时显示）
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.onclick = scrollToTop;
    
    // 添加样式
    const btnStyle = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3498db;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
    `;
    
    if (!document.querySelector('style[data-back-to-top]')) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-back-to-top', 'true');
        styleElement.textContent = btnStyle;
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

// 页面加载完成后创建回到顶部按钮
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// 滚动渐变效果
function initScrollTransition() {
    const heroSection = document.getElementById('home');
    const projectsSection = document.getElementById('projects');
    
    if (!heroSection || !projectsSection) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = heroSection.offsetHeight;
        
        // 计算滚动进度（0-1之间）
        const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);
        
        // 第一部分内容淡出
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            const opacity = Math.max(1 - scrollProgress * 1.5, 0);
            const translateY = scrollProgress * 50;
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
        
        // 个人照片渐变消失效果
        const profileImage = heroSection.querySelector('.profile-image');
        if (profileImage) {
            const photoScrollProgress = Math.min(scrollY / (windowHeight * 0.5), 1);
            const photoOpacity = Math.max(1 - photoScrollProgress * 1.2, 0);
            profileImage.style.opacity = photoOpacity;
        }
        
        // 背景颜色渐变
        const body = document.body;
        if (scrollProgress > 0) {
            // 从深色渐变到稍浅的深色
            const r = Math.round(15 + scrollProgress * 10); // 15 -> 25
            const g = Math.round(15 + scrollProgress * 10); // 15 -> 25  
            const b = Math.round(35 + scrollProgress * 15); // 35 -> 50
            body.style.background = `linear-gradient(135deg, rgb(${r}, ${r}, ${b}) 0%, rgb(${r+10}, ${r+10}, ${b+10}) 50%, rgb(${r+5}, ${r+15}, ${b+25}) 100%)`;
        } else {
            // 恢复原始背景
            body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
        }
        
        // 背景图片淡出
        const heroAfter = heroSection;
        if (heroAfter) {
            heroAfter.style.setProperty('--bg-opacity', Math.max(0.3 - scrollProgress * 0.3, 0));
        }
    });
}

// 在DOMContentLoaded事件中调用
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动渐变效果
    initScrollTransition();
    
    // 技能进度条动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 研究卡片悬停效果增强
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});