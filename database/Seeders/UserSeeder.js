
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.users = [
    {
        "id": "5f8f0bc011679030853cac49",
        "role": "admin",
        "type": "email",
        "verified": false,
        "active": true,
        "fullName": "super admin",
        "email": "super@admin.com",
        "phone": "09000000000",
        "slug": "wkhem239gnrv8kify2mkqq",
        "password": "12345678",
        "created_at": new Date("2020-10-20T16:09:36.303Z"),
        "updated_at": new Date("2020-10-20T16:09:36.303Z"),
        "__v": 0,
        "adminId": ObjectId("5f8f0bc011679030853cac4a")
    },
    {
        "_id": "5f8f0bfd2f1c763095b72bfb",
        "role": "admin",
        "type": "email",
        "verified": false,
        "active": true,
        "fullName": "user admin",
        "email": "user@admin.com",
        "phone": "09000000000",
        "slug": "8kwwi6r2lw2nhfva9hm7cs",
        "password": "12345678",
        "created_at": new Date("2020-10-20T16:10:37.845Z"),
        "updated_at": new Date("2020-10-20T16:10:37.845Z"),
        "__v": 0,
        "adminId": ObjectId("5f8f0bfe2f1c763095b72bfc")
    },
    {
        "_id": "5f9e609711b13000040b8934",
        "role": "user",
        "type": "email",
        "verified": false,
        "active": true,
        "fullName": "demo user",
        "email": "user@aeg.com",
        "phone": "09000000000",
        "slug": "8kwwi6r2lw2nhfva9hm7cT",
        "password": "12345678",
        "created_at": new Date("2020-10-20T16:10:37.845Z"),
        "updated_at": new Date("2020-10-20T16:10:37.845Z"),
        "__v": 0,
    }
] 