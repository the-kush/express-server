const express = require("express");
const app = express();
const port = 3000;

const users = [{
    name: 'John',
    kidneys:[{
        healthy: false
    }]
}]

app.use(express.json());

app.get("/", (req, res) => {
    
    const johnKidney = users[0].kidneys;
    const totalNumberOfKidneys = johnKidney.length;
    let healthyKidney = 0;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            healthyKidney++;
        }
    }
    const unhealthyKidney = totalNumberOfKidneys - healthyKidney;
    res.json({
        totalNumberOfKidneys,
        healthyKidney,
        unhealthyKidney
    })
})

app.post("/add", (req, res) => {

    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Added successfully"
    })
    
})

app.put("/replace", (req, res) => {

    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({
        msg: "All kidneys are healthy"
    })

})

app.delete("/remove", (req, res) => {

    if(thereIsAtleastOneUnhealthyKidney()){
        const newKidney = [];
        for(let i = 0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newKidney.push({
                healthy: true
            })
            }
        }
        users[0].kidneys = newKidney;
        res.status(202).send({
            msg: "removed unhealthy kidney"
        })
    }else{
        res.status(411).send({
            msg: "Invalid Process"
        })
    }
    
})

function thereIsAtleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(port);