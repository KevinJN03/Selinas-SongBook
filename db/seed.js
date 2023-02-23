const { User, Song} = require('../models/index');
const db = require('./db');

async function seed(){

    await db.sync({
        force: true
    })

    await User.bulkCreate([
    {
        name: "Selena",
    username: "testing123",
   password: "password"
    },
    {name: "Admin",
    username: "testing2",
    password: "pass"
    }
 ])

    await Song.bulkCreate([
        {name:"Como la Flor",
        genre:"Regional Mexican",
        album: "Entre a Mi Mundo",
         releaseYear: 1992,
         artist:"Selena y Los Dinos",
         user_id: 1

        },
        {name:"Amor Prohibido",
        genre:"Regional Mexican",
        album: " Amor Prohibido",
         releaseYear: 1994,
         artist:"Selena",
         user_id: 1
        },
        {name:"Si una Vez",
        genre:"Regional Mexican",
        album: " Amor Prohibido",
         releaseYear: 1994,
         artist:"Selena",
         user_id: 1
        },
        {name:"Baila Esta Cumbia",
        genre:"Regional Mexican",
        album: "Ven Commigo",
         releaseYear: 1990,
         artist:"Selena",
         user_id: 1
        },
        {name:"Dreaming of You",
        genre:"Regional Mexican",
        album: "Dreaming of You",
         releaseYear: 1995,
         artist:"Selena",
         user_id: 1
        },
        {name:"I Could Fall in Love",
        genre:"R&B",
        album: "Dreaming of You",
         releaseYear: 1995,
         artist:"Selena",
         user_id: 1
        },
        {name:"Amame, Quiereme",
        genre:"Regional Mexican",
        album: "Selena",
         releaseYear: 1989,
         artist:"Selena",
         user_id: 1
        },
        {name:"Si la quieres",
        genre:"R&B",
        album: "Entre a Mi Mundo",
         releaseYear: 1992,
         artist:"Selena",
         user_id: 1
        }

        

    ], {validate: true})

   await console.log("Seeding Successful");
}

seed();
