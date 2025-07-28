/**
 * 页面切换动画模块
 * 专门解决从二级页面返回主页时的卡顿问题
 */

class PageTransitions {
    constructor() {
        this.transitionDuration = 600; // 增加动画时间，与主页淡入配合
        this.init();
    }

    init() {
        // 页面加载时的淡入效果
        this.fadeIn();
        
        // 专门处理返回按钮的动画
        this.bindBackButtonEvents();
    }

    /**
     * 页面淡入效果
     */
    fadeIn() {
        const body = document.body;
        
        // 设置初始状态
        body.style.opacity = '0';
        body.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
        
        // 延迟一帧后开始淡入
        requestAnimationFrame(() => {
            body.style.opacity = '1';
        });
    }

    /**
     * 返回主页时的淡出效果
     */
    fadeOutToHome(targetUrl) {
        const body = document.body;
        
        // 添加过渡类名，防止滚动
        body.classList.add('page-transitioning');
        
        // 开始淡出动画
        body.style.opacity = '0';
        body.style.transform = 'translateY(-30px)'; // 增加移动距离
        body.style.transition = `opacity ${this.transitionDuration}ms ease-in-out, transform ${this.transitionDuration}ms ease-in-out`;
        
        // 动画完成后跳转
        setTimeout(() => {
            window.location.href = targetUrl;
        }, this.transitionDuration);
    }

    /**
     * 绑定返回按钮事件
     */
    bindBackButtonEvents() {
        const backButtons = document.querySelectorAll('.back-button');
        
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = button.getAttribute('href');
                
                if (targetUrl && targetUrl.includes('index.html')) {
                    // 返回主页时使用淡出动画
                    this.fadeOutToHome(targetUrl);
                } else {
                    // 其他链接正常跳转
                    window.location.href = targetUrl;
                }
            });
        });
    }

    /**
     * 手动触发返回动画（备用方法）
     */
    navigateBack(url) {
        this.fadeOutToHome(url);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 创建全局实例
    window.pageTransitions = new PageTransitions();
});

// 导出类（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTransitions;
} 