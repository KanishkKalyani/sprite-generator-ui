import '../styles/App.css';
import axios from 'axios';
import SpriteGenerator from './sprite-generator/SpriteGenerator';
import hevoLogo from '../assets/hevo-logo.png';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className='App'>
      <img src={hevoLogo} className='App-logo' alt='logo' />
      <SpriteGenerator />
    </div>
  );
}

export default App;
