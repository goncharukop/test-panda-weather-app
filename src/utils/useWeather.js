import { ref } from 'vue';
import { API_KEY, BASE_URL, IP_KEY, IP_URL, CITY_SEARCH_URL } from '../constans';

export function useWeather() {
    const searchCity = ref('');
    const weatherInfo = ref(null);
    const isLoading = ref(true);
    const filteredCities = ref([]);
    const weatherArray = ref([]);
    const favoriteArray = ref(JSON.parse(localStorage.getItem('favoriteArray')) || []);
    const dialogVisible = ref(false);

    const getCustomerCity = async () => {
        try {
            const response = await fetch(`${IP_URL}?api-key=${IP_KEY}`);
            const data = await response.json();
            searchCity.value = data.city || '';

            if (searchCity.value) {
                await getWeather();
            }
        } catch (error) {
            console.error('Error fetching customer city:', error);
        }
    };

    const fetchCities = async (query) => {
        if (query.length > 2) {
            await fetch(`${CITY_SEARCH_URL}?q=${query}&limit=10&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    filteredCities.value = data.map(city => ({
                        name: city.name,
                        country: city.country
                    }));
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                });
        } else {
            filteredCities.value = [];
        }
    };

    const getWeather = () => {
        if (!searchCity.value) return;

        fetch(`${BASE_URL}?q=${searchCity.value}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => weatherInfo.value = data)
            .catch(error => {
                console.error('Error fetching weather:', error);
            })
            .finally(() => {
                isLoading.value = false;
            });

        searchCity.value = '';
    };

    const updateWeatherArray = (weatherInfo) => {
        if (weatherInfo.list[0].weather && weatherArray.value.length < 5) {
            weatherArray.value.push(weatherInfo);
        }
    };

    const updateFavoriteArray = (weatherInfo) => {
        if (weatherInfo.list[0].weather) {
            if (favoriteArray.value.length < 5) {
                favoriteArray.value.push(weatherInfo);
                localStorage.setItem('favoriteArray', JSON.stringify(favoriteArray.value));
            }
        }
    };

    const showListDialog = () => {
        if (weatherArray.value.length === 5) {
            dialogVisible.value = true;
        }
    };

    const showDialog = () => {
        if (favoriteArray.value && favoriteArray.value.length === 5) {
            dialogVisible.value = true;
        }
    };

    const hideDialog = () => {
        dialogVisible.value = false;
    };

    return {
        searchCity,
        weatherInfo,
        isLoading,
        filteredCities,
        weatherArray,
        favoriteArray,
        dialogVisible,
        getCustomerCity,
        fetchCities,
        getWeather,
        updateWeatherArray,
        updateFavoriteArray,
        showListDialog,
        showDialog,
        hideDialog
    };
}
