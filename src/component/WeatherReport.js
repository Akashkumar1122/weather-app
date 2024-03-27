import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const WeatherReport = (props) => {

    const [formData, setFormdata] = useState({})

    const handleInpt = (event) => {
        const { name, value } = event.target
        setFormdata({
            ...formData,
            [name]: value
        })
    }

    // console.log('from weather: ',props.report)

    const handleForm = (event) => {
        event.preventDefault();
        props.getForm(formData)
    }
    return (
        <div>
            <div className="city-weather">
                <div className="cloud__icon rpDetails">
                    <img src={`https://openweathermap.org/img/wn/${props.report.weather[0].icon}@2x.png`} alt="" />
                </div>
                <div className="description-weather rpDetails">
                    <p>{props.report.weather[0].description}</p>
                </div>
                <div className="search-form rpDetails">
                    <form onSubmit={handleForm}>
                        <input type="text" id='user-city' name='userCity' onChange={handleInpt} placeholder='Enter Your City' />
                        <button id='search__weather'><FontAwesomeIcon icon={faSearch} style={{ color: "#ffffff", }} /></button>
                    </form>
                </div>
                <div className="weather_report">
                    <div className="places-name">
                        <h4>{props.report.name},{props.report.sys.country}</h4>
                    </div>
                    <div className="weatherDetail">
                        <div className="detail">
                            <div className="detailKey">Temperature</div>
                            <div className="detailValue temp__val">{parseInt(props.report.main.temp).toFixed(0)} <span className="degree">&deg;</span> C</div>
                        </div>
                        <div className="detail">
                            <div className="detailKey">Humidity</div>
                            <div className="detailValue">{parseInt(props.report.main.humidity).toFixed(0)}%</div>
                        </div>
                        <div className="detail">
                            <div className="detailKey">Wind Speed</div>
                            <div className="detailValue">{props.report.wind.speed} Km/h</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherReport
