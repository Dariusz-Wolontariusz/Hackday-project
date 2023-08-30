import React, { useState } from 'react'

const Search = () => {
  const [input, setInput] = useState('')
  const [hero, setHero] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const inputValue = useRef()

  const dataHandler = async (e) => {
    e.preventDefault()
    // console.log(inputValue.current.value)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/${input}`)
      if (!response.ok) {
        throw new Error('Server response failure')
      }
      const data = await response.json()
      setHero(data)
    } catch (err) {
      console.error('Error fetching hero data', err)
    }

    setIsLoading(false)
  }

  console.log('opis herosa:', hero.description)

  return (
    <>
      <form className='form'>
        <input
          className='form__input'
          // ref={inputValue}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className='form__btn' onClick={dataHandler}>
          Get your hero
        </button>
      </form>
      {hero && (
        <>
          {isLoading ? (
            <p>Loading image...</p>
          ) : (
            <img
              className='hero__img'
              alt='hero avatar'
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            />
          )}
          <section className='hero_container'>
            <h1 className='hero__name'>{hero.name}</h1>
            {hero.description ? (
              <p className='hero_description'>{hero.description}</p>
            ) : (
              <p className='hero_description'>
                Description for that hero isn't available.
              </p>
            )}
          </section>
        </>
      )}
    </>
  )
}

export default Search
