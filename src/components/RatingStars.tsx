
"use client";

type RatingStarsProps = {
  bookId: string;
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf-43RjGdihskpzTUZ7lP7a6lsere1afohS6JTSIc2G2P1u0w/viewform";

const BOOK_NAMES: Record<string, string> = {
  dracula: "Drácula",
  "a-revolucao-dos-bichos": "A revolução dos bichos",
  "a-guerra-dos-mundos": "A guerra dos mundos",
  "o-bebe-de-rosemary": "O bebê de Rosemary",
  "o-medico-e-o-monstro": "O médico e o monstro",
};

export default function RatingStars({ bookId }: RatingStarsProps) {
  const bookName = BOOK_NAMES[bookId];

  const formUrl = new URL(FORM_URL);
  formUrl.searchParams.set("usp", "pp_url");
  formUrl.searchParams.set("entry.586180716", bookName ?? "");

  return (
    <a
      href={formUrl.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#b58a51] bg-[#f5f0e6] px-4 py-3 text-sm font-semibold text-[#76552f] transition hover:border-[#76552f] hover:bg-[#e9decb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98734b]"
    >
      <span className="text-lg text-[#c58a24]">★</span>
      Avaliar este livro
    </a>
  );
}
