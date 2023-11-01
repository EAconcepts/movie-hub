import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
function App() {
  const imageBaseUrl = `https://image.tmdb.org/t/p/original`;
  return (
    <div className="w-full scroll-smooth">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home imageBaseUrl={imageBaseUrl} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
