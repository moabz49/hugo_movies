import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,

}) => {
  const handleClick = (genre) => {
    // onClick genre will get added to selectedGenres[] Array
    setSelectedGenres([...selectedGenres, genre]);
    // it will also get removes from the Unselected genres --> to prevent duplicates
    setGenres(genres.filter((g) => g.id !== genre.id))
    setPage(1); // Every time new genre Selected return to page(1)
};

  const handleDelete = (genre) => {
    setSelectedGenres([...selectedGenres
        .filter((selected) => selected.id !== genre.id)])
    setGenres([...genres, genre]) // onDelete genre is added to genreS[]Array and becomes unselected
    setPage(1)
};

    const FetchChips = async () => {
        try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`   
        )
        console.log(data)
        setGenres(data.genres)
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    useEffect(() => {
        FetchChips()
        return () => {
            setGenres([]); // unmounting
          }; 

    }, [])

  return (
    <div className="py-[6px] px-[4]">
       {selectedGenres.map((g) => (
        <Chip
            className="m-1 h-[20px] text-[8px] bg-[#e2e2e4]"
            label={g.name}
            key={g.id}
            color="primary"
            size="small"
            // onClick={() => handleDelete(g)}
            onDelete={() => handleDelete(g)}
        />
       ))
      }
      {genres.map((g) => (
        <Chip
            className='m-1 h-[20px] text-[12px]'
            style={{ backgroundColor: '#e2e2e4' }}
            label={g.name}
            key={g.id}
            size="small"
            onClick={() => handleClick(g)}
            
        />
        ))
      }
    </div>
  );
}

export default Genres;