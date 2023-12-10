import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header/Header.component';
import Movie from './Pages/Movies/Movie';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';
import Search from './Pages/Search/Search';
import NotFound from './Pages/NotFound/NotFound';
import SimpleBottomNavigation from './Components/MainNav.component';


function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <div className="bg-slate-900 min-h-[100vh] text-white md:pt-[110px] pb-[70px] pt-[100px] ">
        <div className='max-w-[1230px] flex justify-center items-center px-[16px] mx-auto'>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}  

export default App;
