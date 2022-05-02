require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();

app.listen(port, () => console.log('Active port', port));

const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handlers')
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_client = require('twilio')(accountSID, authToken);

/*Enviar mensajes de texto */
twilio_client.messages.create({
  body: 'Prueba Mensaje de Texto',
  from: '+19894871216',
  to: '+573215711227'
}).then(message => console.log(message.sid));

/* SENDGRID */
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/api/email/confirmacion', async (req, res, next)=> {
  try{
    res.json(await email.sendOrder(req.body))
  } catch (error){
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode= err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});

/* SENDGRID */
mongoose
  .connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Sucess connect with mongo'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);
