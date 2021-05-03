import express from 'express'
import getMaxChangeRouter from './routes/getMaxChange'
import config from '../config/config.json'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/getMaxChange', getMaxChangeRouter);

app.listen(config.port, () => console.log('Server is running on port ' + config.port + '...'))


export default app
