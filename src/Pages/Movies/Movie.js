import axios from "axios";
import { useEffect, useState} from 'react';

import SingleContent from "../../Components/SingleContent/SingleContent.component";


import Genres from "../../Components/Genres/Genres.component.js";
import UseGenre from "../../Hooks/UseGenre";
import CustomPagination from '../../Components/CustomPagination/CustomPagination.component';

function Movie () {
    
    const [page, setPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([]); // Genres Not SELECTED
    const [content, setContent] = useState([]); // for Cards
    const [numOfPages, setNumOfPages] = useState();
    const genreForURL = UseGenre(selectedGenres) // maps and return genres to an Array.
    console.log('movies', genreForURL)

    const fetchMovies = async () => {
        try {
         const { data } = await axios.get(
             `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
         )
         console.log(data)
        setContent(data.results)
        setNumOfPages(data.total_pages)
       } catch (error) {
        console.error('Error fetching Movie content:', error);
      }
    }
    
    useEffect(() => {
        window.scroll(0,0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreForURL, page]) // genreforURL = [] OF selectedGenres. Whenever a new genre is selected it will update the trigger the UseEffect to make a New Updated api Call
    return (
        <div>
             <span className="uppercase flex font-Montserrat text-[6vw] md:text-[4vw] p-[4px] rounded-[50] text-center justify-center text-white">Discover Movies</span>
             <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
                />
                <div className='flex flex-wrap justify-evenly'> 
                {content && 
                    content.map ((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.release_date || c.first_air_date}
                            media_type="movie"
                            vote_average={typeof c.vote_average === 'number' 
                                ? Number.isInteger(c.vote_average)
                                    ? c.vote_average.toString() // Convert whole number to string
                                    : c.vote_average.toFixed(1) // Keep one decimal place for non-whole numbers
                                : ''
                            }
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage}  numOfPages={numOfPages} />
            )}
        </div>
        
    )
}

export default Movie;