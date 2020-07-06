import React from "react";

export default function ImagesList({breed, images}) {
    return (
        <div className="images">
            {
                images.map((image, idx) => {
                    const key = `${breed}#${idx}`;
                    return (
                        <div className="image" key={key}>
                            <img src={image} alt={key}/>
                        </div>
                    );
                })
            }
        </div>
    );
}
