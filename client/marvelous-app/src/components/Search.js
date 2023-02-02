import React, { useEffect, useState, useRef } from 'react'

const Search = () => {
  const [input, setInput] = useState()
  const [hero, setHero] = useState()
  const inputValue = useRef()

  const dataHandler = (e) => {
    e.preventDefault()
    console.log(inputValue.current.value)
    fetch(`/api/${inputValue.current.value}`)
    
      .then(data => data.json())
      .then(res => setHero(res))
  }

  console.log(hero)
  // const fetchData = async(url) => {
  //   const data = await fetch(url)
  //   setHero(data);
  // }

  // useEffect(()=>{
  //   fetchData(`/api`)
  // },[])

  return (
    <>
    <form className='form'>
      <input className='form__input' ref={inputValue}></input>
      <button className='form__btn' onClick={dataHandler} >Get hero</button>
    </form>
    {
      hero && <>
        <img className='hero__img' alt='hero avatar' src={hero.thumbnail.path + '.' + hero.thumbnail.extension}/>
        <section className='hero_container'>
          <h1 className='hero__name'>{hero.name}</h1>
          <p className='hero_description'>{hero.description}</p>
        </section>
      </>
    }
    </>
  )
}

export default Search