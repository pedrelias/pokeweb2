const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Inicializa o Firebase Admin SDK
const serviceAccount = require("./pokeweb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors( ));
app.use(express.json());

// Rota para buscar os Pokémons do Firestore
app.get("/pokemons", async (req, res) => {
  try {
    const snapshot = await db.collection("Pokemons").get();
    console.log("Pokémons encontrados:");
    const pokemons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Pokémons", details: error.message });
  }
});

//Adicionar pokemon
app.post("/pokemons", async (req, res) => {
    try {
      console.log("Recebido na API:", req.body);
      const {nome, tipo1, tipo2, chanceCaptura, imagemUrl } = req.body;
  
      if (!nome || !tipo1 || chanceCaptura === undefined) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes!" });
      }

      const newPokemon = {
        nome,
        tipo1,
        tipo2: tipo2 || null,
        chanceCaptura,
        imagemUrl: imagemUrl || "", 
      };
      await db.collection("Pokemons").doc(nome).set(newPokemon);
      res.status(201).json({ message: "Pokémon adicionado com sucesso!", pokemon: newPokemon });
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar Pokémon", details: error.message });
    }
  });

// Rota para Deletar um Pokémon  
app.delete("/pokemons/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      await db.collection("Pokemons").doc(id).delete();
      
      res.status(200).json({ message: `Pokémon ${id} deletado com sucesso!` });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar Pokémon", details: error.message });
    }
  });


// Rota para buscar um Pokémon aleatório
app.get("/pokemons/random", async (req, res) => {
  try {
    const snapshot = await db.collection("Pokemons").get();
    const pokemons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    if (pokemons.length === 0) {
      return res.status(404).json({ error: "Nenhum Pokémon encontrado" });
    } 

    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    res.status(200).json(randomPokemon);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Pokémon aleatório", details: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
