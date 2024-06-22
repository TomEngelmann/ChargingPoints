type BoundingBox = [string, string, string, string];

interface Place {
  boundingbox: BoundingBox;
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
}


interface IGeoCoding{
    address: string;
}

interface ICoords {
    lat: number;
    long: number;
}

const API_KEY = process.env.EXPO_PUBLIC_GEOCODING_API_KEY

export async function GeoCoding({address}: IGeoCoding): Promise<Place[]>{
    const URL = `https://geocode.maps.co/search?q=${address}&api_key=${API_KEY}`
    try {
        const result = await fetch(URL, {
            method: 'GET'
        });
        const res = await result.json()
        return res
    } catch(error) {
        console.log(error)
        return null;
    }
}

export async function GetStreetFromCoords({lat, long}: ICoords): Promise<string>{
    const URL = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${API_KEY}`
    try {
        const result = await fetch(URL, {
            method: 'GET'
        });
        const res = await result.json()
        return res.display_name
    } catch(error) {
        console.log(error)
        return null;
    }
}