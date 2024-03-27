import React, { useState } from 'react'

import apiKeys from './apiKeys'
import WeatherReport from './WeatherReport'

const SearchWeather = (props) => {


    const [weatherData, setWeatherData] = useState('')



   

    const handleSearch = (data) => {
        // event.preventDefault();
        getWeather(data)

    }

    const getWeather = async (userData) => {
        let cityName = userData.userCity
        console.log(cityName)
        const apiCall = await fetch(`${apiKeys.apiBase}?q=${cityName}&appid=${apiKeys.key}&units=metric&lang=en`)

        if (apiCall.status === 200) {
            const jsonData = await apiCall.json()
            console.log('data: ', jsonData)
            setWeatherData(jsonData)
            props.searchCity(jsonData)
        }else{
            alert("Please Enter Valid City Name!")
        }
    }
    return (
        <div>
            {weatherData ? (
                <WeatherReport report={weatherData} getForm={handleSearch} />
                ) : (
                <WeatherReport report={props.data} getForm={handleSearch} />
            )}

        </div>
    )
}

export default SearchWeather
