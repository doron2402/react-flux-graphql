import {MongoClient} from 'mongodb';
import config from './config';

class DBClient {
  constructor(){
    //Should try to connect to DB
  }

  connectWithPromise(){
    return new Promise((resolve, reject) => {
      if (this.db) {
        return resolve(this.db);
      } else{
        MongoClient.connect(config.mongodb, (err, db) => {
          if (err) {
            return reject(err);
          }
          this.db = db;
          return resolve(db);
        });
      }
    });
  }

  insert(documents, collectionName){
    this.connectWithPromise().then((db) => {
      let collection = this.db.collection(collectionName);
      return collection.insertMany([documents]);
    });

  }

  update(query, collectionName){
    this.connectWithPromise().then((db) => {
      let collection = this.db.collection(collectionName);
      return collection.update(query);
    });
  }

  delete(query, collectionName){
    this.connectWithPromise().then((db) => {
      let collection = this.db.collection(collectionName);
      return collection.deleteOne(query);
    });
  }

  findAll(collectionName){
    return this.connectWithPromise().then((db) => {
      let collection = db.collection(collectionName);
      return collection.find({}).toArray().then((links) => {
        return links;
      });
    });

  }

  findOne(query, collectionName){
    return this.connectWithPromise().then((db) => {
      let collection = this.db.collection(collectionName);
      return collection.findOne(query).then((links) => {
        return links;
      });
    });
  }

  getDB(){
    return this.db;
  }

}


export default new DBClient();
