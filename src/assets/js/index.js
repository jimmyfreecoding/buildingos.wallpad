function formatTime(date, status, num = 0) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() + num
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const week = date.getDay()
    if (status == 'day') {
        return [month, day].map(formatNumber).join('-')
    }
    if (status == 'time') {
        // , second
        return [hour, minute, second].map(formatNumber).join(':')
    }
    if (status == 'week') {
        return week
    }
    return [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getTimestr(time) {
    return new Date(time).getTime() / 1000
}
// getDate()
setInterval(function() {
    getDate()
}, 1000)

export function getDate() {
    let day = formatTime(new Date(), 'day')
    let time = formatTime(new Date(), 'time')
    let week = formatTime(new Date(), 'week')
    var weekArr = ["日", "一", "二", "三", "四", "五", "六"]
    return {
        day:day,
        time:time,
        week:'周' + weekArr[week]
    }
    // $('.time-day').html(day)
    // $('.time-time').html(time)
    // $('.time-week').html('周' + weekArr[week])
}

