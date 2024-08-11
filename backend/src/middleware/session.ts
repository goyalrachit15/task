import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

const MongoDBSession = MongoDBStore(session);

const store = new MongoDBSession({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb',
  collection: 'sessions',
});

export const sessionMiddleware = session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
});
