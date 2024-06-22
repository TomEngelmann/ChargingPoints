interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
interface Chargepoint {
  type: string;
  count: number;
  power?: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}
  
export interface ChargeLocation {
  address: Address;
  chargepoints: Chargepoint[];
  coordinates: Coordinates;
  fault_report: boolean;
  ge_id: number;
  name: string;
  network: string | boolean;
  url: string;
  verified: boolean;
}

interface ApiRequest {
    lng: string;
    lat: string;
    radius: number;
    open247: boolean;
    freeLoading: boolean;
    freeParking: boolean;
    accessibility: boolean;
}
export default async function GetPoints({lng, lat, radius, open247, freeLoading, freeParking, accessibility}: ApiRequest): Promise<ChargeLocation[] | null>{
    const key = process.env.EXPO_PUBLIC_CHARGING_API_KEY
    const URL = `https://api.goingelectric.de/chargepoints?key=${key}&lng=${lng}&lat=${lat}&radius=${radius}?open_twentyfourseven=${open247}&freeparking=${freeParking}&freeloading=${freeLoading}&barrierfree=${accessibility}`
    try {
        const result = await fetch(URL, {
            method: 'GET'
        });
        const res = await result.json()
        return res.chargelocations;
    } catch(error) {
        console.log(error)
        return null;
    }
    
}