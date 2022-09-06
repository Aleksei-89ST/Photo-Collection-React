import axios from "axios";
import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const categories = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios(
      `https://6315bbec5b85ba9b11e5eb64.mockapi.io/Collection?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((res) => {
        setCollection(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить данные");
      });
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              className={categoryId === i ? "active" : ""}
              onClick={() => setCategoryId(i)}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {collection
          .filter((obj) =>
            obj.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
