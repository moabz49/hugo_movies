import { useEffect, useState } from "react";
import axios from "axios";

import { 
    Tab,
    Tabs,
    TextField
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


import SingleContent from "../../Components/SingleContent/SingleContent.component";
import CustomPagination from "../../Components/CustomPagination/CustomPagination.component";

const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',  // this has custom colors for divs, primary, secondary, typnography etc.
          primary: {
            main: "#fff",
          },
          secondary: {
            main: '#fff'
          }
        },
      });
    
    const fetchSearch = async () => {
        try {
         const { data } = await axios.get(
             `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}
             sort_by=popularity.desc&include_adult=false&include_video=false`   
         )
        // console.log(data)
        setContent(data.results)
        setNumOfPages(data.total_pages)
       } catch (error) {
        console.error('Error fetching trending content:', error);
      }
    }
    
    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();
      // eslint-disable-next-line
    }, [type, page])

    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchSearch();
      }
    };
    
    useEffect(() => {
      document.addEventListener('keydown', handleEnterKeyPress);
    
      return () => {
        document.removeEventListener('keydown', handleEnterKeyPress);
      };
    }, [fetchSearch]);

    const height = "38px"

    return (
    <div className="w-[100%]">
      <div className="flex flex-col w-[100%] mx-auto xs:w-[400px] md:w-[500px] lg:w-[600px] mb-[10px]">
        <ThemeProvider theme={darkTheme}>
          <div className="mb-[5px] flex">
            <TextField
              size="sm"
              style={{ flex: 1}}
              /* styles the wrapper

              /* styles the label component */
              InputLabelProps={{
                style: {
                  fontSize: "10px",
                }
              }}

              /* styles the input component */
              inputProps={{
                  style: {
                    height,
                    padding: '0px 8px 0',
                    fontSize: "16px"
                  },
            }}
              className="searchBox"
              label="Search"
              variant="standard"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="bg-white px-[8px] mt-[16px] hover:bg-[#C6007E] focus:bg-[#C6007E]"
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="small" sx={{ fontSize: '24px', color: '#0F172A'}}  />
            </button>
          </div>
          <Tabs 
                size="small"
                value={type} 
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                inputProps={{
                  style: {
                    height: "10px",
                  },
                }}
                style={{ paddingBottom: 5,}}
                aria-label="basic tabs example"
          >
                <Tab style={{ width: "50%", fontSize: "8px", height: "8px" }} label="Search Movies"  />
                <Tab style={{ width: "50%", fontSize: "8px", height: "8px" }}  label="Search TV Series"  />
          </Tabs>
          </ThemeProvider>
        </div>
        <div className='flex flex-wrap justify-evenly'> 
                {content &&
                  content.map ((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.release_date || c.first_air_date}
                        media_type={type ? "tv" : "movie"}
                        vote_average={typeof c.vote_average === 'number' 
                            ? Number.isInteger(c.vote_average)
                                ? c.vote_average.toString() // Convert whole number to string
                                : c.vote_average.toFixed(1) // Keep one decimal place for non-whole numbers
                            : ''
                        }
                    />
                  ))
                }
          {searchText && content.length === 0  && (
            <div className="grid text-center items-center justify-center h-[50vh]">
              <h2 className="text-[12px] font-light text-white">
                {type ? "No Series Found Page does not exist. Ooops! Try again!" : "No Movies Found Page does not exist. Ooops! Try again! "}
              </h2>
             </div>
          ) }
        </div>
        {numOfPages > 1 && (
            <CustomPagination setPage={setPage}  numOfPages={numOfPages} />
        )}
    </div>
    )
}

export default Search;