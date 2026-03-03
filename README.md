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
    "discordClientId",
    "guildId",
    "leagueId"
}
```

### To get each value:
    - **token**: this is your bots authentical token, go to the discord developer portal at https://discord.com/developers/applications, select your application , go to the Bot section on the left sidebar, and click reset token, copy this token here.
    - **discordClientId**: this is your application's client ID. In the discord developer portal select your application, go to the General Information section, copy the application ID, copy this here.
    - **guildId**: this is the ID of the discord server where commands will be registered. Open discord and enable developer mode. This can be done by going to Settings --> Advanced --> Enable Developer Mode. Then right click your server icon and click copy server ID. Copy this here.
    - **leagueId**: This is the id of the mini league. Log into the fpl website and access the mini league standings. In the url you will be able to see the mini league code in the format "https://fantasy.premierleague.com/leagues/{leagueId}/standings/c". Copy this here.

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