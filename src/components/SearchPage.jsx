import React, { useEffect, useState } from 'react';

import { getUsersFetch, getProjectsFetch } from '../API';
import exitBtn from '../styles/exit.png';
import searchBtn from '../styles/search.png';

export const SearchPage = ({ history: { push }, match: { params: { id } } }) => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    username: '',
  })
  const [errorTxt, setErrorTxt] = useState('')
  const [fields, setFields] = useState({
    userNumber: ''
  })
  const [loader, setLoader] = useState(false)

  const fieldsChangeHandler = (name, e) => {
    const { value } = e.target
    setErrorTxt('')
    setFields(v => ({
      ...v,
      [name]: value
    }))
  }


  const onSearchBtnHandler = async () => {
    if(fields.userNumber.trim() !== '') {
      setLoader(true)
      const response = await getProjectsFetch();
      setLoader(false)
      for (let key in response) {
        if(fields.userNumber === response[key].userNumber){
          push(`/details/${key}`);
        }
      }
      setErrorTxt('Wrong user number')
    } else {
      setErrorTxt('Please fill all fields')
    }
  }

  useEffect(() => {
    (async () => {
      const response = await getUsersFetch();
      for (let key in response) {
        if (key === id) {
          setUserInfo(v => ({
            ...v,
            id,
            name: response[key].name,
            username: response[key].username
          }))
        }
      }
    })()
  }, [id])
  const onExitBtnHandler = () => {
    push('/');
  }
  return (
    <div>
      <div className="search-header">
        <h1 className="header-name">{userInfo.name}</h1>
        <button className="btn" onClick={onExitBtnHandler}>
          <img className="btn-img" src={exitBtn} alt="exit-btn" />
        </button>
      </div>
      <div className="search-body">
        <div className="search-container">
          <input
            value={fields.userNumber}
            onChange={(e) => { fieldsChangeHandler('userNumber', e) }}
            className="txt-input"
            type="text"
            placeholder="User number" />
          <button className="btn" onClick={onSearchBtnHandler}>
            <img className="btn-img"
              style={{ marginLeft: '20px' }}
              src={searchBtn}
              alt="search-btn" />
          </button>
        </div>
        <p className="err-txt">{errorTxt}</p>

        <div className="src-loader-container">
          {loader && <div className="lds-dual-ring" />}
        </div>
      </div>
    </div>
  )
}