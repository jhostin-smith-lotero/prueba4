import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  (global as any).__MONGOD__ = mongod;
  process.env.MONGO_URI = uri;          // disponible para tu AppModule.forRootAsync
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
};
