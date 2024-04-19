/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";
const initialState = {
  attemptCount: 0,
  matchCount: 0,
  currentPair: [],
  // For now hard coding the cards.
  cards: [
    { id: 1, value: "one", flipped: false, matched: false },
    { id: 2, value: "four", flipped: false, matched: false },
    { id: 3, value: "one", flipped: false, matched: false },
    { id: 4, value: "three", flipped: false, matched: false },
    { id: 5, value: "two", flipped: false, matched: false },
    { id: 6, value: "two", flipped: false, matched: false },
    { id: 7, value: "four", flipped: false, matched: false },
    { id: 8, value: "three", flipped: false, matched: false },
  ],
};
const { state, actions } = store("phil-webs", {
  state: initialState,
  actions: {
    flip: () => {
      const { card } = getContext();
      const cardID = card.id;
      const currentIndex = state.cards.findIndex((card) => card.id === cardID);
      const updatedCard = Object.assign({}, state.cards[currentIndex]);

      // If already matched do not allow to flip
      if (card.matched || state.currentPair.length >= 2) {
        return null;
      }

      updatedCard.flipped = !card.flipped;
      state.currentPair.push(cardID);
      const newCards = state.cards.slice();
      newCards[currentIndex] = updatedCard;
      state.cards = newCards;
    },
    incrementAttempts: () => {
      state.attemptCount = state.attemptCount + 1;
    },
    incrementMatches: () => {
      state.matchCount = state.matchCount + 1;
    },
    resetCurrentPair: () => {
      state.currentPair = [];
    },
  },
  callbacks: {
    checkIsMatch: () => {
      // bail if we do not have two cards to compare
      if (state.currentPair.length < 2) {
        return null;
      }
      const firstIndex = state.cards.findIndex(
        (card) => card.id === state.currentPair[0]
      );
      const firstCard = Object.assign({}, state.cards[firstIndex]);
      const secondIndex = state.cards.findIndex(
        (card) => card.id === state.currentPair[1]
      );
      const secondCard = Object.assign({}, state.cards[secondIndex]);

      let matched = false;
      //do they match
      if (firstCard.value === secondCard.value) {
        firstCard.matched = true;
        secondCard.matched = true;
        matched = true;
      } else {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }
      //reset the current pair
      actions.resetCurrentPair();
      // update the cards state
      const newCards = state.cards.slice();
      newCards[firstIndex] = firstCard;
      newCards[secondIndex] = secondCard;
      setTimeout(() => {
        state.cards = newCards;
        actions.incrementAttempts();
        if (matched) {
          actions.incrementMatches();
        }
      }, 1000);
    },
  },
});
