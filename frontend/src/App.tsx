import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './Pages/Auth/LoginPage'
import MainPage from './Pages/Main/MainPage'
import RegisterUser from './Pages/Auth/RegisterUser'
import { ProtectedRoutes } from './Components/Private/ProtectedRoutes'
import ChangePasswordPages from './features/ChangePasswordPages'
import VerifyResult from './Pages/Auth/VerifyResult'
import Profile from './Pages/Main/User/Profile'
import TasksPage from './Pages/Main/Options/TasksPage'
import GraphsPage from './Pages/Main/Options/GraphsPage'
import CalendarPage from './Pages/Main/Options/CalendarPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/change-password' element={<ChangePasswordPages />}/>
      <Route path='/register' element={<RegisterUser />}/>
      <Route path='/verify-result' element={<VerifyResult />}/>

      <Route path='/main' element={
        <ProtectedRoutes>
          <MainPage />
        </ProtectedRoutes>
      } />

      <Route path='/profile' element={ 
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      }/>

      <Route path='/tasks' element={
        <ProtectedRoutes>
          <TasksPage />
        </ProtectedRoutes>
      } />

      <Route path='/graphs' element={
        <ProtectedRoutes>
          <GraphsPage />
        </ProtectedRoutes>
      }/>

      <Route path='/calendar' element={
        <ProtectedRoutes>
          <CalendarPage />
        </ProtectedRoutes>
      }/>
    </Routes>
  )
}

export default App
