# Telegram Chat Bot App

This is a Node.js application that acts as a chat bot for Telegram.

- [Telegram Chat Bot App](#telegram-chat-bot-app)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Send messages from your Telegram Bot using your terminal

## Getting Started

To run the Telegram Chat Bot app locally, follow these steps:

1. Clone the repository:

    ```shell
    $ git clone https://github.com/andreasonny83/telegram-chat-bot.git
    ```

2. Install the dependencies:

    ```shell
    $ npm install
    ```

3. Obtain a Telegram Bot API token:

    Create a new bot using the BotFather on Telegram.
    Obtain the API token for your bot.

4. Configure your environment variables

    The application can be configured using environment variables.

    Create a .env file in the project root directory by copying the
    sample file `.env.sample`.

    `TELEGRAM_API_TOKEN`: The Telegram Bot API token for your bot.

## Usage

Run the bot locally

```shell
$ npm start
```

After the bot is currently running on your machine, you will be able to send
messages to your Telegram bot from your terminal.

## Contributing

Contributions to the Telegram Chat Bot app are welcome!
If you find a bug or have an idea for an improvement, please create an issue or submit a pull request.

## License
This project is licensed under the MIT License.