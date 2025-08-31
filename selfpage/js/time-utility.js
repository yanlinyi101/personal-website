/**
 * 时间工具类 - 用于获取GMT+8时区的时间并提供日夜判断功能
 * @author Yan Linyi
 * @version 1.0.0
 */

class TimeUtility {
    /**
     * 获取当前GMT+8时区的时间
     * @returns {Date} GMT+8时区的当前时间
     */
    static getCurrentGMT8Time() {
        // 获取当前UTC时间
        const now = new Date();
        
        // 获取当前时区与UTC的时差（分钟）
        const localTimezoneOffset = now.getTimezoneOffset();
        
        // GMT+8 相对于 UTC 的偏移量为 -480 分钟（负数表示东区）
        const GMT8Offset = -480;
        
        // 计算本地时区与 GMT+8 的时差（毫秒）
        const offsetMillis = (localTimezoneOffset - GMT8Offset) * 60 * 1000;
        
        // 调整时间
        const GMT8Time = new Date(now.getTime() + offsetMillis);
        
        return GMT8Time;
    }
    
    /**
     * 获取格式化的GMT+8时间字符串
     * @param {string} format 格式化模板，默认为 'YYYY-MM-DD HH:mm:ss'
     * @returns {string} 格式化后的时间字符串
     */
    static getFormattedGMT8Time(format = 'YYYY-MM-DD HH:mm:ss') {
        const date = this.getCurrentGMT8Time();
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    
    /**
     * 判断当前GMT+8时间是否为夜间
     * @param {number} nightStartHour 夜间开始时间（小时），默认为18点
     * @param {number} nightEndHour 夜间结束时间（小时），默认为6点
     * @returns {boolean} 如果当前是夜间则返回true，否则返回false
     */
    static isNightTime(nightStartHour = 18, nightEndHour = 6) {
        const date = this.getCurrentGMT8Time();
        const hour = date.getHours();
        
        // 如果当前小时大于等于夜间开始时间或小于夜间结束时间，则认为是夜间
        return hour >= nightStartHour || hour < nightEndHour;
    }
    
    /**
     * 获取当前GMT+8的小时数（24小时制）
     * @returns {number} 当前小时数
     */
    static getCurrentHour() {
        return this.getCurrentGMT8Time().getHours();
    }
    
    /**
     * 根据当前GMT+8时间返回问候语
     * @returns {string} 根据时间段返回的问候语
     */
    static getGreeting() {
        const hour = this.getCurrentHour();
        
        if (hour >= 5 && hour < 12) {
            return '早上好';
        } else if (hour >= 12 && hour < 14) {
            return '中午好';
        } else if (hour >= 14 && hour < 18) {
            return '下午好';
        } else if (hour >= 18 && hour < 22) {
            return '晚上好';
        } else {
            return '夜深了';
        }
    }
}

// 导出工具类以便在其他文件中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeUtility;
} 