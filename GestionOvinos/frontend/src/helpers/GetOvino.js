import theToken from "../components/Token";
import axios from 'axios'

const getOvino= async (ovinoId) => {
    const res = await axios.get('http://localhost:4000/api/ovinos/' + ovinoId, theToken());
    console.log(res.data)
    return res.data
}

export default getOvino;