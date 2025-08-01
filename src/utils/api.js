import axios from "axios"

const API_Base_URL = "https://data-visualization-backend-ten.vercel.app/v1"

export const fetchData = async()=>{
    const response = await axios.get(`${API_Base_URL}/data`)
    console.log(response.data)
    return response.data
}

