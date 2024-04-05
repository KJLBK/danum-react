import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
    </HashRouter>
  );
}

export default App;
