import React, {useState} from 'react';
import Icon from '@iconify/react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import gitHubIcon from '@iconify/icons-simple-icons/github';
import htmlIcon from '@iconify/icons-simple-icons/html5';
import cssIcon from '@iconify/icons-simple-icons/css3';
import javaScriptIcon from '@iconify/icons-simple-icons/javascript';
import nodeIcon from '@iconify/icons-simple-icons/nodejs';
import reactIcon from '@iconify/icons-simple-icons/react';
import materialDesignIcon from '@iconify/icons-simple-icons/materialdesign';
import simpleIconsIcon from '@iconify/icons-simple-icons/simpleicons';
import iexCloudLogo from '../images/logo-black.svg';
import lodashLogo from '../images/lodash.svg';
import './PortfolioFooter.css';

const defaultWidth = 24;
const defaultHeight = 24;

export default function PortfolioFooter() {
  const [showStack, setShowStack] = useState(false);

  return (
    <footer>
      <div className="link-container">
        <div className="powered-container">
          <b>Powered by &nbsp;</b>
          <a href="https://iexcloud.io" target="_blank" rel="noopener noreferrer">
            <img id="iex-cloud-logo" src={iexCloudLogo} alt="" />
            </a>
        </div>
        <div className="show-stack-container">
          <a href="https://github.com/mxk5025/Stock-Portfolio" target="_blank"
            rel="noopener noreferrer">
            <Icon width={defaultWidth}  height={defaultHeight}
              icon={gitHubIcon} />
          </a>
          <IconButton size="small" onClick={() => {setShowStack(showStack ? false : true)}}>
            { showStack ?
              <ArrowDropUp /> : <ArrowDropDown />
            }
          </IconButton>
        </div>
      </div>
      <div className="footer-end">
        <span>&copy; 2019 Michael Kha. All Rights Reserved.</span>
        { showStack &&
          <div className="made-with-container">
            <Icon width={defaultWidth} height={defaultHeight} icon={htmlIcon} />
            <Icon width={defaultWidth} height={defaultHeight} icon={cssIcon} />
            <Icon width={defaultWidth} height={defaultHeight}
              icon={javaScriptIcon} />
            <Icon width={defaultWidth} height={defaultHeight} icon={nodeIcon} />
            <Icon width={defaultWidth} height={defaultHeight}
              icon={reactIcon} />
            <span id="fuse">Fuse.js</span>
            <span id="axios">axios</span>
            <span id="luxon">Luxon</span>
            <img id="lodash" width={defaultWidth} height={defaultHeight}
              src={lodashLogo} alt="" />
            <Icon width={defaultWidth} height={defaultHeight} icon={materialDesignIcon} />
            <Icon width={defaultWidth} height={defaultHeight} icon={simpleIconsIcon} />
          </div>
        }
      </div>
    </footer>
  )
}
