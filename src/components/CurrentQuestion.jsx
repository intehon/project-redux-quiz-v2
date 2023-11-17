import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from '../reducers/quiz';
import { Results } from './Results';

export const CurrentQuestion = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  ) 
  // const quizOver = useSelector((state) => state.quiz.quizOver)
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const totalQuestions = useSelector((state) => state.quiz.questions.length)

  const [answered, setAnswered] = useState(false) //State to track if user has answered the question
  const [selectedAnswer, setSelectedAnswer] = useState(null) // State to track users selected answer
  const [showResults, setShowResults] = useState(false) // State to control wether to show the Results component
  
  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({questionId: id, answerIndex: index}))
    setAnswered(true) //Update to indicate that user has answered question
    setSelectedAnswer(index) // Store selected index
  }

  const onNextQuestion = () => {
    if (currentQuestionIndex + 1 === totalQuestions) {
      setShowResults(true)
    } else {
        dispatch(quiz.actions.goToNextQuestion())
        setAnswered(false) // Reset for next question
        setSelectedAnswer(null) // Reset for next question 
      }
    }

  const handleSeeResults = () => {
    setShowResults(true)
  }

  const handleRestart = () => {
    dispatch(quiz.actions.restart())
    setShowResults(false)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  return (
    <>
    {!showResults &&
      <div>
        <div>
          <h1>Question: {question.questionText}</h1>
        </div> 
        <div>
          {question.options.map((answer, index) => (
            <button 
              key={answer}
              onClick={() => onAnswerSubmit(question.id, index)}
              style={{
                backgroundColor: //change background color depending on if answer is right or wrong
                answered && selectedAnswer === index ? 
                question.correctAnswerIndex === index ? 'green' : 'red' : 'inherit'
              }}>
              {answer}
            </button>
          ))}
          <div>
          <p>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
        </div>
        {answered && (
          <div>
            {selectedAnswer !== null && (
              <>
                {question.correctAnswerIndex === selectedAnswer ? (
                  <p>Your answer is correct!</p>
                ) : (
                  <p>Sorry, your answer is incorrect!</p>
                )}
                <button onClick={currentQuestionIndex + 1 === totalQuestions ? handleSeeResults : onNextQuestion}>
                {currentQuestionIndex + 1 === totalQuestions ? "Show Results" : "Next Question"}
                </button>
              </>
            )}
          </div>
        )}
        </div>
      }
      {showResults && <Results handleRestart={handleRestart}/>}
      </>
    )}