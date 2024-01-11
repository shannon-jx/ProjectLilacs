import TelegramBot from 'node-telegram-bot-api';
import Reminder from './Reminder';

class Bot {

  constructor(private telegramBot: TelegramBot, private reminder: Reminder) {
  }

  startListening() {
    // /start command
    this.telegramBot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      await this.sendMessage(chatId, `Hello! Project Lilacs Bot aims to help facilitate conversations between mentors and mentees. \n \t •️ /help \t Retrieve a list of commands`);
    });

    // /help command
    this.telegramBot.onText(/\/help/, async (msg) => {
      const chatId = msg.chat.id;
      await this.sendMessage(chatId, `📋 List of Commands 📋 \n \t •️ /remindme \t Activate Prompt(s) \n \t •️ /listofprompts \t Check activated Prompt(s) \n \t •️ /listofsensors \t Check activated Sensor(s) \n *Project Lilacs Bot has a in-built feelings sensor that detects certain words that trigger a response.`);
    });

    // /remindme command
    this.telegramBot.onText(/\/remindme/, async (msg) => {
      const chatId = msg.chat.id;
      const registered = this.reminder.registerChatId(chatId);
      const replyMessage = registered
        ? 'Prompt(s) Successfully Activated'
        : 'Error: Prompt(s) is/are Already Activated'
      await this.sendMessage(chatId, replyMessage);
    });

    // /listofprompts command
    this.telegramBot.onText(/\/listofprompts/, async (msg) => {
      const chatId = msg.chat.id;
      const allReminders = this.reminder.getAllReminders();
      const replyMessage = `Active Prompt(s): \n\n ${allReminders.map(reminder => `\t •️ Name: ${reminder.name} \n \t - Time: ${reminder.humanReadableSchedule} \n \t - Message: ${reminder.message} \n \t - Image: ${reminder.image === "" ? 'NIL' : reminder.image} \n`).join('\n')} \n ${this.reminder.isChatIdRegistered(chatId) ? 'Prompts are enabled for this chat' : 'Prompts are disabled for this chat'}`;
      await this.sendMessage(chatId, replyMessage);
    });


    // /listofsensors command
    this.telegramBot.onText(/\/listofsensors/, async (msg) => {
      const chatId = msg.chat.id;
      const replyMessage = `🖋 List of Sensors 🖋 \n \t •️ sad|depressed|upset|angry|pissed|mad|dejected: \t "What factors do you think makes you feel this way?" \n \t •️ stress|stressed|overwhelming|overwhelmed: \t "It must be tough having so many things on your plate...can try this activity! :) https://www.youtube.com/watch?v=grfXR6FAsI8"`;
      await this.sendMessage(chatId, replyMessage);
    });

    // Feelings Sensor
    this.telegramBot.onText(/\b(sad|depressed|depressing|upset|angry|pissed|mad|dejected)\b/i, async (msg) => {
      const chatId = msg.chat.id;
      const replyMessage = `What factors do you think makes you feel this way?`;
      await this.sendMessage(chatId, replyMessage);
    });

    // Stress Sensor
    this.telegramBot.onText(/\b(stress|stressed|overwhelming|overwhelmed)\b/i, async (msg) => {
      const chatId = msg.chat.id;
      const replyMessage = `It must be tough having so many things on your plate...can try this activity! :) https://www.youtube.com/watch?v=x6fYqEjG-Nc`;
      await this.sendMessage(chatId, replyMessage);
    });
  }

  private async sendMessage(chatId: number, message: string) {
    return this.telegramBot.sendMessage(chatId, message);
  }
}

export default Bot;

