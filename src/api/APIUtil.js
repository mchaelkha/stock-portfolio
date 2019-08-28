import axios from 'axios';
import { DateTime } from 'luxon'; // convert local dates to EST

const refUrl = 'https://cloud.iexapis.com/stable/ref-data/symbols';
const exchangeUrl = 'https://cloud.iexapis.com/stable/ref-data/market/us/exchanges'
const baseUrl = 'https://cloud.iexapis.com/stable/stock/';
const previousEndPt = '/previous';
const quoteEndPt = '/quote';
const key = '?token=' + process.env.REACT_APP_STOCK_API_KEY; // production

console.log(key);

export default class APIUtil {

  async get(url) {
    try {
      return await axios.get(url);
    } catch (error) {
      console.log(error);
    }
  }

  createUrl(symbol, endpoint) {
    return baseUrl + symbol + endpoint + key;
  }

  isMarketOpen(hours, minutes) {
    return hours === 9 ? minutes >= 30 : hours >= 9 && hours < 16;
  }

  makeDataRequest(symbol) {
    const estDate = DateTime.local().setZone('America/New_York');
    return this.isMarketOpen(estDate.hour, estDate.minute) ?
      this.getQuote(symbol) :
      this.getPrevious(symbol);
  }

  getQuote(symbol) {
    return this.get(this.createUrl(symbol, quoteEndPt));
  }

  getPrevious(symbol) {
    return this.get(this.createUrl(symbol, previousEndPt));
  }

  makeReferenceRequest() {
    return this.get(refUrl + key);
  }

  makeExchangesRequest() {
    return this.get(exchangeUrl + key);
  }

}
