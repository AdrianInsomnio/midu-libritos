"use client";

import { useMemo, useState } from "react";
import data from "../../src/app/book.json";

const books = data.library.map((item) => item.book);
const genrens = Array.from(new Set(books.map((book) => book.genre)));
export default function Home() {
  const [genre, setGenre] = useState("");

  const matches = useMemo(() => {
    if (!genre) return books;

    return books.filter((book) => {
      if (genre && book.genre !== genre) return false;

      return true;
    });
  }, [genre]);

  return (
    <article className="grid gap-4">
      <nav className="">
        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          className="p-5"
        >
          <option className="p-5" value="">
            Todos
          </option>
          {genrens.map((valor) => (
            <option key={valor} className="p-5" value={valor}>
              {valor}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
        {matches.map((item, i) => {
          return (
            <li key={item.ISBN}>
              <p>{item.title}</p>
              <img
                className="aspect-[9/14] w-full rounded-md bg-gray-800 object-cover shadow-xl"
                alt={item.title}
                src={item.cover}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
