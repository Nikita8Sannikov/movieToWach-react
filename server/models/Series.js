import mongoose from 'mongoose'

const { Schema, model } = mongoose

const seriesSchema = new Schema({
    id: { type: Number }, // id фильма
    title: { type: String, required: true }, // Название фильма 
    img: { type: String, required: true }, // URL изображения
    shortDescription: String, // Краткое описание фильма
    description: String, // Полное описание фильма
    year: Number, // Год выпуска фильма
    genres: String, // Жанры фильма
    rating: String, // Рейтинг фильма
    movieLength: String, //Продолжительность фильма
    kinopoiskId: Number, //Оригинальный id с Кинопоиска
    isSeries: Boolean, //Флаг сериал это или нет
  })

export default model('Series', seriesSchema)