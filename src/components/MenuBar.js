import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/icons/Menu';
import './MenuBar.css';

const availableExchanges = ['ASE', 'BATS', 'IEXG', 'NAS', 'NYS', 'OTC', 'PSE'];
const defaultHelpText = 'Help';
const altHelpText = 'Hide Help';
const defaultHelpDescription = `Search for stocks to add to the table by
typing a stock ticker or company name. Then click on a result from the
search or using tab and enter to select. Sort the table by clicking the
column headings. Delete an entry using the delete button of the corresponding
row.`
const defaultExchangeText = 'Set Exchanges';
const altExchangeText = 'Hide Exchanges';

export default function MenuBar({exchanges, setExchanges}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showExchanges, setShowExchanges] = useState(false);

  const handleHelpClick = e => {
    setShowHelp(!showHelp);
    e.target.innerHTML = e.target.innerHTML === defaultHelpText ?
                          altHelpText : defaultHelpText;
  }

  const handleExchangeClick = e => {
    setShowExchanges(!showExchanges);
    e.target.innerHTML = e.target.innerHTML === defaultExchangeText ?
                          altExchangeText : defaultExchangeText;
  }

  const handleCheckChange = e => {
    const value = e.target.value;
    var exchangesCopy = [...exchanges];
    if (exchanges.includes(value)) {
      exchangesCopy.splice(exchangesCopy.indexOf(value), 1);
    } else {
      exchangesCopy.push(value);
    }
    setExchanges(exchangesCopy);
  };

  return (
    <div className="menu-bar">
      <div className="menu-header">
        <IconButton onClick={() => {
            setShowSettings(!showMenu && showSettings ? false : showSettings);
            setShowMenu(!showMenu);
          }}>
          <Menu />
        </IconButton>
        <IconButton aria-label="settings" onClick={() => {
            setShowMenu(!showSettings && showMenu ? false : showMenu);
            setShowSettings(!showSettings);
          }}>
          <Settings />
        </IconButton>
      </div>
      { showMenu &&
        <div className="left-menu-bar">
          <a href="https://github.com/mxk5025/Stock-Portfolio#stock-portfolio"
            target="_blank" rel="noopener noreferrer">
            About
          </a>
          <span id="help" onClick={handleHelpClick}>
            { showHelp ? altHelpText : defaultHelpText }
          </span>
          { showHelp &&
            <div className="text-container">
              <p id="help-text">{defaultHelpDescription}</p>
            </div>
          }
          <a href="https://github.com/mxk5025/Stock-Portfolio/issues"
            target="_blank" rel="noopener noreferrer">
            Feedback
          </a>
          <a href="https://github.com/mxk5025/" target="_blank"
            rel="noopener noreferrer">
            Contact
          </a>
        </div>
      }
      { showSettings &&
        <div className="right-settings-bar">
          <FormControl component="fieldset">
            <FormLabel component="legend" onClick={handleExchangeClick}
              style={{ padding: '10px 5px', color: '#000', cursor: 'pointer' }}>
              { showExchanges ? altExchangeText : defaultExchangeText }
            </FormLabel>
            { showExchanges &&
              <FormGroup onChange={handleCheckChange}
                style={
                  {
                    paddingTop: '-5px',
                    paddingLeft: '15px',
                    marginTop: '-5px',
                    marginLeft: '15%',
                    border: '1px',
                    borderLeftStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.54)',
                    backgroundColor: '#ddf4f7'
                  }
                }
              >
                {
                  availableExchanges.map(ex =>
                    <FormControlLabel
                      key={ex}
                      value={ex}
                      label={ex}
                      labelPlacement="end"
                      checked={exchanges.includes(ex)}
                      control={
                        <Checkbox color={ex === 'NAS' || ex === 'NYS' ?
                          'secondary' : 'primary'} style={{ fontSize: '10pt' }}
                        />
                      }
                    />
                  )
                }
              </FormGroup>
            }
          </FormControl>
        </div>
      }
    </div>
  );
}
