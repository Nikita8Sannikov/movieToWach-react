import React from "react"
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import Card from "./Card"

export default function Header({addMovie, movies}) {
  const [filmName, setFilmName] = useState("")
  const [filmUrl, setFilmUrl] = useState("")
  const [searchFilm, setSearchFilm] = useState("")
 
  const handleFilmNameChange = (event) => setFilmName(event.target.value)
  const handleFilmUrlChange = (event) => setFilmUrl(event.target.value)
  const searchFilmChange = (event) => setSearchFilm(event.target.value)

  function handleClick(event) {
    event.preventDefault()
    console.log("Название фильма:", filmName)
    console.log("URL обложки:", filmUrl)
    addMovie(filmName, filmUrl)
    setFilmName("")
    setFilmUrl("")
  }

  function filter(val, filmList){
    if (!val) return [];
    return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
  }
  return (
    <>
      <div className="add-film">
        <form>
          <Input
            description="Введите название фильма"
            placeholder="название"
            labelFor="text1"
            id="text1"
            value={filmName}
            onChange={handleFilmNameChange}
          />
          <Input
            description="Введите URL обложки"
            placeholder="URL"
            labelFor="text2"
            id="text2"
            value={filmUrl}
            onChange={handleFilmUrlChange}
          />

          <Button className="add-button" onclick={handleClick}>
            Добавить
          </Button>

          <div className="search-area">
            <Input
              placeholder="Введи название"
              labelFor="text"
              className="search"
              value={searchFilm}
              onChange={searchFilmChange}
            />

            <ul id="filter-results">
              {filter(searchFilm, movies).map((movie) => (
             <Card 
              key={movie.id}
               {...movie}/>
          ))
              }
            </ul>
          </div>
        </form>
      </div>
    </>
  )
}
