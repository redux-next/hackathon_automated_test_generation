import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export default function Admin() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {


    setFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {

    e.preventDefault()


    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fetchData = async () =>{
        try{
          const response = await axios.get('http://localhost:8080/getData') 
          
          console.log(response.data[0]._id)

          console.log(response.data[0].tests)

          localStorage.setItem('TestArray',response.data)
          navigate(`/test/${response.data[0]._id}`)



        }catch(err){
          console.log(err)
        }
      }
  
      fetchData()

      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='admin_main'>
      <p> name your test : </p>

      {/* <input type=''? */}
      <input
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <p>select your excel file :</p>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      <button onClick={(e) => handleUpload(e)}>Upload</button>

    </div>
  )

}
