import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiThunderstorm } from 'react-icons/wi';

const Home = () => {
  const [visitorInfo, setVisitorInfo] = useState({
    ip: '',
    location: '',
    time: '',
    weather: '',
    temperature: ''
  });

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json').then(response => {
      const ip = response.data.ip;
      setVisitorInfo(prev => ({ ...prev, ip }));

      axios.get(`https://ipapi.co/${ip}/json/`).then(res => {
        const location = `${res.data.city}, ${res.data.country_name}`;
        setVisitorInfo(prev => ({ ...prev, location }));
        const token = process.env.NEXT_PUBLIC_VERCEL_ENV_WEATHER_TOKEN;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&appid=${token}&units=metric`).then(weatherRes => {
          const weather = weatherRes.data.weather[0].description;
          const temperature = `${weatherRes.data.main.temp}°C`;
          setVisitorInfo(prev => ({ ...prev, weather, temperature }));
        });
      });
    });

    const timerId = setInterval(() => {
      setVisitorInfo(prev => ({ ...prev, time: new Date().toLocaleTimeString() }));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="container mx-auto text-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InfoCard title="IP Address" value={visitorInfo.ip} />
        <InfoCard title="Location" value={visitorInfo.location} />
        <InfoCard title="Local Time" value={visitorInfo.time} />
        <InfoCard title="Weather" value={`${visitorInfo.weather}, ${visitorInfo.temperature}`} weatherDescription={visitorInfo.weather} />
      </div>

      <p className="mb-8">Hello! I&apos;m Wael, your go-to Fullstack/AI Developer, dialing in from the sun-kissed cities of Marseille and Annaba ☀️. {greeting()}, and step into my digital realm to discover the milestones of my tech odyssey, the toolkit I swear by, and the innovative projects that have my signature all over them. Let&apos;s embark on this journey together!</p>

    </motion.div>
  );
};

const getWeatherIcon = (weatherDescription) => {
  const description = weatherDescription.toLowerCase();

  if (description.includes('clear')) return <WiDaySunny size={24} />;
  if (description.includes('clouds')) return <WiCloudy size={24} />;
  if (description.includes('rain')) return <WiRain size={24} />;
  if (description.includes('snow')) return <WiSnow size={24} />;
  if (description.includes('fog') || description.includes('mist')) return <WiFog size={24} />;
  if (description.includes('thunderstorm')) return <WiThunderstorm size={24} />;

  return <WiDaySunny size={24} />; // Default icon
};

const InfoCard = ({ title, value, weatherDescription }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className="shadow-lg rounded-lg p-5 flex flex-col items-center justify-center text-center"
  >
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {title === "Weather" && weatherDescription ? getWeatherIcon(weatherDescription) : null}
    <p>{value || 'Fetching...'}</p>
  </motion.div>
);

export default Home;
