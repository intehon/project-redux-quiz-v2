import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "In the movie 'Casablanca', what drink does Rick Blaine famously prepare and offer to Ilsa Lund?",
    options: ["Gin Martini", "Champagne Cocktail", "Sidecar", "French 75"],
    correctAnswerIndex: 1
  },
  {
    id: 2,
    questionText:
      "What is the signature dessert that symbolizes reconciliation and forgiveness in the book/movie 'Chocolat' by Joanne Harris?",
    options: ["Chocolate Cake", "Chocolate Truffles", "Hot Chocolate", "Chocolate Babka"],
    correctAnswerIndex: 2
  },
  {
    id: 3,
    questionText:
      "In the movie 'Sideways', which wine variety does the main character, Miles Raymond, particularly admire and obsess over?",
    options: ["Pinot Noir", "Merlot", "Chardonnay", "Cabernet Sauvignon"],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    questionText:
      "What food item does Hannibal Lecter famously associate with his chilling character in 'The Silence of the Lambs'?",
    options: ["Liver", "Brain", "Fava Beans", "Human Flesh"],
    correctAnswerIndex: 2
  },
  {
    id: 5,
    questionText:
      "Which drink is famously associated with The Dude in the movie 'The Big Lebowski'?",
    options: ["White Russian", "Black Russian", "Mojito", "Manhattan"],
    correctAnswerIndex: 0
  },
  {
    id: 6,
    questionText:
      "What is the name of the magical candy that changes flavors as you eat it in the 'Harry Potter' series?",
    options: ["Chocolate Frogs", "Fizzing Whizzbees", "Drooble's Best Blowing Gum", "Bertie Bott's Every Flavour Beans"],
    correctAnswerIndex: 3
  },
  {
    id: 7,
    questionText:
      "In the TV series 'Breaking Bad', what is the signature drink associated with the character Jesse Pinkman?",
    options: ["Vodka Red Bull", "Tequila Sunrise", "Margarita on the Rocks", "Blue Sky (Blue Crystal Meth)"],
    correctAnswerIndex: 3
  },
  {
    id: 8,
    questionText:
      "In the novel 'Charlie and the Chocolate Factory' by Roald Dahl, what's the name of the gum that Violet Beauregarde chews, leading to an unusual consequence?",
    options: ["Everlasting Gobstopper", "Three-Course Dinner Chewing Gum", "Chewy Chew", "Double Bubble"],
    correctAnswerIndex: 1
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    }
  }
});
