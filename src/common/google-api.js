/* eslint-disable no-unused-vars */
const GOOGLE_MAPS_API_KEY = 'AIzaSyCqxL0u4LclvZzl4Acz3qyZAWIl285US7A'
const GEOCODING_API_KEY = 'AIzaSyBJno4ubcm1KHByphcc054awRasxWBP3a8'
const fetchCoords = (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+Belgrade,+Serbia&key=${GEOCODING_API_KEY}`
    return fetch(url)
            .then(response => response.json())
}
export {
    fetchCoords,
}
