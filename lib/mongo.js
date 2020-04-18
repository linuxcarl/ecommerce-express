const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASS}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true })
        this.dbName = DB_NAME;
    }
    connect() {
        console.log(this.dbName);
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err)
                    reject(err)
                console.log("conected succesfully to mongo");
                resolve(this.client.db(this.dbName));
            })

        });
    }

    getAll(collection, query) {
        return this.connect()
            .then(db => db.collection(collection).find(query).toArray())
    }
    getOne(collection, id) {
        return this.connect()
            .then(db => db.collection(collection).findOne({ _id: ObjectId(id) }) )
    }
    create(collection, data) {
        return this.connect()
            .then(db => db.collection(collection).insertOne(data))
            .then(res => res.insertedId);
    }
    update(collection, data, id) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
            })
            .then(res => res.upsertedId || id);
    }
    delete(collection, id) {
        return this.connect()
            .then(db => db.collection(collection).deleteOne({ _id: ObejectId(id) }))
            .then( () => id);
    }
}
module.exports = MongoLib;