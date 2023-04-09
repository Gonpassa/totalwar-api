const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000

app.use(cors()) 

const legendaryLords = {
    'tyrion': {
        'race': 'High Elves',
        'faction': 'Eataine',
        'statistics': {
            Health:	4280,
            Leadership:	85,
            'Melee Attack':	75,
            'Melee Defense':60,
        }
    },
    'unknown': {
        'race': 'unknown',
        faction: 'unknown'
    },
    'grom the paunch': {
        'race': 'Greenskins',
        'faction': 'Broken Axe ',
        'statistics': {
            Health:	5248,
            Leadership:	70,
            'Melee Attack':	40,
            'Melee Defense':30,
        }
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (req, res) => {
    const lord = req.params.name.toLowerCase().trim()
    if(legendaryLords[lord]){
        res.json(legendaryLords[lord])
    }else{
        res.json(legendaryLords['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log('server listening on PORT ' + PORT)
})