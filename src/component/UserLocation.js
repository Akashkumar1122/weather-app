import React, {useEffect, useState} from 'react'
// import cloudLoadingAnimation from '../assests/images/cloud-loading-animation.gif'
import LoadingAnimation from './LoadingAnimation'
import jonathanImg from '../assests/images/jonathan-mobile.jpg'
import apiKeys from './apiKeys'
import SearchWeather from './SearchWeather'

const UserLocation = () => {

  const [location, setLocation] = useState({})
  const [isPermission, setIsPermission] = useState(false)
  const [sunRiseSet, setSunRiseSet] = useState({})
  const [currentTimeDate, setCurrentDate] = useState({})
  const [digitalClock, setDigitalClock] = useState()
  // const [cloudIcon, setCloudIcon] = useState()
    
    useEffect(()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(getPosition)
        }else{
          alert('Geolocation is not supported by this browser.')
        }
        // console.log('location: ',location);
        // eslint-disable-next-line
    },[])

    async function getPosition(positions){
      let {latitude,longitude} = positions.coords
      const apiCall = await fetch(`${apiKeys.apiBase}?lat=${latitude}&lon=${longitude}&appid=${apiKeys.key}&units=metric`)
      if(apiCall.status === 200){
        let jsonData = await apiCall.json();
        let sunRise = jsonData.sys.sunrise
        sunRise = new Date(sunRise * 1000)

        let sunSet = jsonData.sys.sunset
        sunSet = new Date(sunSet * 1000)
        let sun = {
          sunRise: `${sunRise.getHours()} : ${sunRise.getMinutes()}`,
          sunSet: `${sunSet.getHours()} : ${sunSet.getMinutes()}`
        } 
        // console.log(sun)
        // console.log(jsonData)
        setLocation(jsonData)
        setSunRiseSet(sun)
        setIsPermission(true)
        setLocalTime(jsonData)
        // setCloudIcon({
        //   icon: jsonData.weather[0].icon,
        //   description: jsonData.weather[0].description
        // })
      }else{
        alert('Invalid location')
      }
    }

    const setLocalTime = (data)=>{
      let monthsArr = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let daysArr = ['Sun', 'Mon', 'Tus', 'Wed', 'Thus', 'Fri', 'Sat']
      let date = new Date()
      let month = monthsArr[date.getMonth()]
      let day = daysArr[date.getDay()]
      let dateToday = date.getDate();
      let year = date.getFullYear();

      setCurrentDate({
        day: day,
        date: dateToday,
        month: month,
        year: year
      })
      
    }

    function updateClock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      var meridiem = "AM";

      if (hours >= 12) {
        meridiem = "PM";
      }
      if (hours > 12) {
        hours -= 12;
      }
      if (hours === 0) {
        hours = 12;
      }
    
      hours = (hours < 10 ? "0" : "") + hours;
      minutes = (minutes < 10 ? "0" : "") + minutes;
      seconds = (seconds < 10 ? "0" : "") + seconds;
    
      
      var timeString = hours + ":" + minutes + ":" + seconds + " "+meridiem;
      
      setDigitalClock(timeString)
    }

    setInterval(updateClock, 1000)

    const handleCityReport = (data)=>{
      console.log('data from user: ',data)
      // setLocation(data)
    }

  return (
    <div className='show-weather'>
      {isPermission ? (
        <div className='permission-accessed'>
          <div className="weather-contents">
            <div className="left-content">
              <img src={jonathanImg} alt="" />
              <div className="details-box">
                <h3 className='country-name'>{location.name}</h3>
                <h3>{location.sys.country}</h3>
              </div>
              <div className="sunInfo">
                <p>Sun Rise: {sunRiseSet.sunRise}</p>
                <p>Sun Set: {sunRiseSet.sunSet}</p>
              </div>
              <div className="show_time">
                <p>{currentTimeDate.day}, {currentTimeDate.date}-{currentTimeDate.month}-{currentTimeDate.year}</p>
              </div>
              <div className="temprature_degree">
                <h3>{parseInt(location.main.temp).toFixed(0)} <span className='degreeSym'>o</span>c</h3>
              </div>
              <div className="digital-clock">
                <h3>{digitalClock}</h3>
              </div>
            </div>
            <div className="right-content">
              <div className="details_weather">
               
                <SearchWeather data={location} searchCity={handleCityReport}/>
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='not-allowed'>
          <div className="not-allowed-info">
            <LoadingAnimation/>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserLocation
