# 🌦️ Weather.App

[![Nodemon Version](https://img.shields.io/npm/v/nodemon.svg)](https://www.npmjs.com/package/nodemon) [![Concurrently Version](https://img.shields.io/npm/v/concurrently.svg)](https://www.npmjs.com/package/concurrently) [![wait-on Version](https://img.shields.io/npm/v/wait-on.svg)](https://www.npmjs.com/package/wait-on)

## 🚀 Description

Weather.App is a web application that utilises openWeather's API in order to retrieve weather data around specific cities. The application allows user's to input a specific city into an inputfield, and retrieves weather information over a 5 day period for that city, whilst also creating a history section so they can refer to previous searches...

### 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Walkthrough](#walkthrough)
- [Questions](#questions)
- [License](#license)

## 🔌 Installation

> [!IMPORTANT]
> This application will require users to use terminal (Mac) or GitBash (Windows)🚨.

1. Clone project using `git clone` from this like [Here](https://github.com/shareefevans/Weather.Application)
2. Open the project folder in a text editor such as `VS Code` or an alternative editor
3. Open the command line/terminal/gitbash and navigate to the appropriate folder within `Weather.Application` labelled Develop that contains a `package.json` file
4. Run `npm i` to install any dependencies in command line/terminal/gitbash
5. Run `npm run start:dev` in command line/terminal/gitbash
6. A `dist` file should be created and the application should open in your browser, `listening from port 3001`

### Important Commands

```
git clone
npm i (OR) npm install
npm run start:dev
```

## 👍 Usage

1. Once the program is up an running enter a city name into the input field
2. Once entered, and the search button is clicked the city's wearther should populate
3. Once eneted the history tab should also contain the city name entered
4. User's also have the ability to delete items from history once they've been entered

## ➕ Contributing

[Contributor Covenant](https://www.contributor-covenant.org/)

## ✅ Tests

- Open application
- Input `San Diego`
- Click search
- Weather data should display over a 5 day period

## ❌ Known Issues

The main difficulties surfaced around the code within the weather.service module. The reason being it kept calling a destructuring error, meaning the application was not able to retrieve the data once the city's name had been entered into the input field. I attempted sourcing stackoverflow, as well as resorting to using AI to attempt to complete the task however the code became convoluted and still was calling the same error in the console!

## ❓ Questions

### Github profile below 👇

- GitHub Name: shareefevans
- GitHub Link: [Follow link here](https://github.com/shareefevans)

### Contact Me

- Email: *shareef3vans@gmail.com*

## 🏆 License

This is an unlicensed project

- [MIT license 01](http://rem.mit-license.org)
- [MIT license 02](https://raw.githubusercontent.com/jeffbski/wait-on/master/LICENSE)
