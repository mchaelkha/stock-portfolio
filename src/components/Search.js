import React, {useState, useEffect, useRef} from 'react';
import Fuse from 'fuse.js';
import _ from 'lodash';
import APIUtil from '../api/APIUtil.js';
import './Search.css';

/* Constants */
const defaultPlaceHolder = 'Search for stocks from exchanges';

/* Assets for stock API */
const util = new APIUtil();

function isNullOrUndefined(obj) {
  return !obj && obj !== 0;
}

async function update(sym, add) {
  // Two possible endpoints used depending on time of day
  let response = await util.makeDataRequest(sym);
  let data = response.data;

  // Fill in missing data (see issue: https://github.com/iexg/IEX-API/issues/1116)
  let prev = await util.getPrevious(sym);
  let quote = await util.getQuote(sym);
  data.open = isNullOrUndefined(data.open) ? prev.data.open : data.open;
  data.high = isNullOrUndefined(data.high) ? prev.data.high : data.high;
  data.close = isNullOrUndefined(data.close) ? prev.data.close : data.close;
  data.low = isNullOrUndefined(data.low) ? prev.data.low : data.low;
  data.change = isNullOrUndefined(data.change) ? prev.data.change : data.change;
  data.changePercent = isNullOrUndefined(data.changePercent) ? prev.data.changePercent : data.changePercent
  data.companyName = isNullOrUndefined(data.companyName) ? quote.data.companyName : data.companyName;
  data.latestPrice = isNullOrUndefined(data.latestPrice) ? quote.data.latestPrice : data.latestPrice;

  // If still missing values
  if (isNullOrUndefined(data.open) || isNullOrUndefined(data.high) || 
      isNullOrUndefined(data.close) || isNullOrUndefined(data.low) || 
      isNullOrUndefined(data.companyName) || isNullOrUndefined(data.latestPrice) ||
      isNullOrUndefined(data.change) || isNullOrUndefined(data.changePercent)) {
    // console.log(prev.data);
    // console.log(quote.data);
    console.log("[INFO] Unavailable; missing some data.");
  } 
  add(data, true);
}

async function receiveReferenceData() {
  return await util.makeReferenceRequest();
}

/* Assets for Fuse.js API */
// Settings
const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 10,
  maxPatternLength: 30,
  minMatchCharLength: 1,
  keys: [
    'symbol',
    'name'
  ]
};

// //

/* React components */
const SearchItem = ({name, sym, add, hide}) => (
  <li tabIndex="0"
    onClick={() => {
      update(sym, add);
      hide();
    }}
    
  >
  <b>{sym}</b> - {name} 
  </li>
)

/* Main React component */
export default function Search({add, exchanges}) {
  const [fuse, setFuse] = useState();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');


  // References for event DOM manipulation
  const searchForm = useRef();
  const searchBar = useRef();
  const searchResults = useRef();
  // //

  // Event handling
  const hideResults = () => {
    searchResults.current.style.display = 'none';
    searchForm.current.style.gridTemplateRows = '24pt';
  }

  const showResults = () => {
    searchResults.current.style.display = 'block';
    searchForm.current.style.gridTemplateRows = '24pt auto';
  }

  // mousedown event
  const handleClick = (e) => {
    if (searchBar.current.contains(e.target)) {
      if (e.target.value !== '') {
        showResults();
      }
      return;
    }
    if (searchResults.current.contains(e.target)) {
      if (searchBar.current.placeholder === '') {
        searchBar.current.placeholder = defaultPlaceHolder;
      } 
      if (searchBar.current.value !== '') {
        console.log(searchBar.current);
        searchBar.current.value = '';
      }
    }
    if (!searchForm.current.contains(e.target)) {
      searchBar.current.placeholder = defaultPlaceHolder;
      hideResults();
    }
  }

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    const fuseResults = fuse.search(e.target.value.trim());
    if (fuseResults.length > 0) {
      setResults(fuseResults);
      showResults();
    }
    if (fuseResults.length === 0 || e.target.value === '') {
      hideResults();
    }
  };

  const initIndex = async exchanges => {
    var response = await receiveReferenceData();
    var data = _.uniqBy(response.data, 'symbol');
    data = data.filter(company => exchanges.includes(company.exchange));
    setFuse(new Fuse(data, options));
  }

  // //

  // Event listeners
  useEffect(() => {
    initIndex(exchanges);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, [exchanges]);
  // //

  return (
    <div className="Search">
      <form ref={searchForm} onKeyPress={(e) => {
        if (e.key === 'Enter') {
          const activeEl = document.activeElement;
          console.log();
          if (activeEl.tagName === 'LI' && activeEl.children.length > 0 && activeEl.children[0].tagName === 'B') {
            const sym = activeEl.children[0].innerHTML;
            update(sym, add);
          }
          e.preventDefault();
        }
      }}
        onSubmit={(e) => { return false; }}
      >
        <input ref={searchBar} type="search"
          defaultValue={query} placeholder={defaultPlaceHolder}
          onClick={(e) => e.target.placeholder = ''}
          onInput={handleSearchInput}
        />
        <ul ref={searchResults}>
          {
            results.map(
              result => 
                <SearchItem
                  key={result.symbol}
                  name={result.name}
                  sym={result.symbol}
                  add={add}
                  hide={hideResults}
                />
            )
          }
        </ul>
      </form>
    </div>
  );
}
