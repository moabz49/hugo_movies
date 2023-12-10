import React,{ useEffect, useState } from 'react'; 
import SingleContent from '../../Components/SingleContent/SingleContent.component'; 
import CustomPagination from '../../Components/CustomPagination/CustomPagination.component';
import axios from 'axios';

const Trending = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([])
    
    const fetchTrending = async () => {
       try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        )
        console.log(data)
        setContent(data.results)
       } catch (error) {
        console.error('Error fetching trending content:', error);
      }
    }
       
    useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className="uppercase flex font-Montserrat text-[6vw] md:text-[4vw] p-[4px] rounded-[50] text-center justify-center text-white"> Trending Page </span>
            <div className='flex flex-wrap justify-evenly'> 
                {content && 
                    content.map ((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.release_date || c.first_air_date}
                            media_type={c.media_type}
                            vote_average={typeof c.vote_average === 'number' ? c.vote_average.toFixed(1) : ''}
                        />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} />

        </div>
    )
}

export default Trending;