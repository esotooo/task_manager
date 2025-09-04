import express from 'express';
import cors from 'cors';
import registerAPI from './API/users/register';
import loginAPI from './API/users/login';

const PORT = 4000;
const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/users', registerAPI);
app.use('/api/users', loginAPI);


app.listen(PORT, () => {
    console.log(`Aplicación corriendo en puerto http://localhost:${PORT}`);
})