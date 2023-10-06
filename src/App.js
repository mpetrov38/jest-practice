import './App.css';
import Securities from '../components/Securities';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h2 className='title'>Financial Times</h2>
        <span ><Securities/></span>
      </div>
    </div>
  );
}

export default App;
