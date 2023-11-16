import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from '../reducers/quiz';

export const CurrentQuestion = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  ) 
  
  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({questionId: id, answerIndex: index}))
  }

  const onNextQuestion = () => {
    dispatch(quiz.actions.goToNextQuestion())
  }

  return (
    <>
      <div>
        <h1>Question: {question.questionText}</h1>
      </div> 
      <div>
        {question.options.map((answer, index) => (
          <button 
            key={answer}
            onClick={() => onAnswerSubmit(question.id, index)}>
            {answer}
          </button>
        ))}
      </div>
      <div>
        <button onClick={onNextQuestion}>Next Question</button>
      </div>
    </>
  );
};
