import './App.css';
import Greeting from './Greeting/Greeting'
import Async from './async/Async'

function App() {
  return (
    <div className="App">
      {/* Greeting component */}
      <Greeting  />
      {/* Async example */}
      <Async />

      <h1>Learn React </h1>
      {/* Custom Hook example */}
    </div>
  );
}

export default App;