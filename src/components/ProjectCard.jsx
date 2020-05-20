import React from 'react';

export const ProjectCard = ({ onClickHandler, item: { id, title, name, city, imgUrl } }) => {

  return (
      <button className="card-container" onClick={onClickHandler}>
        <div className="inner-card">
            <img className="card-img" src={imgUrl} alt="head"/>
            <p className="card-txt">{title}</p>
            <p className="card-txt">{city}</p>
            <p className="card-txt">{name}</p>
        </div>
      </button>
  )
}