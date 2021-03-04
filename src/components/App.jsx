import '../styles/App.css';
import hevoLogo from '../assets/hevo-logo.png';
import SpriteGeneratorHome from './Sprite-generation-tool/SpriteGeneratorHome';

function App() {
  return (
    <div className='App'>
      <img src={hevoLogo} className='App-logo' alt='logo' />
      <SpriteGeneratorHome />
    </div>
  );
}

export default App;
