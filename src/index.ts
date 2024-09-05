import {SETTINGS} from "./settings";
import {app} from "./app";
import {runDb} from "./db/db";


// app.listen(SETTINGS.PORT, ()=>{
//     console.log('...server started in port' + SETTINGS.PORT)
// })
//

const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, ()=>{
        console.log('...server started in port' + SETTINGS.PORT)
    })
}

startApp()
