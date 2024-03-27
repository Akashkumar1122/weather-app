import React from 'react'
import SunCloud from './SunCloud'

const LoadingAnimation = () => {
    return (
        <div>
            <SunCloud/>
            <div className="UserInformation">
                <h3>Dectacting Your Current Location</h3>
                <p>we need your location access so that we can show the weather report accordingly</p>
            </div>
        </div>
    )
}

export default LoadingAnimation
