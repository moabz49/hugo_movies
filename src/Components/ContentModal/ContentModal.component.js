import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { 
    img_500,
    unavailable,
    unavailableLandscape 
  } from "../../Config/Config";
import Gallery from "../Carousel/Carousel.component";
import axios from "axios"; 
import YouTubeIcon from "@mui/icons-material/YouTube"; // Import YouTubeIcon
  
export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();    

    const handleOpen = () => 
      setOpen(true);

    const handleClose = () => 
      setOpen(false);
    
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
  
      setContent(data);
      // console.log(data);
    };
    // Fetch video for Youtube Trailer
    const fetchVideo = async  () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setVideo(data.results[0]?.key);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }; 

    useEffect(() => {
      fetchData();
      fetchVideo();

    }, []); 
    
      return (
      <>
        <div
          className="media"
          style={{ cursor: "pointer" }}
          color="inherit" 
          onClick={handleOpen}
        > 
          {children} 
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className='flex items-center justify-center'
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            {content && (
              <div className='sm:rounded-lg max-w-[80%] xl:h-[80%] bg-slate-800 border-[1px] border-[#C6007E] text-white '> 
                <div className='flex flex-col mb-[10px] sm:mb-[0] items-center sm:items-stretch  h-[100%] w-[100%] sm:flex-row sm:justify-around sm:py-[10px] sm:px-0 '>
                  {/* We have 2 images one is portrait and one is landscape we use @media and the father container .ContentModal to chnage the images on different page size  */}
                  <img
                    src={
                      content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                    }
                    alt={content.name || content.title}
                    className="object-contain rounded-[10px] hidden sm:flex w-[38%]"
                  />
                  <img
                    src={
                      content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="rounded-[10px] sm:hidden object-contain"
                  />
                  <div className="w-[95%] p-0 sm:p-[10px] sm:w-[58%] sm:max-h-[80vh] flex flex-col font-light transition-max-h duration-300 ease-in-out">
                    <span className="flex items-center justify-center text-center text-[3.5vw]">
                      {content.name || content.title}<br className="xl:hidden"/> (
                        {(
                          content.first_air_date ||
                          content.release_date ||
                          "-----"
                        ). substring(0,4)} {/* returns the first 4 numbers of string i.e (2023)*/} 
                      )
                      </span>
                        {content.tagline && (
                          <i className="pb-[10px] self-center italic font-[10px] md:text-xl lg:text-2xl  ">{content.tagline}</i>
                        )}

                      <div className=" text-xs md:text-sm xl:text-base sm:max-h-[80%] font-[10px] flex flex-grow p-[15px] rounded-[20px] shadow-inner-sm shadow-black shadow-inner text-justify overflow-y-auto transition-font duration-300 ease-in-out" >
                        {content.overview}
                      </div>

                     <div>
                     <div className="max-h-[10%] flex items-center py-[6px] "> 
                        <Gallery id={id} media_type={media_type} />
                     </div>
                     </div> 

                     <button 
                      className="w-full bg-[#C6007E] text-white uppercase font-extralight flex items-center justify-center py-[3px] text-center text-sm rounded-md px-2"
                      onClick={() => {
                        window.open(`https://www.youtube.com/watch?v=${video}`, '_blank')}}
                    >
                     <YouTubeIcon className="pr-2 font-[30px]" style={{fontSize: '30px'}}/>Watch the Trailer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Fade>
        </Modal>
      </>
    );
  }