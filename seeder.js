const seeder = require('mongoose-seed');
const dotenv = require('dotenv');
const submissionStatuses = require('./Database/Seeders/SubmissionStatusSeeder')
const adminStatuses = require('./Database/Seeders/AdminStatusSeeder')
const serviceCategories = require('./Database/Seeders/ServiceCategorySeeder')
const designations = require('./Database/Seeders/DesignationSeeder')
const comments = require('./Database/Seeders/CommentSeeder')
const faq = require('./Database/Seeders/FaqSeeder')
const businessObjects = require('./Database/Seeders/BusinessObjectSeeder')
const companyNaturesOfBusiness = require('./Database/Seeders/CompanyNatureOfBusiness')
const businessNaturesOfBusiness = require('./Database/Seeders/BusinessNatureOfBusiness')
const users = require('./Database/Seeders/UserSeeder')
const admins = require('./Database/Seeders/AdminSeeder')


dotenv.config({ path: './.env' });

let DB = process.env.DATABASE_URL.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
DB = DB.replace('<dbname>', process.env.DATABASE_NAME);



seeder.connect(DB, () => {
    seeder.loadModels([
        './Models/SubmissionStatuses',
        './Models/AdminStatuses',
        './Models/ServiceCategories',
        './Models/Designations',
        './Models/Comments',
        './Models/BusinessObjects',
        './Models/CompanyNaturesOfBusiness',
        './Models/BusinessNaturesOfBusiness',
        './Models/User',
        './Models/Admin',
        './Models/Faq'
    ])

    seeder.clearModels([
        'SubmissionStatuses',
        'AdminStatuses',
        'ServiceCategories',
        'Designations',
        'Comments',
        'BusinessObjects',
        'CompanyNaturesOfBusiness',
        'BusinessNaturesOfBusiness',
        'User',
        'Admin',
        'Faq'
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
        'model': 'SubmissionStatuses',
        'documents': submissionStatuses
    },
    {
        'model': 'AdminStatuses',
        'documents': adminStatuses
    },
    {
        'model': 'ServiceCategories',
        'documents': serviceCategories
    },
    {
        'model': 'Designations',
        'documents': designations
    },
    {
        'model': 'Comments',
        'documents': comments
    },
    {
        'model': 'BusinessObjects',
        'documents': businessObjects
    },
    {
        'model': 'CompanyNaturesOfBusiness',
        'documents': companyNaturesOfBusiness
    },
    {
        'model': 'BusinessNaturesOfBusiness',
        'documents': businessNaturesOfBusiness
    },
    {
        'model': 'User',
        'documents': users
    },
    {
        'model': 'Admin',
        'documents': admins
    },
    {
        'model': 'Faq',
        'documents': faq
    }
]




