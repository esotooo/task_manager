import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './Pages/Auth/LoginPage'
import MainPage from './Pages/Main/MainPage'
import RegisterUser from './Pages/Auth/RegisterUser'
import { ProtectedMain } from './Components/Private/ProtectedMain'
import ChangePasswordPages from './features/ChangePasswordPages'
import VerifyResult from './Pages/Auth/VerifyResult'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/change-password' element={<ChangePasswordPages />}/>
      <Route path='/register' element={<RegisterUser />}/>
      <Route path='/verify-result' element={<VerifyResult />}/>
      <Route path='/main' element={
        <ProtectedMain>
          <MainPage />
        </ProtectedMain>
        } />
    </Routes>
  )
}

export default App
