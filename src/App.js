import './App.css';
import { PhotoProvider } from './context/PhotosContext';
import AppBar from './components/AppBarComps/AppBar';
import MainGrid from './components/GridComps/Grid/MainGrid';

function App() {
  return (
    <PhotoProvider>
      <div className="App">
        <AppBar />
        <MainGrid />
      </div>
    </PhotoProvider>
  );
}

export default App;
