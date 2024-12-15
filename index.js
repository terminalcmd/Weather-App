const app = (() =>{
    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const loadingDiv = document.createElement('div')
    const container = document.querySelector('.container')
    const apiKey = 'GHWLBLXZT6K9D4CCG8QD5BXKX'
    container.appendChild(loadingDiv)
    loadingDiv.classList.add('loader')
    loadingDiv.textContent = 'Loading...'
    loadingDiv.style.display = 'none'
    form.addEventListener('submit',(e) => {
        e.preventDefault()
        getWeatherData()
        loadingDiv.style.display = 'block'
    })
    async function getWeatherData(){
        try{
            const weatherData = await(fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=${apiKey}`,{mode:'cors'}))
            const data = await weatherData.json()
            display(data)
            loadingDiv.style.display = 'none'
        }
        catch{
            alert('No City Found')
            loadingDiv.style.display = 'none'
            input.value = ''
        }
    }
})()

function changeToCel(value){
    return `${((value - 32)*5/9).toFixed(2)}°C`
}

function icon(name){
    return `./Icons/${name}.svg`
}

function dateFormat(date){
    const currentDate = new Date(String(date))
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() +1 )
    const newDate = nextDate.toDateString()
    const myDate = newDate.split(' ')
    return `${myDate[0]} ${myDate[2]}`
    
}

function display(data){
    const changeCel = document.querySelector('.cel')
    const changeFar = document.querySelector('.far')
    let change = true
    changeCel.addEventListener('click',() => {
        change =  true 
        displayWeather()
    })
    changeFar.addEventListener('click',() => {
        change = false
        displayWeather()
    })
    function checkChange(value){
        if(change === true){
            return changeToCel(value)
        }else{
            return `${value}°F`
        }
    }
    displayWeather()
    function displayWeather(){
        const weatherData = data
        console.log(weatherData)
        const container = document.querySelector('.result-container')
        container.textContent = ''
        const wholeContainer = document.createElement('div')
        wholeContainer.classList.add('whole-result')
        container.appendChild(wholeContainer)
        const todayContainer = document.createElement('div')
        const otherContainer = document.createElement('div')
        wholeContainer.appendChild(todayContainer)
        wholeContainer.appendChild(otherContainer)
        todayContainer.classList.add('today-cont')
        otherContainer.classList.add('oth-cont')
        const todayCard = document.createElement('div')
        todayCard.classList.add('td-card')
        const todayCardTemp = document.createElement('div')
        const todayCardIcon = document.createElement('img')
        const todayCardMax = document.createElement('div')
        const todayCardMin = document.createElement('div')
        const todayCardDate = document.createElement('div')
        const todayAddres = document.createElement('div')
        const todayAddAndDate = document.createElement('div')
        todayContainer.appendChild(todayCard)
        todayCard.appendChild(todayCardIcon)
        todayCard.appendChild(todayCardTemp)
        todayCard.appendChild(todayCardMax)
        todayCard.appendChild(todayCardMin)
        todayCard.appendChild(todayAddAndDate)
        todayAddAndDate.appendChild(todayCardDate)
        todayAddAndDate.appendChild(todayAddres)
        todayCardMin.textContent = `Min: ${checkChange(weatherData.days[0].tempmin)}`
        todayCardMax.textContent = `Max: ${checkChange(weatherData.days[0].tempmax)}`
        todayAddres.textContent = weatherData.resolvedAddress
        todayCardDate.textContent = `${new Date().toDateString()}  `
        const todayHourTemp = document.createElement('div')
        todayContainer.appendChild(todayHourTemp)
        todayHourTemp.classList.add('today-hour')
        weatherData.days[0].hours.map( hour => {
            if( weatherData.days[0].hours.indexOf(hour) === new Date().getHours()){
               todayCardIcon.src = icon(hour.icon)
                todayCardTemp.textContent = checkChange(hour.temp)
            }
        })
        for(let i = new Date().getHours()+1 ; i < weatherData.days[0].hours.length ;i++){
            const hourTempDiv = document.createElement('div')
            hourTempDiv.classList.add('hour-temp-div')
            const hourIcon = document.createElement('img')
            const hourTime = document.createElement('div')
            const hourTemp = document.createElement('div')
            todayHourTemp.appendChild(hourTempDiv)
            hourTempDiv.appendChild(hourTime)
            hourTempDiv.appendChild(hourIcon)
            hourTempDiv.appendChild(hourTemp)
            hourTime.textContent = weatherData.days[0].hours[i].datetime
            hourIcon.src = icon(weatherData.days[0].hours[i].icon)
            hourTemp.textContent = checkChange(weatherData.days[0].hours[i].temp)
        }
        for(let i = 0;i <weatherData.days.length-8;i++){
            const otherCard = document.createElement('div')
            otherCard.classList.add('other-card')
            const otherMinMax = document.createElement('div')
            const otherIcon = document.createElement('img')
            const otherDate = document.createElement('div')
            otherCard.appendChild(otherDate)
            otherCard.appendChild(otherIcon)
            otherCard.appendChild(otherMinMax)
            otherDate.textContent = dateFormat(weatherData.days[i].datetime)
            otherIcon.src = icon(weatherData.days[i].icon)
            otherMinMax.textContent = `Min: ${checkChange(weatherData.days[i].tempmin)}/Max: ${checkChange(weatherData.days[i].tempmax)}`
            otherContainer.appendChild(otherCard)
        }
    }
    
}



 












