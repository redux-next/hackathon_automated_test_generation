
import './Test.css'
// src/Quiz.js
import axios from 'axios';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';




// const questions = [

//   {

//     question: 'What is the capital of France?',

//     options: ['Berlin', 'Madrid', 'Paris', 'Rome'],

//     answer: 'Paris',

//   },

//   {

//     question: 'What is 2 + 2?',

//     options: ['3', '4', '5', '6'],

//     answer: '4',

//   },

//   {

//     question: 'What is the largest ocean on Earth?',

//     options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],

//     answer: 'Pacific',

//   },

// ];


const Test = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [chosen, setChosen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);
  const [res, setRes] = useState(null)

  const [loading,setLoading] = useState(false)

  const {id} = useParams()

  const handleAnswer = (option) => {

    setSelectedOption(option)

    setChosen(true)

    if (option === questions[currentQuestionIndex].answer) {

      setScore(score + 1);



    }


  

  };


  const restartQuiz = () => {

    setCurrentQuestionIndex(0);

    setScore(0);

    setIsQuizCompleted(false);

    setSelectedOption(null);

  };

  const handleNextButton=()=>{
  

    const nextQuestion = currentQuestionIndex + 1;

    if (nextQuestion < questions.length) {

      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);

    } else {

      setIsQuizCompleted(true);

    }

    setChosen(false)
  }


  // useEffect(()=>{
  //   const fetchData = async () =>{
  //     try{
  //       const response = await axios.get('http://localhost:8080/getData') 
        
  //       // console.log(response.data[0]._id)
  //       if (response.data && response.data.length > 0) {

  //           setRes(response.data[0]);

  //         console.log(response.data[0].tests[0]); // Ensure tests is defined

  //       } else {

  //         console.log('No data found');

  //         setRes(null)
  //       }
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }

  //   fetchData()
  // },[])

  // console.log(res)


  useEffect(()=>{

    const fetchData = async () =>{
      try{
        setLoading(true)
        console.log('dfdsf')
        const response = await axios.get(`http://localhost:8080/getData/${id}`) 
        
        // console.log(response.data[0]._id)

        console.log(response.data)

        setRes(response.data)

        // navigate(`/test/${response.data[0]._id


        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

    fetchData()

  },[])

  return (
    (
      loading ? <h1>loading</h1> :
<div className='main'>

<h1>Tests app</h1>

{isQuizCompleted ? (

<div>

  <h2>Quiz Completed!</h2>

  <p>Your score: {score} out of {questions.length}</p>

  <button onClick={restartQuiz}>Restart Quiz</button>

</div>

) : (

<div>

  {/* <h2>{res[currentQuestionIndex].questions}</h2> */}
  <h1>{res}</h1>

  <div className='optn_button_wrapper'>

    {res.map((option, index) => {

        let borderColor = 'white';

        if (selectedOption) {

        if (option === res[currentQuestionIndex].correctAnswer) {

            borderColor = 'green';

        } else if (option === selectedOption) {

            borderColor = 'red';

        }

        }

       return (
        <button
          className='option_button'
          key={index}
          onClick={() => handleAnswer(option)}
          style={{ border: `2px solid ${borderColor}` }}

        >

          {option}

        </button>
    )

    })}

  </div>


  {chosen && <button onClick={()=> handleNextButton()}>next</button>}

</div>

)}

</div>

    )


 

  );

};


export default Test;