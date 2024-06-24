export interface Station {
    id: string;
    name: string;
    brand: string;
    street: string;
    place: string;
    lat: number;
    lng: number;
    dist: number;
    diesel: number;
    e5: number;
    e10: number;
    isOpen: boolean;
    houseNumber: string;
    postCode: number;
  }
   
export interface GasStationLocations {
  ok: boolean;
  license: string;
  data: string;
  status: string;
  stations: Station [];
}

interface ApiRequest {
    lng: string;
    lat: string;
    radius: number;
    sorting: string;
    fuelType: string;
}
export default async function GetGasStations({lng, lat, radius, sorting, fuelType}: ApiRequest): Promise<GasStationLocations| null>{
    const key = process.env.EXPO_PUBLIC_TANKER_API_KEY
    const URL = `https://creativecommons.tankerkoenig.de/json/list.php?apikey=${key}&lng=${lng}&lat=${lat}&rad=${radius}&sort=${sorting}&type=${fuelType}`
    try {
        const result = await fetch(URL, {
            method: 'GET'
        });
        const res = await result.json()
        console.log('GetGasStations API response:', res);
        return res;
    } catch(error) {
        console.log(error)
        return null;
    }
    
}