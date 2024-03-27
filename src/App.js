import './App.css';
import UserLocation from './component/UserLocation';
import Home from './component/Home';

// API key 1ad4ad10ea0a0de90501d0af02ad45c2
function App() {
  return (
    <>
    <div className="app-container">
      <Home/>
      <UserLocation/>
    </div>
      
    </>
  );
}

export default App;
