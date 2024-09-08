import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [questions , setQuestions] = useState([])
  const [questionsState , setQuestionsState] = useState(0)

  const inputVal = useRef([])

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
    .then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    })
    .catch((err) => {
console.log(err);

    })
  } , [])

const nextQuestion = (() => {
  const checkedButton = inputVal.current.find(input => input.checked);
  if(checkedButton){
    const selectedValue = checkedButton.value;
    console.log("Selected answer:", selectedValue);
  }
  
  questionsState < questions.length - 1 ? setQuestionsState(questionsState + 1) : alert("Quiz Questions End")

  
})


return(
  <>
  <h1>Quiz App</h1>
  {questions.length > 0 ? <div>
   <h1>Q{questionsState + 1}: {questions[questionsState].question.text}</h1>
   <ul>
    {[...questions[questionsState].incorrectAnswers , questions[questionsState].correctAnswer].map((item , index) => {
      return <li key={index}>
        <input type="radio" name='choice' id={item} value={item} ref={el => (inputVal.current[index] = el)} />
        <label htmlFor={item}>{item}</label>
      </li>
    })}
   </ul>
   <button onClick={() => nextQuestion()}>Next</button>
  </div> : <h1>Loading...</h1>}
  
  </>
)



}
export default App