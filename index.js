fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.urls.full})`
		  document.querySelector('.author').textContent = `By: ${data.user.name}`
    })
    .catch(err => {
      document.body.style.backgroundImage = `url(https://images.unsplash.com/
      photo-1500829243541-74b677fecc30?crop=entropy&cs=tinysrgb
      &fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc1MzA0MTY&ixlib=rb-4.0.3&q=80)`
      document.querySelector('.author').textContent = 'By: Daniil Silantev'
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
      if (!res.ok) {
        throw Error("Something went wrong")
      }
      return res.json()
    })
    .then(data => {
      const cryptoTop = document.querySelector('.crypto-top')
      const cryptoRates = document.createElement('ul')
      cryptoRates.classList.add('crypto-rates')
      cryptoRates.innerHTML = `<li class="current-rate">🎯: € ${data.market_data.current_price.eur}</li>
                               <li class="highest-rate">👆: € ${data.market_data.high_24h.eur}</li>
                               <li class="lowest-rate">👇: € ${data.market_data.low_24h.eur}</li>`
      cryptoTop.innerHTML = `<img class="crypto-icon" src="${data.image.small}"><p class="crypto-name">${data.name}</p>`
      cryptoTop.after(cryptoRates)
    })
    .catch(err => console.error(err))

function setCurrentTime () {
  const date = new Date()
  document.querySelector('.time').textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(setCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(res => {
        if(!res) {
          throw Error("Weather data not available")
        } else {
          return res.json()
        }
      }).then(data => {
        console.log(data)
        document.querySelector('.weather').innerHTML = `
        <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
        <p class="weather-city">${data.name}</p>`
      })
      .catch(err => console.error(err))
    });


