# Stock Portfolio

React application connecting to IEX Cloud API endpoints to procure and
tabularize stock information. Search for stocks by ticker or company name and
dynamically modify the table. Learned and researched asynchronous JavaScript
and React hooks, while employing open-source libraries. Focused on UI design
and presentation for ease of use by adding interactive menus.

## Installation

Install node.js, add to path.

Install git, add to path.

Install yarn depending on your OS.

then
```
git clone https://github.com/mxk5025/stock-portfolio.git
cd stock-portfolio
```

If using npm
```
npm install
```

If using yarn
```
yarn
```

## Running in dev mode

Create a .env file at the top directory and initialize REACT_APP_STOCK_API_KEY.
An API key can be received at https://iexcloud.io/ by creating a free account.
```
REACT_APP_STOCK_API_KEY=YOUR_KEY
```

To run a development server:

If using npm
```
npm start
```

If using yarn
```
yarn start
```

## Built With


* [IEX Cloud](https://iexcloud.io/) - financial data endpoints.
* [React](https://reactjs.org/) - JavaScript UI library.
* [Fuse.js](https://fusejs.io/) - fuzzy-search library.
* [axios](https://github.com/axios/axios) - HTTP client.
* [luxon](https://moment.github.io/luxon/) - Wrapper for JavaScript dates and times.
* [Lodash](https://lodash.com/) - JavaScript utility library.
* [MaterialUI](https://material-ui.com/) - React component library.
* [Simple Icons](https://simpleicons.org) - SVG icons for popular brands.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/mxk5025/stock-portfolio/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Michael Kha** - *creator* - [mxk5025](https://github.com/mxk5025)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
