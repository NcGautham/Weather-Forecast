const API_KEY = "2244c1d34e55e91b4064978fd4c8fa28";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// DOM Elements
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const animationContainer = document.querySelector(".weather-animation-container");
const searchContainer = document.querySelector(".search-container");
const body = document.body;

// Weather animation elements
const weatherAnimations = {
    Clear: createSunAnimation,
    Clouds: createCloudAnimation,
    Rain: createRainAnimation,
    Drizzle: createDrizzleAnimation,
    Mist: createMistAnimation,
    Snow: createSnowAnimation,
    Thunderstorm: createThunderAnimation
};

// Weather theme mapping
const weatherThemes = {
    Clear: "theme-clear",
    Clouds: "theme-cloudy",
    Rain: "theme-rainy",
    Drizzle: "theme-rainy",
    Mist: "theme-mist",
    Snow: "theme-snowy",
    Thunderstorm: "theme-thunderstorm"
};

// Initialize weather info as hidden
weatherInfo.style.display = "none";

// Search box animation
searchBox.addEventListener("focus", () => {
    searchContainer.classList.add("search-focused");
});

searchBox.addEventListener("blur", () => {
    if (!searchBox.value) {
        searchContainer.classList.remove("search-focused");
    }
});

// Event Listeners
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim()) {
        checkWeather(searchBox.value.trim());
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchBox.value.trim()) {
        checkWeather(searchBox.value.trim());
    }
});

// Main weather check function
async function checkWeather(city) {
    try {
        // Show loading state
        searchBtn.classList.add("loading");
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
        const data = await response.json();

        // Reset button state
        searchBtn.classList.remove("loading");
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';

        if (data.cod === "404") {
            showError("City not found");
            return;
        }

        updateWeatherUI(data);
        updateWeatherAnimation(data.weather[0].main);
        updateWeatherTheme(data.weather[0].main);
    } catch (error) {
        searchBtn.classList.remove("loading");
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        showError("Error fetching weather data");
        console.error(error);
    }
}

// Enhanced splash screen handling
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const weatherContainer = document.querySelector('.weather-container');
    
    if (splashScreen) {
        // Hide weather container initially
        if (weatherContainer) {
            weatherContainer.style.opacity = '0';
        }

        // Show splash screen for 3 seconds
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            
            // Show weather container with fade in
            if (weatherContainer) {
                weatherContainer.style.transition = 'opacity 0.5s ease';
                weatherContainer.style.opacity = '1';
            }

            // Remove splash screen from DOM after animation
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500);
        }, 3000);
    }
});

// Enhanced weather icon mapping with fallback
const weatherIconMap = {
    Clear: 'clear.png',
    Clouds: 'clouds.png',
    Rain: 'rain.png',
    Drizzle: 'drizzle.png',
    Mist: 'mist.png',
    Snow: 'snow.png',
    Thunderstorm: 'thunderstorm.png'
};

// Update UI with weather data
function updateWeatherUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    // Update weather icon with smooth transition
    const weatherMain = data.weather[0].main;
    const weatherIcon = document.querySelector(".weather-icon");
    
    // Fade out current icon
    weatherIcon.style.opacity = "0";
    
    // Load new icon
    const iconPath = `Assets/${weatherIconMap[weatherMain] || 'default.png'}`;
    const newIcon = new Image();
    newIcon.src = iconPath;
    
    newIcon.onload = () => {
        setTimeout(() => {
            weatherIcon.src = iconPath;
            weatherIcon.alt = weatherMain;
            weatherIcon.style.opacity = "1";
        }, 300);
    };

    // Show weather info with animation
    weatherInfo.style.display = "block";
    weatherInfo.classList.add("fade-in");
}

// Update weather theme
function updateWeatherTheme(condition) {
    // Remove all weather themes
    body.classList.remove(...Object.values(weatherThemes));
    
    // Add new theme
    const theme = weatherThemes[condition];
    if (theme) {
        body.classList.add(theme);
    }
}

// Enhanced Weather Animation Functions
function createSunAnimation() {
    const sun = document.createElement("div");
    sun.className = "sun";
    const rays = document.createElement("div");
    rays.className = "sun-rays";
    for (let i = 0; i < 8; i++) {
        const ray = document.createElement("div");
        ray.className = "ray";
        ray.style.transform = `rotate(${i * 45}deg)`;
        rays.appendChild(ray);
    }
    sun.appendChild(rays);
    animationContainer.innerHTML = "";
    animationContainer.appendChild(sun);
}

function createCloudAnimation() {
    const clouds = document.createElement("div");
    clouds.className = "clouds";
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        cloud.style.animationDelay = `${i * 2}s`;
        cloud.style.opacity = 0.7 + Math.random() * 0.3;
        clouds.appendChild(cloud);
    }
    animationContainer.innerHTML = "";
    animationContainer.appendChild(clouds);
}

function createRainAnimation() {
    const rain = document.createElement("div");
    rain.className = "rain";
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.className = "raindrop";
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = 0.3 + Math.random() * 0.7;
        rain.appendChild(drop);
    }
    animationContainer.innerHTML = "";
    animationContainer.appendChild(rain);
}

function createDrizzleAnimation() {
    const drizzle = document.createElement("div");
    drizzle.className = "drizzle";
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement("div");
        drop.className = "drizzledrop";
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = 0.2 + Math.random() * 0.5;
        drizzle.appendChild(drop);
    }
    animationContainer.innerHTML = "";
    animationContainer.appendChild(drizzle);
}

function createMistAnimation() {
    const mist = document.createElement("div");
    mist.className = "mist";
    for (let i = 0; i < 8; i++) {
        const layer = document.createElement("div");
        layer.className = "mist-layer";
        layer.style.animationDelay = `${i * 0.5}s`;
        layer.style.opacity = 0.1 + Math.random() * 0.2;
        mist.appendChild(layer);
    }
    animationContainer.innerHTML = "";
    animationContainer.appendChild(mist);
}

function createSnowAnimation() {
    const snow = document.createElement("div");
    snow.className = "snow";
    for (let i = 0; i < 100; i++) {
        const flake = document.createElement("div");
        flake.className = "snowflake";
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.opacity = 0.3 + Math.random() * 0.7;
        flake.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
        snow.appendChild(flake);
    }
    animationContainer.innerHTML = "";
    animationContainer.appendChild(snow);
}

function createThunderAnimation() {
    const thunder = document.createElement("div");
    thunder.className = "thunder";
    const lightning = document.createElement("div");
    lightning.className = "lightning";
    const flash = document.createElement("div");
    flash.className = "flash";
    thunder.appendChild(lightning);
    thunder.appendChild(flash);
    animationContainer.innerHTML = "";
    animationContainer.appendChild(thunder);
}

// Update weather animation based on condition
function updateWeatherAnimation(condition) {
    const animationFunction = weatherAnimations[condition];
    if (animationFunction) {
        animationFunction();
    }
}

// Enhanced error handling
function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    const existingError = document.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }
    
    document.querySelector(".weather-card").appendChild(errorDiv);
    
    // Add fade-out animation after 3 seconds
    setTimeout(() => {
        errorDiv.classList.add("fade-out");
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Initial weather check for user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `${API_URL}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                );
                const data = await response.json();
                updateWeatherUI(data);
                updateWeatherAnimation(data.weather[0].main);
                updateWeatherTheme(data.weather[0].main);
            } catch (error) {
                console.error("Error fetching location weather:", error);
            }
        },
        (error) => {
            console.error("Error getting location:", error);
        }
    );
} 