import express from 'express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import config from './config';
import DBClient from './db';
import router from './router';

let app = express();

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/graphql', GraphQLHTTP({
    schema: schema,
    graphiql: true
  }))
  .use((err, req, res, next) => {
    if (err){
      console.error(err);
    }
    return res.status(400).json({code: 'error', error: err});
  })
  .use('/',express.static('src/public'))
  .use(router)

  .listen(config.server.port, (err) => {
    if (err){
      throw err;
    }
    console.log(`Listen on PORT: ${config.server.port}`);
  });
