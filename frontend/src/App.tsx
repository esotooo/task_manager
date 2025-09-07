import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import { ProtectedMain } from './Components/Private/ProtectedMain'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/main' element={
        <ProtectedMain>
          <MainPage />
        </ProtectedMain>
        } />
    </Routes>
  )
}

export default App
