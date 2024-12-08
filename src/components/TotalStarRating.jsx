import React, { useState } from 'react' 
import { FaStar } from 'react-icons/fa'

const TotalStarRating = () => {
    //const[rating, setRating] = useState(null);
    //const[hover, setHover] = useState(null);

    return (
        <div>
        {[...Array(5)].map((star, i) => { 
            return <label>
                    <input type ="radio" name="rating" value={ratingValue} 
                    
                    />
                    <FaStar 
                    className ="star" 
                    color={ratingValue <= AverageValue ? "#ffc107" : "#e4e5e9"} 
                    size={20}
                    />
                
                </label>
        })} 
        
        </div>
    );
};

export default TotalStarRating