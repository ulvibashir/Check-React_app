import React, { useEffect, useState } from 'react';

import backBtn from '../styles/back.png'
import { getDetailsFetch } from '../API'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailCard } from './ProjectDetailCard';
export const DetailsPage = ({ history: { push, goBack }, match: { params: { key } } }) => {


  const [projectInfo, setProjectInfo] = useState({ userNumber: '', data: [] })
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const onClickHandler = (item) => {
    setIsDetailOpen(true)
    console.log('click');
    setSelectedCard(item);
  }

  useEffect(() => {
    getDetailsFetch({}, key).then(response => {
      const data = [];
      let userNumber = ''
      for (let id in response) {
        if (typeof response[id] !== 'string') {
          data.push({
            id,
            ...response[id]
          })
        } else {
          userNumber = response[id]
        }
      }

      setProjectInfo(v => ({
        ...v,
        userNumber,
        data
      }))

    })
  }, [key])

  return (
    <div className="detail-container">
      <div className="search-header">
        <h1 className="header-name">{projectInfo.userNumber}</h1>
        <button className="btn" onClick={() => { goBack()}}>
          <img className="btn-img" src={backBtn} alt="exit-btn" />
        </button>
      </div>
      <div className="detail-body">
        <div className="left-container">
          {
            isDetailOpen && 
          <div className="detail-card-wrapper">

            <ProjectDetailCard
              item={selectedCard}
              closeHandler={() => { setIsDetailOpen(false) }}

            />

          </div>
          }
        </div>
        <div className="right-container">
          {projectInfo.data.map((item) => <div
            key={item.id}
            className="project-card-wrapper">
            <ProjectCard
              item={item}
              onClickHandler={() => { onClickHandler(item) }} />
          </div>)}
        </div>
      </div>
    </div>
  )
}