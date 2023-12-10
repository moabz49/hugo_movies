import Badge from '@mui/material/Badge';
import { img_300, unavailable } from "../../Config/Config"
import ContentModal from '../ContentModal/ContentModal.component';

const SingleContent = ({
    id, 
    poster, 
    title, 
    date,
    media_type,
    vote_average,
}) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <div className='flex flex-col xs:w-[200px] p-[5px] my-[5px] mx-[0px] bg-[#1e2127] shadow-md rounded-[10px] relative font-Montserrat hover:bg-slate-100 hover:text-black'>
                <Badge
                    badgeContent={vote_average}
                    color= {vote_average > 6 ? "primary" : "secondary" }
                    />
                <img
                    className="rounded-[10px]" //poster is a link we had img_300 to specify the image size to the link
                    src={poster ? `${img_300}${poster}` : unavailable}
                    alt={title}
                    />
                <b className='w-[100%] text-center text-[18px] py-[8px] px-[0]'>{title} </b>
                <span className='flex justify-between pb-[3px] px-[2px]'>
                    {media_type === "tv" ? "TV Series" : "Movie"}
                    <span className="">{date}</span>
                </span>
            </div>   
        </ContentModal>

        )
}
export default SingleContent;