import * as React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div
      className='w-[100%] fixed bottom-0 bg-[#2d313a] z-50 h-[48px] md:hidden '
    >
      <div className='flex w-full justify-between items-center sm:px-[80px] text-white pt-[5px]'>
        <Link to="/" className={`${pathname === "/" ? 'text-[#C6007E] font-semibold' : ''} hover:text-[#C6007E] flex flex-col items-center justify-center mx-auto`}>
          <WhatshotIcon sx={{fontSize: '20px'}} />
          <p className='text-xs'>Trending</p>
        </Link>
        <Link to="/movies" className={`${pathname === "/movies" ? 'text-[#C6007E] font-semibold' : ''} hover:text-[#C6007E] flex flex-col items-center justify-center mx-auto`}>
          <MovieIcon sx={{fontSize: '20px'}}/>
          <p className='text-xs'>Movies</p>
        </Link>
        <Link to="/series" className={`${pathname === "/series" ? 'text-[#C6007E] font-semibold' : ''} hover:text-[#C6007E] flex flex-col items-center justify-center mx-auto`}>
          <TvIcon sx={{fontSize: '20px'}} />
          <p className='text-xs'>TV Series</p>
        </Link>
        <Link to="/search" className={`${pathname === "/search" ? 'text-[#C6007E] font-semibold' : ''} hover:text-[#C6007E] flex flex-col items-center justify-center mx-auto`}>
          <SearchIcon sx={{fontSize: '20px'}}/>
          <p className='text-xs'>Search</p>
        </Link>
      </div>
    </div>
  );

}