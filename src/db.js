import {MongoClient} from 'mongodb';
import config from './config';
class DBClient {
  constructor(){
    MongoClient.connect(config.mongodb, (err, db) => {
      if (err) {
        throw err;
      }
      this.db = db;
    });
  }

  insert(documents, collectionName, callback){
    let collection = this.db.collection(collectionName);
    collection.insertMany([
      documents
    ], function(err, result) {
      callback(err, result);
    });
  }

  update(query, collectionName, callback){
    let collection = this.db.collection(collectionName);
    collection.updateOne(query, function(err, result) {
      callback(err, result);
    });
  }

  delete(query, collectionName, callback){
    let collection = this.db.collection(collectionName);
    collection.deleteOne(query, function(err, result) {
      callback(err, result);
    });
  }

  findAll(collectionName, callback){
    let collection = this.db.collection(collectionName);
    collection.find({}).toArray(function(err, docs) {
      callback(err, docs);
    });
  }

  findOne(query, collectionName, callback){
    let collection = this.db.collection(collectionName);
    collection.findOne(query,function(err, doc) {
      callback(err, doc);
    });
  }
}


export default new DBClient();
