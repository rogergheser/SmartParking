import server from "./server";
import mongoose from "mongoose"
server.listen(5001, () => {console.log("Server listening on port 5001")});

mongoose.connect("mongodb+srv://rogergheser:Caesar44a.C.@cluster0.5ygmu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", (error) => {
    if (error) console.log("Impossibile connettersi");
    else console.log("Collegato al server");
});