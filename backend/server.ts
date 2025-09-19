import express from 'express';
import cors from 'cors';
import registerAPI from './API/users/register';
import loginAPI from './API/users/login';
import recoverPasswordAPI from './API/users/changePassword';


const PORT = 4000;
const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/api/users', registerAPI);
app.use('/api/users', loginAPI);
app.use('/api/users', recoverPasswordAPI);


app.listen(PORT, () => {
    console.log(`Aplicación corriendo en puerto http://localhost:${PORT}`);
})