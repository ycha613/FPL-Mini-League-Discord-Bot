# FPL-Mini-League-Discord-Bot
Discord bot that provides commands that give access to information on league standings, and transfers on an fpl mini league.


## Installation

**Prerequisites**
* Node.js v18 +
* npm


**Setup**
Clone the repository
```shell
git clone https://github.com/ycha613/FPL-Mini-League-Discord-Bot.git
cd fpl-mini-league-discord-bot
```

Install dependencies
```shell
npm install
```


## Configuration

Before running the bot you must create a configuration file. In the root directory create a data folder, and insde a file called config.json (data/config.json).
Fill in the file with the following json.
```shell
{
    "token": "",
    "discordClientId": "",
    "guildId": "",
    "leagueId": ""
}
```

### Where to Get Each Configuration Value

#### **token**
Your bot’s authentication token.

1. Go to the Discord Developer Portal:  
   https://discord.com/developers/applications
2. Select your application.
3. Click **Bot** in the left sidebar.
4. Click **Reset Token** (or **Copy Token** if already generated).
5. Copy the token and paste it into `config.json`.

**Important:** Never share your bot token publicly.

#### **discordClientId**
Your application’s Client ID.

1. Go to the Discord Developer Portal.
2. Select your application.
3. Click **General Information**.
4. Copy the **Application ID**.
5. Paste it into `config.json` as `discordClientId`.

#### **guildId**
The ID of the Discord server where slash commands will be registered.

1. Open Discord.
2. Go to **User Settings → Advanced**.
3. Enable **Developer Mode**.
4. Right-click your server icon.
5. Click **Copy Server ID**.
6. Paste it into `config.json` as `guildId`.

#### **leagueId**
The ID of your Fantasy Premier League mini-league.

1. Log in at:  
   https://fantasy.premierleague.com/
2. Open your mini-league standings page.
3. Look at the URL. It will be in the format: https://fantasy.premierleague.com/leagues/{leagueId}/standings/c
4. Copy the number in place of `{leagueId}`.
5. Paste it into `config.json` as `leagueId`.


## Execution

**Development**
Running the bot with automatic reload on file changes.
```shell
npm run dev
```

**Production**
Build the typescript code and and run the compiled javascript from dist/, this will clean the dist/ folder
```shell
npm run start
```

## Usage

**Commands**
## Commands

### `/ids`
Lists the FPL manager IDs of all players in the configured mini-league.

### `/id <name>`
Returns the FPL manager ID for a player in the mini-league, given their name.

**Example:**
```shell
/id John
```

### `/leaderboard`
Displays the 10 managers in the mini-league including: total points, current rank, rank change (up / down movement).

### `/transfers <id> [gameweek]`
Displays transfers made by a manager.
    -If no gameweek is provided, shows transfers from the last 5 gameweeks.
    -If a gameweek is provided, shows transfers for that specific gameweek only.

**Example:**
```shell
/transfers 123456

/transfers 123456 21
```