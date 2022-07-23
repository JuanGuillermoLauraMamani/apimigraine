import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://guille:8301405gl@cluster0.gaubm.mongodb.net/migrañas?retryWrites=true&w=majority",
  PORT: process.env.PORT || 4000,
  SECRET: process.env.SECRET || 'apimigraine'
};

//mongodb://localhost/apimigrañas
//mongodb+srv://guille:8301405gl@cluster0.gaubm.mongodb.net/?retryWrites=true&w=majority
