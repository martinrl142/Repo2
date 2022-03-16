import { Cheerio } from "cheerio";
import axios from "axios";

export const getTickets = async () => {
    let body = "";
    const ruta = "http://fvet1.fvet.edu.uy/osTicket_1.6.0sp/scp/tickets.php";
    await axios.get(ruta).then(urlResponse => {
        const $ = Cheerio.load(urlResponse.data);
        body = $("body");
        console.log(body);
    });
    console.log(body);
    // return body;
};
