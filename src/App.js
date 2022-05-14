import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { Alert } from './Components/Alert';
import { AlertState } from './context/alert/AlertState';
import { GitHubState } from './context/gitHub/GitHubState';

function App() {
  return (
    <GitHubState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container py-3">
            <Alert alert={{text: 'test'}} />
            <Routes>
              <Route path="/" exact={true} element={<Home />} />
              <Route path="/about" element={<About />} />
                <Route path="/profile/:name" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AlertState>
    </GitHubState>
  );
}

export default App;
