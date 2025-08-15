// setupTest.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(20000);

let mongoServer: MongoMemoryServer;

export const dbConnect = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      dbName: "test",
    });
  }
};
export const dbDisconnect = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

// Limpiar collections antes de cada test
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Conectar antes de todos los tests
beforeAll(async () => {
  await dbConnect();
});

// Desconectar después de todos los tests
afterAll(async () => {
  await dbDisconnect();
});
