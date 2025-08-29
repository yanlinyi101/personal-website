/**
 * 主题切换器 - 用于根据时间或用户偏好切换网站主题
 * 依赖 time-utility.js
 * @author Yan Linyi
 * @version 1.1.0
 */

class ThemeSwitcher {
    constructor(options = {}) {
        // 默认配置
        this.config = {
            darkModeClass: 'dark-mode',
            lightModeClass: 'light-mode',
            storageKey: 'theme-preference',
            nightStartHour: options.nightStartHour || 18,
            nightEndHour: options.nightEndHour || 6,
            autoSwitch: options.autoSwitch !== undefined ? options.autoSwitch : true,
            autoSwitchInterval: options.autoSwitchInterval || 60000, // 1分钟检查一次
            toggleSelector: options.toggleSelector || '.theme-toggle',
            fixedToggleSelector: options.fixedToggleSelector || '.fixed-theme-toggle',
            createFixedToggle: options.createFixedToggle !== undefined ? options.createFixedToggle : true
        };
        
        // 初始化
        this.init();
    }
    
    /**
     * 初始化主题切换器
     */
    init() {
        // 尝试从本地存储获取用户偏好
        this.userPreference = localStorage.getItem(this.config.storageKey);
        
        // 如果配置了创建固定切换按钮，则创建
        if (this.config.createFixedToggle) {
            this.createFixedToggleButton();
        }
        
        // 设置初始主题
        this.applyTheme();
        
        // 如果启用自动切换，设置定时器
        if (this.config.autoSwitch) {
            this.startAutoSwitch();
        }
        
        // 绑定切换按钮事件
        this.bindToggleEvent();
    }
    
    /**
     * 创建固定在右下角的主题切换按钮
     */
    createFixedToggleButton() {
        // 检查是否已存在
        if (document.querySelector(this.config.fixedToggleSelector)) {
            return;
        }
        
        // 创建按钮
        const fixedToggle = document.createElement('button');
        fixedToggle.className = 'fixed-theme-toggle';
        fixedToggle.setAttribute('aria-label', '切换主题');
        fixedToggle.setAttribute('title', '切换主题');
        
        // 添加图标
        fixedToggle.innerHTML = `
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        
        // 添加到页面
        document.body.appendChild(fixedToggle);
    }
    
    /**
     * 应用主题
     */
    applyTheme() {
        const body = document.body;
        
        // 移除所有主题类
        body.classList.remove(this.config.darkModeClass, this.config.lightModeClass);
        
        // 根据用户偏好或当前时间设置主题
        if (this.userPreference === 'dark') {
            body.classList.add(this.config.darkModeClass);
            this.currentTheme = 'dark';
        } else if (this.userPreference === 'light') {
            body.classList.add(this.config.lightModeClass);
            this.currentTheme = 'light';
        } else {
            // 如果没有用户偏好，根据时间自动设置
            this.setThemeByTime();
        }
        
        // 更新切换按钮状态
        this.updateToggleButton();
    }
    
    /**
     * 根据时间设置主题
     */
    setThemeByTime() {
        const body = document.body;
        
        // 使用TimeUtility判断当前是否为夜间
        const isNight = TimeUtility.isNightTime(this.config.nightStartHour, this.config.nightEndHour);
        
        // 移除所有主题类
        body.classList.remove(this.config.darkModeClass, this.config.lightModeClass);
        
        if (isNight) {
            body.classList.add(this.config.darkModeClass);
            this.currentTheme = 'dark';
        } else {
            body.classList.add(this.config.lightModeClass);
            this.currentTheme = 'light';
        }
    }
    
    /**
     * 切换主题
     */
    toggleTheme() {
        const body = document.body;
        
        if (this.currentTheme === 'dark') {
            body.classList.remove(this.config.darkModeClass);
            body.classList.add(this.config.lightModeClass);
            this.currentTheme = 'light';
            localStorage.setItem(this.config.storageKey, 'light');
        } else {
            body.classList.remove(this.config.lightModeClass);
            body.classList.add(this.config.darkModeClass);
            this.currentTheme = 'dark';
            localStorage.setItem(this.config.storageKey, 'dark');
        }
        
        // 更新切换按钮状态
        this.updateToggleButton();
    }
    
    /**
     * 更新切换按钮状态
     */
    updateToggleButton() {
        // 更新普通切换按钮
        const toggleButtons = document.querySelectorAll(this.config.toggleSelector);
        
        toggleButtons.forEach(button => {
            if (this.currentTheme === 'dark') {
                button.setAttribute('aria-checked', 'true');
                button.innerHTML = '<span>☀️</span>'; // 显示太阳图标表示可以切换到亮色模式
            } else {
                button.setAttribute('aria-checked', 'false');
                button.innerHTML = '<span>🌙</span>'; // 显示月亮图标表示可以切换到暗色模式
            }
        });
        
        // 更新固定切换按钮 - 这里不需要更改图标，CSS会根据主题类自动显示/隐藏
        const fixedToggleButtons = document.querySelectorAll(this.config.fixedToggleSelector);
        
        fixedToggleButtons.forEach(button => {
            if (this.currentTheme === 'dark') {
                button.setAttribute('aria-checked', 'true');
                button.setAttribute('title', '切换到亮色模式');
            } else {
                button.setAttribute('aria-checked', 'false');
                button.setAttribute('title', '切换到暗色模式');
            }
        });
    }
    
    /**
     * 绑定切换按钮事件
     */
    bindToggleEvent() {
        // 绑定普通切换按钮
        const toggleButtons = document.querySelectorAll(this.config.toggleSelector);
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleTheme();
            });
        });
        
        // 绑定固定切换按钮
        const fixedToggleButtons = document.querySelectorAll(this.config.fixedToggleSelector);
        
        fixedToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleTheme();
            });
        });
    }
    
    /**
     * 开始自动切换
     */
    startAutoSwitch() {
        // 如果用户没有设置偏好，才启用自动切换
        if (!this.userPreference) {
            // 立即执行一次
            this.setThemeByTime();
            
            // 设置定时器定期检查
            this.autoSwitchTimer = setInterval(() => {
                // 如果用户设置了偏好，停止自动切换
                if (this.userPreference) {
                    this.stopAutoSwitch();
                    return;
                }
                
                this.setThemeByTime();
            }, this.config.autoSwitchInterval);
        }
    }
    
    /**
     * 停止自动切换
     */
    stopAutoSwitch() {
        if (this.autoSwitchTimer) {
            clearInterval(this.autoSwitchTimer);
            this.autoSwitchTimer = null;
        }
    }
    
    /**
     * 重置用户偏好
     */
    resetPreference() {
        localStorage.removeItem(this.config.storageKey);
        this.userPreference = null;
        
        // 如果启用自动切换，重新开始
        if (this.config.autoSwitch) {
            this.startAutoSwitch();
        } else {
            this.setThemeByTime();
        }
    }
}

// 在文档加载完成后初始化主题切换器
document.addEventListener('DOMContentLoaded', () => {
    // 确保TimeUtility已加载
    if (typeof TimeUtility !== 'undefined') {
        // 创建主题切换器实例
        window.themeSwitcher = new ThemeSwitcher({
            nightStartHour: 18,
            nightEndHour: 6,
            autoSwitch: true,
            createFixedToggle: true
        });
    } else {
        console.error('ThemeSwitcher依赖TimeUtility，请确保先加载time-utility.js');
    }
}); 