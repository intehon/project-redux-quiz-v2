import { useSelector } from 'react-redux'

export const Results = ({ handleRestart }) => {
    const answers = useSelector((state) => state.quiz.answers)
    const totalQuestions = useSelector((state) => state.quiz.questions.length)

    //Calculate the number of correct answers
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length

    return (
        <div>
            <h2>Your results:</h2>
            <p>Correct answers: {correctAnswers} out of {totalQuestions}</p>
            <p>Do you think you could do better?</p>
            <button
            onClick={handleRestart}
            >Restart Quiz</button>
        </div>
    )
}