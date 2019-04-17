import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
const app = express();
import routes from './routes';

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// Home
app.get('/', (req, res) => {
    res
        .json('Welcome to Alethio API');
})

app.get('error', (req, res, next) => {
    return next('Error occured');
})

app.use('/api', routes);

// Not found
app.use((req, res, next) => {
    return res.status(404).send({msg: 'Url not found'});
})

// Error
app.use((err, req, res, next) => {
    return res.status(500).send({msg: 'Error', trace: err});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
})