import currentWether from '../api/source/data.json';
import errorWether from '../api/source/error.json';

const url = 'https://weatherapi-com.p.rapidapi.com';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_TOKEN,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

export async function getWether() {
    return currentWether;
}

export async function getWetherByName(cityName) {
    const BASE_URL = new URL('/current.json', url);
    BASE_URL.searchParams.append('q', cityName)
    console.log(BASE_URL.href)
    const resp = await fetch(BASE_URL.href, options);
    return resp.json();
}