import React, { useEffect, useState } from 'react';

const Comments = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/comments?recipeId=${recipeId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la récupération des données');
        return res.json();
      })
      .then((data) => {
        console.log('Données des commentaires :', data);
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commentaires :', error);
        setComments([]); // Retourne un tableau vide en cas d'erreur
      });
  }, [recipeId]);

  const submitComment = () => {
    if (!newComment.trim()) return;

    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, comment: newComment }),
    })
      .then(() => {
        setComments([...comments, { comment: newComment }]); // Ajoute le commentaire localement
        setNewComment('');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      });
  };

  return (
    <div className="mt-5">
      <h3>Commentaires</h3>
      <ul className="list-group mb-4">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((c, index) => (
            <li key={index} className="list-group-item">
              {c.comment || 'Commentaire indisponible'}
            </li>
          ))
        ) : (
          <li className="list-group-item">Aucun commentaire pour cette recette.</li>
        )}
      </ul>
      <div className="form-group">
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="btn btn-primary" onClick={submitComment}>
          Ajouter un commentaire
        </button>
      </div>
    </div>
  );
};

export default Comments;
