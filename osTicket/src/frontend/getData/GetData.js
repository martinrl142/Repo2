import { Cheerio } from "cheerio";
import axios from "axios";

export default function GetData () {
    let body = "";
    const ruta = "http://fvet1.fvet.edu.uy/osTicket_1.6.0sp/scp/tickets.php";
    axios.get(ruta).then(urlResponse => {
        const $ = Cheerio.load(urlResponse.data);
        body = $("body");
        console.log(body);
    });
    
    return body;
}
