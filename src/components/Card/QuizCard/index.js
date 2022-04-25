import { useState, useEffect } from 'react'
import './QuizCard.css'

// Use "He" to decode HTML entities
import he from 'he'

const QuizCard = ({ quiz, updateScore, score }) => {
  const [answers, setAnswers] = useState([])
  const [wrongAnswers, setWrongAnswers] = useState([])

  // Shuffle the answers
  useEffect(() => {
    setAnswers(
      [quiz.correct_answer, ...quiz.incorrect_answers].sort(
        (a, b) => 0.5 - Math.random()
      )
    )
    setWrongAnswers([])
  }, [quiz])

  // Check whether answer is true or false
  // If the answer is false, add it to the wrongAnswers array
  // The answers in this array will be disabled
  const handleClick = (answer, index) => {
    if (answer === quiz.correct_answer) {
      updateScore(score)
    } else {
      setWrongAnswers([...wrongAnswers, index])
    }
  }

  return (
    <div className="cardContainer">
      <div className="question">
        <p>{he.decode(quiz.question)}</p>
      </div>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="answer-btn"
            disabled={wrongAnswers.includes(index)}
            onClick={() => handleClick(answer, index)}
          >
            {he.decode(answer)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizCard