import { PICKER_INFO } from "./constants";
import { getWeek } from "./get-date";

export const timeChain = (targetDate, dateType, chainType) => {
    let date;
    // 根据不同格式的 targetDate 创建 Date 对象
    if(typeof targetDate === 'object' && targetDate.start && targetDate.end) {
        date = new Date(targetDate.start);
		console.log('origin:'+date.toLocaleDateString());
    }else if (targetDate.includes('-')) {
        if (targetDate.split('-').length === 2) {
            // 处理 'YYYY-MM' 格式
            const [year, month] = targetDate.split('-');
            date = new Date(year, month - 1);
        } else {
            // 处理 'YYYY-MM-DD' 格式
            date = new Date(targetDate);
        }
    } else {
        // 处理 'YYYY' 格式
        date = new Date(targetDate, 0);
    }
    const {range_year,range_month,range_week,range_day} = PICKER_INFO.picker_range

    // 根据日期类型和链类型计算新日期
    if (dateType === range_day) { // 日
        const offset = chainType === 'last' ? -1 : 1;
        date.setDate(date.getDate() + offset);
    }else if (dateType === range_week) { // 周
		const day = new Date(getWeek(date).start).getDate()
        date.setDate(day); // 设置日期为当前周的第一天
        const offset = chainType === 'last'? -1 : 1;
        date.setDate(date.getDate() + offset * 7); // 调整日期到上一周或下一周
		
    } else if (dateType === range_month) { // 月
        const offset = chainType === 'last' ? -1 : 1;
        date.setMonth(date.getMonth() + offset);
    } else if (dateType === range_year) { // 年
        const offset = chainType === 'last' ? -1 : 1;
        date.setFullYear(date.getFullYear() + offset);
    }

    // 根据日期类型格式化返回结果
    if (dateType === range_day) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }else if (dateType === range_week) {
        const {start,end} = getWeek(date);
        return {start:start,end:end};

    }else if (dateType === range_month) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    } else if (dateType === range_year) {
        return String(date.getFullYear());
    }

	return targetDate;
};