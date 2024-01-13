const express = require("express");
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: "false"
    }]
}];

app.use(express.json());

app.get('/', function(req, res){
    const johnKidney = users[0].kidneys;
    const totalNumberOfKidneys = johnKidney.length;
    let healthyKidney = 0;
    for(let i=0;i<totalNumberOfKidneys;i++){
        if(johnKidney[i].healthy){
            healthyKidney = healthyKidney + 1;
        }
    }

    const unhealthyKidneys = totalNumberOfKidneys - healthyKidney;
    res.json({
        healthyKidney,
        unhealthyKidneys,
        totalNumberOfKidneys
    })
})

app.post('/', function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        mssg: "done!"
    })
})

app.put('/', (req, res) => {
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }

    res.json({})
})

app.delete('/', (req, res) => {
    const newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy: "true"
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({msg: "Done!"})
})

app.listen(3000);