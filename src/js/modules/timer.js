const timer = (endtime) => {

    const getTime = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.trunc(total / 86400000),
          hours = Math.trunc((total - days * 86400000)/3600000),
          minutes = Math.trunc((total - days * 86400000 - hours * 3600000) / 60000),
          seconds = Math.trunc((total - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000)

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const addZero = (num) => {
        if (num < 10 && num >= 0) {
            return `0${num}`
        } else {
            return num
        }
    }

    const setClock = (selector) => {
        const timerDiv = document.querySelector(selector),
              days = timerDiv.querySelector('#days'),
              hours = timerDiv.querySelector('#hours'),
              minutes = timerDiv.querySelector('#minutes'),
              seconds = timerDiv.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTime(endtime)

            days.textContent = addZero(t.days)
            hours.textContent = addZero(t.hours)
            minutes.textContent = addZero(t.minutes)
            seconds.textContent = addZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
        
    }

    setClock('#timer')
    // console.log(date)
}

export default timer