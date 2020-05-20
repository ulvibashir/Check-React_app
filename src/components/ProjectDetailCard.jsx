import React from 'react';
import closeBtn from '../styles/close.png'
export const ProjectDetailCard = ({ closeHandler, item: { id, title, name, city, imgUrl } }) => {

    return (
        <div className="detail-card-container">
            <button className="detail-close-btn" onClick={closeHandler}>
                <img className="detail-close-img" src={closeBtn} alt="close"/>
            </button>
            <img className="detail-card-img" src={imgUrl} alt="head" />
            <p className="detail-card-txt">{title}</p>
            <p className="detail-card-txt">{city}</p>
            <p className="detail-card-txt">{name}</p>
        </div>
    )
}