import {ReminderMessage} from './ReminderMessage';
import {Job, scheduleJob} from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';

class Reminder {

  private readonly chatIds: number[] = [];
  private readonly scheduledJobs: Job[] = [];

  constructor(private readonly reminders: ReminderMessage[], private readonly bot: TelegramBot) {
  }

  registerChatId(chatId: number): boolean {
    if (this.chatIds.includes(chatId)) {
      console.log(`Chat id ${chatId} is already registered`);
      return false;
    }
    this.chatIds.push(chatId);
    console.log(`Registered chat id ${chatId}`);
    this.reminders.forEach(reminder => {
      this.scheduledJobs.push(
        scheduleJob(
          reminder.name,
          reminder.schedule,
          async () => {
          await (reminder.image === undefined || reminder.image === "") ? 
            this.bot.sendMessage(chatId, `${reminder.message}`) :
            this.bot.sendPhoto(chatId, `${reminder.image}`, { caption: `${reminder.message}` } );
          console.log('Sent reminder to chat id', chatId);
        }));
      console.log('Scheduled reminder for chat id', chatId);
    });
    return true;
  }

  getAllReminders() {
    return this.reminders;
  }

  isChatIdRegistered(chatId: number) {
    return this.chatIds.includes(chatId);
  }
}

export default Reminder;