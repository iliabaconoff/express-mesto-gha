const cardRouter = require('express').Router();
const {
  getInitialCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardRouter.post('/', createCard);
cardRouter.get('/', getInitialCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', putCardLike);
cardRouter.delete('/:cardId/likes', deleteCardLike);

module.exports = cardRouter;
