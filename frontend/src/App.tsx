import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './Pages/Auth/LoginPage'
import MainPage from './Pages/Main/MainPage'
import RegisterUser from './Pages/Auth/RegisterUser'
import { ProtectedRoutes } from './Components/Private/ProtectedRoutes'
import ChangePasswordPages from './features/ChangePasswordPages'
import VerifyResult from './Pages/Auth/VerifyResult'
import ProfileSettings from './Pages/Main/Settings/ProfileSettings'
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

      {/** RUTAS PROTEGIDAS */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/graphs" element={<GraphsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>

    </Routes>
  )
}

export default App
