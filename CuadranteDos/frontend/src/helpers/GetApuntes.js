import theToken from "../components/Token";
import axios from 'axios'

const getApuntes = async (authorId) => {
    const res = await axios.get('http://localhost:4000/api/apuntes/' + authorId, theToken());
    console.log(res.data)
    console.log('Id del Autor: ', res.data.autor)
    return res.data
}

export default getApuntes;