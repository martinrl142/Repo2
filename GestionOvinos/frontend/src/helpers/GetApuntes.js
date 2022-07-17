import theToken from "../components/Token";
import axios from 'axios'

const getApuntes = async () => {
    const res = await axios.get('http://localhost:4000/api/apuntes', theToken());
    console.log(res.data)
    return res.data
}

export default getApuntes;