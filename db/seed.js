const { User, Song} = require('../models/index');
const db = require('./db');

async function seed(){

    await db.sync({
        force: true
    })

    await Song.bulkCreate([
        {name:"Como la Flor",
        genre:"Regional Mexican",
        album: "Entre a Mi Mundo",
         releaseYear: 1992,
         artist:"Selena y Los Dinos",

        },
        {name:"Amor Prohibido",
        genre:"Regional Mexican",
        album: " Amor Prohibido",
         releaseYear: 1994,
         artist:"Selena",
        },
        {name:"Si una Vez",
        genre:"Regional Mexican",
        album: " Amor Prohibido",
         releaseYear: 1994,
         artist:"Selena",
        },
        {name:"Baila Esta Cumbia",
        genre:"Regional Mexican",
        album: "Ven Commigo",
         releaseYear: 1990,
         artist:"Selena",
        },
        {name:"Dreaming of You",
        genre:"Regional Mexican",
        album: "Dreaming of You",
         releaseYear: 1995,
         artist:"Selena",
        },
        {name:"I Could Fall in Love",
        genre:"R&B",
        album: "Dreaming of You",
         releaseYear: 1995,
         artist:"Selena",
        },
        {name:"Amame, Quiereme",
        genre:"Regional Mexican",
        album: "Selena",
         releaseYear: 1989,
         artist:"Selena",
        },
        {name:"Si la quieres",
        genre:"R&B",
        album: "Entre a Mi Mundo",
         releaseYear: 1992,
         artist:"Selena",
        }

        

    ], { validate: true})

   await console.log("Seeding Successful");
}

seed();
