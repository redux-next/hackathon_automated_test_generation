
import Admin from './Admin'
import './App.css'
import Test from './Test'
import Login from './Login'
import axios from 'axios'
import { useEffect, useState  } from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {

  const [logged , setLogged] = useState(false)


  function handleDataFromChild(data) {
    setLogged(data);
    console.log(data)
  }

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://localhost:8080/getData') 
        
      }catch(err){
        console.log(err)
      }
    }



    fetchData()
  },[])

  return (
    <> 
    {/* <Admin /> */}
    {/* {
    (logged ? <Login  sendLoggedStateToParent={handleDataFromChild}  />
    :  */}
       
       {/* <Admin /> */}

       <Routes>
       <Route path='/' exact element={(logged ? <Admin /> : <Login  sendLoggedStateToParent={handleDataFromChild}  />)  }></Route>
       <Route path='/test/:id' element={<Test />}></Route>


       </Routes>
    
    {/* ) */}
  {/* } */}
      

    </>
  )
}

export default App
