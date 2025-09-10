import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './Pages/Auth/LoginPage'
import MainPage from './Pages/Main/MainPage'
import ChangePassword from './Pages/Auth/changePassword'
import RegisterUser from './Pages/Auth/registerUser'
import { ProtectedMain } from './Components/Private/ProtectedMain'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/change-password' element={<ChangePassword />}/>
      <Route path='/register' element={<RegisterUser />}/>
      <Route path='/main' element={
        <ProtectedMain>
          <MainPage />
        </ProtectedMain>
        } />
    </Routes>
  )
}

export default App
