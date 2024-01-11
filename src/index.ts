import TelegramBot from 'node-telegram-bot-api';
import Reminder from './Reminder';
import reminders from './reminders.json';
import Bot from './Bot';
import express from 'express';
import * as http from 'http';

require('dotenv').config();
const fetch = require('node-fetch');
const app = express();

app.set('port', process.env.PORT || 5000);

const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const reminder = new Reminder(reminders, telegramBot);

const reminderBot = new Bot(telegramBot, reminder);
reminderBot.startListening();

app.get('/', (request, response) => {
  console.log('Called http endpoint /');
  response.send(JSON.stringify(reminders));
});

app.all('*', (request, response) => {
  console.log('Unknown endpoint, redirecting to /');
  response.redirect('/');
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Application is running on port ${app.get('port')}`);
});
export default server;
