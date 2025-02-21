import { useEffect } from 'react'
import './App.css'
// import Login from './components/auth/Login'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/AppRoutes'

function App() {
  useEffect(()=>{
    async function DataFetcher(){
      const rawResponse=await fetch(`http://localhost:3000`)
      const jsonResponse=await rawResponse.json()
      console.log(jsonResponse)
      /*
      @muhammedsirajudeen
      Although its inside the container just call directly to localhost 
      */
    }
    DataFetcher()
  },[])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
