const cardRouter = require('express').Router();
const {
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
  getAllCards,
} = require('../controllers/cards');

cardRouter.post('/', createCard);
cardRouter.get('/', getAllCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
