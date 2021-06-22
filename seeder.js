const seeder = require('mongoose-seed');
const dotenv = require('dotenv');
const users = require('./database/Seeders/UserSeeder')
const admins = require('./database/Seeders/AdminSeeder')


dotenv.config({ path: './.env' });

let DB = process.env.DATABASE_URL.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
DB = DB.replace('<dbname>', process.env.DATABASE_NAME);



seeder.connect(DB, () => {
    seeder.loadModels([
        './app/Models/Auth/Admin',
        './app/Models/Auth/User'
    ])

    seeder.clearModels([
        'Admin',
        'User'
    ], () => {

        seeder.populateModels(data, (err, done) => {
            if (err) {
                return console.log('seed err', done)
            }

            if (done) {
                return console.log('database seeded', done)
            }

            seeder.disconnect();
        })
    })

})

const data = [
    {
        'model': 'User',
        'documents': users
    },
    {
        'model': 'Admin',
        'documents': admins
    }
]




