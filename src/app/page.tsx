
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import books from "../data/books.json";
import RatingStars from "../components/RatingStars";

type Rating = {
  name: string;
  average: number;
  count: number;
};

type Filter = "all" | "top" | "unrated";

export default function Home() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [ratingsLoaded, setRatingsLoaded] = useState(false);

  useEffect(() => {
    async function loadRatings() {
      try {
        const response = await fetch("/api/ratings");
        if (!response.ok) return;

        const data: Rating[] = await response.json();
        setRatings(data);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
      } finally {
        setRatingsLoaded(true);
      }
    }

    loadRatings();
  }, []);

  const visibleBooks = useMemo(() => {
  const query = search.trim().toLocaleLowerCase("pt-BR");

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.name.toLocaleLowerCase("pt-BR").includes(query) ||
      book.author.toLocaleLowerCase("pt-BR").includes(query);

    const rating = ratings.find((item) => item.name === book.name);

    const matchesFilter =
      filter === "all" ||
      (filter === "top" && (rating?.count ?? 0) > 0) ||
      (filter === "unrated" &&
        ratingsLoaded &&
        (rating?.count ?? 0) === 0);

    return matchesSearch && matchesFilter;
  });

  return [...filtered].sort(
    (a, b) => Number(b.order) - Number(a.order)
  );
}, [search, filter, ratings, ratingsLoaded]);

  const filterButton = (value: Filter, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${filter === value
          ? "border-[#76552f] bg-[#76552f] text-white"
          : "border-[#d8cdbb] bg-[#fffdf8] text-[#5d5143] hover:bg-[#e9decb]"
        }`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-[#f5f0e6] px-5 py-12 text-[#302b26] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 border-b border-[#d8cdbb] pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#98734b]">
            Pingar Bar
          </p>

          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl">
            Clube do Livro
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#71675b] sm:text-lg">
            Boas histórias, boas conversas e novas leituras para compartilhar.
          </p>
        </header>

        <section>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98734b]">
              Nossa estante
            </p>

            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                Leituras em destaque
              </h2>

              <span className="text-sm text-[#71675b]">
                {visibleBooks.length} de {books.length} livros
              </span>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <label className="flex items-center gap-3 rounded-xl border border-[#e5dac9] bg-[#fffdf8] px-4 py-3 focus-within:border-[#98734b]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0 text-[#82776b]"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por livro ou autor..."
                aria-label="Buscar por título ou autor"
                className="w-full bg-transparent text-sm text-[#302b26] outline-none placeholder:text-[#9a8e80]"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {filterButton("all", "Todos")}
              {filterButton("top", "Melhor avaliados")}
              {filterButton("unrated", "Sem avaliações")}
            </div>
          </div>

          {filter === "unrated" && !ratingsLoaded ? (
            <p className="py-8 text-center text-sm text-[#71675b]">
              Carregando avaliações...
            </p>
          ) : visibleBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d8cdbb] px-6 py-12 text-center">
              <p className="font-serif text-xl">
                Nenhum livro encontrado
              </p>
              <p className="mt-2 text-sm text-[#71675b]">
                Tente outra busca ou selecione outro filtro.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="mt-4 text-sm font-semibold text-[#76552f] underline underline-offset-4"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {visibleBooks.map((book) => {
                const rating = ratings.find(
                  (item) => item.name === book.name
                );

                return (
                  <article
                    key={book.id}
                    className="group flex flex-col rounded-2xl border border-[#e5dac9] bg-[#fffdf8] p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-[#eee6d8] p-3">
                      <Image
                        src={book.cover}
                        alt={`Capa do livro ${book.name}`}
                        width={220}
                        height={300}
                        unoptimized
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                    </div>

                    <div className="flex flex-1 flex-col pt-4">
                      <h3 className="font-serif text-xl font-semibold leading-snug">
                        {book.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#98734b]">
                        {book.author}
                      </p>

                      <p className="mt-4 flex-1 text-sm leading-6 text-[#71675b]">
                        {book.simple_description}
                      </p>

                      <div className="my-4 flex items-center gap-2 border-t border-[#eee6d8] pt-4">
                        <span className="text-xl text-[#c58a24]">★</span>

                        <span className="font-semibold">
                          {rating && rating.count > 0
                            ? rating.average.toLocaleString("pt-BR", {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            })
                            : "—"}
                        </span>

                        <span className="text-xs text-[#82776b]">
                          {(rating?.count ?? 0) === 0
                            ? "Sem avaliações"
                            : `${rating!.count} ${rating!.count === 1 ? "avaliação" : "avaliações"
                            }`}
                        </span>
                      </div>

                      <RatingStars bookId={book.id} />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-[#d8cdbb] pt-6 text-center text-sm text-[#82776b]">
          Feito para quem acredita que um bom livro sempre rende uma boa conversa.
        </footer>
      </div>
    </main>
  );
}
