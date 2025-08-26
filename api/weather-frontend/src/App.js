
import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api-token-auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/weather/${city}/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || data.detail || 'Could not fetch weather');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="App">
      <h2>Weather App (Django Auth)</h2>
      {!token ? (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <form onSubmit={handleFetchWeather} className="weather-form">
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
            <button type="submit">Get Weather</button>
          </form>
          <button onClick={() => { setToken(''); setWeather(null); }}>Logout</button>
        </>
      )}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {weather && (
        <div className="weather-card">
          <div className="search-bar">
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Search"
              style={{ borderRadius: '20px 0 0 20px' }}
              disabled
            />
            <button disabled>
              <span role="img" aria-label="search">🔍</span>
            </button>
          </div>
          <div className="weather-icon">
            <span role="img" aria-label="weather">{weather.weather && weather.weather[0]?.main === 'Rain' ? '🌧️' : weather.weather && weather.weather[0]?.main === 'Clear' ? '☀️' : '⛅'}</span>
          </div>
          <div className="temp">{weather.main?.temp ? `${Math.round(weather.main.temp)}°C` : '--'}</div>
          <div className="city">{weather.name || city}</div>
          <div className="details">
            <div className="detail">
              <div className="detail-value">{weather.main?.humidity ? `${weather.main.humidity}%` : '--'}</div>
              <div className="detail-label">Humidity</div>
            </div>
            <div className="detail">
              <div className="detail-value">{weather.wind?.speed ? `${weather.wind.speed} km/h` : '--'}</div>
              <div className="detail-label">Wind Speed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
