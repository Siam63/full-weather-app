import React, {useState} from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({setQuery, units, setUnits}) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if(city !== '') setQuery({q: city});
    }

    const handleUnits = (e) => {
        const selectedUnit = e.currentTarget.name;

        if(units !== selectedUnit) setUnits(selectedUnit);
    }

    const handleLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon
                });
            })
        }
    }

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input value={city} onChange={(e) => setCity(e.currentTarget.value)} placeholder="Search for a city..." type="text" className="placeholder:lowercase text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"></input>
                <UilSearch onClick={handleSearch} size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
                <UilLocationPoint onClick={handleLocation} size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
            </div>

            <div className="flex flex-row w-1/4 items-center justify-center">
                <button onClick={handleUnits} name="metric" className="transition ease-out hover:scale-125 text-xl text-white font-light">°C</button>
                <p className="text-xl text-white mx-1">|</p>
                <button onClick={handleUnits} name="imperial" className="transition ease-out hover:scale-125 text-xl text-white font-light">°F</button>
            </div>
        </div>
    )
}

export default Inputs
