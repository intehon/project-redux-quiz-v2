import { useState, useEffect } from "react";
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
  const [answerSubmitted, setAnswerSubmitted] = useState(false) // State to track answer submitted
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null) // State to track wether answer is correct or not
  const [progressBar, setProgressBar] = useState(0) //State to track progress
  
  const dispatch = useDispatch()

  useEffect(() => {
    setProgressBar(((currentQuestionIndex + 1) / totalQuestions) * 100)
  }, [currentQuestionIndex, totalQuestions])

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({questionId: id, answerIndex: index}))
    setAnswered(true) //Update to indicate that user has answered question
    setSelectedAnswer(index) // Store selected index
    setAnswerSubmitted(true) //update state to indicate the submitted answer

    //Check if answer is correct
    const correctIndex = question.correctAnswerIndex
    const answerCorrect = index === correctIndex
    setIsAnswerCorrect(answerCorrect) 
  }

  const onNextQuestion = () => {
    if (currentQuestionIndex + 1 === totalQuestions) {
      setShowResults(true)
    } else {
        dispatch(quiz.actions.goToNextQuestion())
        //Reset local state for next question
        setAnswered(false) 
        setSelectedAnswer(null)  
        setAnswerSubmitted(false)
      }
    }

  const handleSeeResults = () => {
    setShowResults(true)
  }

  const handleRestart = () => {
    dispatch(quiz.actions.restart())
    //return to initial state
    setShowResults(false)
    setAnswered(false)
    setSelectedAnswer(null)
    setAnswerSubmitted(false) 
  }

  const getButtonStyle = (index) => {
    if (answered && selectedAnswer === index) {
      return isAnswerCorrect ? "buttonCorrect" : "buttonIncorrect"
    }
    if (!answered) {
      return "buttonBase"
    }
    if (isAnswerCorrect === false && index === question.correctAnswerIndex) {
      return "buttonCorrectBorder"
    }
    return "buttonBase"
  }

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100
  }

  return (
    <>
      {!showResults && (
        <div className="quizContainer">
          <div className="questionContainer">
            <h1>Question: {question.questionText}</h1>
          </div>
          <div className="optionsContainer">
            {question.options.map((answer, index) => (
              <button
                key={answer}
                onClick={() => {
                  if (!answerSubmitted) {
                    onAnswerSubmit(question.id, index);
                  }
                }}
                disabled={answerSubmitted} // Disable if user already chosen an answer
                className={getButtonStyle(index)} // Use function to set class name
              >
                {answer}
              </button>
            ))}
            <div className="questionInfo">
              <p>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className="progressBar">
              <div
                className="progress"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          {answered && (
            <div className="answerFeedback">
              {selectedAnswer !== null && (
                <>
                  {question.correctAnswerIndex === selectedAnswer ? (
                    <p>Your answer is correct!</p>
                  ) : (
                    <p>Sorry, your answer is incorrect!</p>
                  )}
                  <button
                    onClick={
                      currentQuestionIndex + 1 === totalQuestions
                        ? handleSeeResults
                        : onNextQuestion
                    }
                  >
                    {currentQuestionIndex + 1 === totalQuestions
                      ? "Show Results"
                      : "Next Question"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {showResults && <Results handleRestart={handleRestart} />}
    </>
  )
}