import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const { pathname }= useLocation()
    return (
        <div className="w-[100%] fixed flex bg-slate-900 justify-center items-center shadow-inner shadow-black z-50">
        <div className='px-8 py-4 w-full h-full max-w-[1230px] text-white flex items-center justify-between '>
            <h1 onClick={() => window.scroll(0, 0)} className='uppercase cursor-pointer font-Bebas text-5xl tracking-wide '> HUgo. </h1>
            <ul className='hidden md:flex space-x-12'>
                <Link className={`${pathname === '/' ? 'text-[#C6007E] font-semibold': '' } flex items-center hover:scale-[105%] hover:text-[#C6007E] duration-300 ease-out transform group`} to="/">Trending <WhatshotIcon style={{fontSize: '28px' }} className='pl-2 group-hover:translate-x-1 '/></Link>
                <Link className={`${pathname === '/movies' ? 'text-[#C6007E] font-semibold' : '' }flex items-center hover:scale-[105%] hover:text-[#C6007E] duration-300 ease-out transform group`} to="/movies">Movies <MovieIcon  style={{fontSize: '28px' }} className='pl-2 group-hover:translate-x-1'/></Link>
                <Link className={`${pathname === '/series' ? 'text-[#C6007E] font-semibold' : '' }flex items-center hover:scale-[105%] hover:text-[#C6007E] duration-300 ease-out transform group`} to="/series">TV Series <TvIcon  style={{fontSize: '28px' }} className='pl-2 group-hover:translate-x-1'/></Link>
                <Link className={`${pathname === '/search' ? 'text-[#C6007E] font-semibold' : '' }flex items-center hover:scale-[105%] hover:text-[#C6007E] duration-300 ease-out transform group`}  to="/search">Search <SearchIcon  style={{fontSize: '28px' }} className='pl-2 group-hover:translate-x-1'/></Link>
            </ul>
        </div>

        </div>
    )
}

export default Header