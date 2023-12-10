import React from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function CustomPagination({ setPage, numOfPages = 10 }) {

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',  // this has custom colors for divs, primary, secondary, typnography etc.
      },
    });

    const handlePageChange = (event, page) => {
        setPage(page); //  Use the 'page' from the event
        window.scroll(0, 0);
        // console.log(click);
    }

    return (
      <ThemeProvider theme={darkTheme}> 
        <div
          className='w-[100%] flex justify-center items-center mt-10'
        >  
            <Pagination  
                className='h-[20px] text-white text-[0.8rem] '
                onChange={handlePageChange}
                count={numOfPages} 
                color="primary" 
                // hidePrevButton
                // hideNextButton 
            />
        </div>
     </ThemeProvider>
  );   
}

export default CustomPagination;