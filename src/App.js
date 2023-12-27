import './App.css';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TempAndDetails from './Components/TempAndDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/weatherService';
import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState({q: 'berlin'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
          setWeather(data);
        });
    };
    fetchWeather();

  }, [query, units]);

  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'

    const threshold = units === 'metric' ? 20 : 60

    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700';
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>      
          <TimeAndLocation weather={weather}/>
          <TempAndDetails weather={weather}/>
          <Forecast title="Hourly Forecast" items={weather.hourly}/>
          <Forecast title="Daily Forecast" items={weather.daily}/>
        </div>
      )}


    </div>
  );
}

export default App;
