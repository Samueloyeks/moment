const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.admins = [
    {
        "_id": "5f8f0bc011679030853cac4a",
        "role": "super-admin",
        "active": true,
        "user": ObjectId("5f8f0bc011679030853cac49"),
        "created_at": new Date("2020-10-20T16:09:36.989Z"),
        "__v": 0
    },
    {
        "_id": "5f8f0bfe2f1c763095b72bfc",
        "role": "admin",
        "active": true,
        "user": ObjectId("5f8f0bfd2f1c763095b72bfb"),
        "created_at": new Date("2020-10-20T16:10:38.567Z"),
        "__v": 0
    }
] 