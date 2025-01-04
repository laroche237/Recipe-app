const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');//gérer les fichiers envoyés
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());



// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recipes_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});



//configurer les fichiers
const upload = multer({
Storage:multer.memoryStorage(),//stocker l'image en mémoire temporaire
});

// Configurer le dossier des fichiers statiques
app.use('/uploads', express.static('uploads'));

// Route pour récupérer toutes les recettes
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) return res.status(500).send(err);

    // Convertir les photos en Base64
    const recipes = results.map((recipe) => {
      if (recipe.photo) {
        // Convertir en Base64
        const base64Photo = recipe.photo.toString('base64');
        recipe.photo = `data:image/jpeg;base64,${base64Photo}`;

        //console.log(`Photo Base64 pour ${recipe.title}:`, recipe.photo); // Debug
      }
      return recipe;
    });
    res.json(recipes);
  });
    
});

// Route pour récupérer une recette par ID
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params; // Récupérer l'id depuis l'URL
  const query = 'SELECT * FROM recipes WHERE id = ?'; // Requête SQL

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de la base de données', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    const recipe = result[0];

    // Si une photo est présente, la convertir en Base64
    if (recipe.photo) {
      const base64Photo = recipe.photo.toString('base64');
      recipe.photo = `data:image/jpeg;base64,${base64Photo}`;
    }

    // Retourner la recette avec la photo en Base64
    res.json(recipe);
  });
});


// Route pour ajouter une recette
app.post('/recipes', upload.single("photo"), (req, res) => {
  
  const { title, description, ingredients, instructions, cooking_time, category } = req.body;
  const photo = req.file ? req.file.buffer : null;//données binaire de l'image, vérifier si une photo est envoyé

  if (!photo) {
    return res.status(400).send('Aucunne photo uploadé');
}
console.log(req.file.buffer) 
 // console.log("requête :", req.body);
  db.query(
    'INSERT INTO recipes (title, description, ingredients, instructions, cooking_time, category, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description, ingredients, instructions, cooking_time, JSON.stringify(category), photo],
    (err, results) => {
      if (err){
      console.error("error during insertion :", err);
      return res.status(500).send(err);}
      if(results.affectedRows>0)  {
        res.json({ id: results.insertId, ...req.body });
        
      }   
      else{
        res.status(500).json({message:'no rows were affected'});
      }
    }
  );
  
});

//Route pour modifier une recette
app.put('/recipes/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;

  const { title, description, ingredients, instructions, cooking_time, category} = req.body;
  const photo = req.file ? req.file.buffer : null;//données binaire de l'image, vérifier si une photo est envoyé
  console.log(req.body);
  
  const sql = `UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, cooking_time = ?, category = ?, photo= ? WHERE id = ?`;
  db.query(sql, [title, description, ingredients, instructions, cooking_time, JSON.stringify(category), photo, id], (err, result) => {
    if (err) {
      console.error('Erreur serveur:', err);
      return res.status(500).send({ error: 'Erreur serveur' });
    }
    res.send({ message: 'Recipe updated successfully', data: req.body });
    console.log(result);

  });
});



//route pour supprimer une recette
app.delete('/recipes', (req,res) => {
const {ids}=req.body;
const placeholders = ids.map(() => "?").join(",");
const sql =  `DELETE FROM recipes WHERE id IN (${placeholders})`;
db.query(sql, ids
 , 
  (err, results) => {
    if (err)return res.status(500).send(err);
    return res.json({ id: results.insertId, ...req.body });  
  }
);
}
);

// Endpoint pour récupérer les commentaires pour une recette
app.get('/comments', (req, res) => {
  const { recipeId } = req.query;

  if (!recipeId) {
    return res.status(400).json({ error: 'L\'ID de la recette est requis' });
  }

  const query = 'SELECT * FROM comments WHERE recipeId = ? ORDER BY created_at DESC';
  db.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des commentaires :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);
  });
});

// Endpoint pour ajouter un nouveau commentaire
app.post('/comments', (req, res) => {
  const { recipeId, comment } = req.body;

  if (!recipeId || !comment.trim()) {
    return res.status(400).json({ error: 'L\'ID de la recette et le commentaire sont requis' });
  }

  const query = 'INSERT INTO comments (recipeId, comment, created_at) VALUES (?, ?, NOW())';
  db.query(query, [recipeId, comment], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du commentaire :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.status(201).json({ message: 'Commentaire ajouté avec succès' });
  });
});


let mealsplans=[];
//Ajouter un repas à une date
app.post('/meals', (req, res) => {
 const {recipeId, recipe_title, planDate}=req.body;
 
 //Vérifier si la recette est déja planifiée
 /*const existignplan = mealsplans.find(plan => plan.recipe_id === recipeId && plan.plan_date === plan_date);

 if(existignplan){
  return res.status(400).json({message : "cette recette est déja planifiée pour cette date"});}*/
 
/* if(!recipeId || !plan_date ){
  return res.status(400).json({message: 'tous les champs sont requis'});
 }*/

 //Ajouter la planification
 const query = 'INSERT INTO meal_plan (recipe_id, recipe_title, plan_date) VALUES (? ,?,  ?)';
 db.query(query, [recipeId, recipe_title, planDate], (err, result) =>{
  if (err) {
  console.error(err);
  return res.status(500).json({message:'Erreur lors de l\'insertion dans le planificateur.'});
} 
  res.status(201).json({message: 'Repas planifié avec succès.', planId:result.insertId});


}

 );

});

//Récupérer les recettes planifiés 
app.get('/meals', (req,res)=>{
 
  db.query('SELECT * FROM meal_plan', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({message:'Erreur lors de l\'affichage du planificateur.'});
    } 
    res.json(results);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
