import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY || '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {
  console.log('Goodbye!');
  process.exit();
});

async function printBotData(bot: TelegramBot) {
  const me = await bot.getMe();
  console.log("Here's your BOT details\n");

  console.table([
    { Name: 'Username', Value: me.username },
    { Name: 'ID', Value: me.id },
    { Name: 'First Name', Value: me.first_name },
  ]);
}

async function connectChat(bot: TelegramBot): Promise<number> {
  return new Promise((res) => {
    function handleUserMessage(msg: TelegramBot.Message) {
      const chatId = msg.chat.id;
      rl.write(` OK. Your Bot is now connected to your app.\n\r`);
      bot.removeListener('message', handleUserMessage);
      return res(chatId);
    }

    rl.write('\r\n');
    rl.write('Start chatting with your Bot on Telegram...');
    bot.on('message', handleUserMessage);
  });
}

function promptUser(bot: TelegramBot, chatId: number) {
  function loop() {
    rl.question('Enter your input (or type "exit" to quit): ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      // Process the user input
      try {
        await bot.sendMessage(chatId, input);
      } catch (err: any) {
        console.error('[ERROR]', err?.message);
      }

      // Prompt again for new input
      return loop();
    });
  }

  return loop();
}

// Respond to /start command
function listenBotOnStart(bot: TelegramBot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! Welcome to the chat Telegram bot!');
    bot.sendMessage(chatId, 'Please, follow the instructions on your terminal.');
  });
}

async function initialiseBot() {
  try {
    const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

    try {
      listenBotOnStart(bot);
      await printBotData(bot);

      return bot;
    } catch (err: any) {
      console.error('[ERROR] Cannot establish a TelegramBot connection.');
      console.error('[ERROR] Please, make sure you have entered a correct TELEGRAM_API_KEY.');
      console.error(err?.message || err);
      process.exit(1);
    }
  } catch (err: any) {
    console.error('[ERROR] Cannot initialize a TelegramBot instance.');
    console.error(err?.message || err);
    process.exit(1);
  }
}

(async () => {
  // Create a new instance of the TelegramBot
  const bot = await initialiseBot();

  // Connect the Bot to the App
  const chatId = await connectChat(bot);

  // Listen for terminal interaction
  return promptUser(bot, chatId);
})();
