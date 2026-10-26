
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f0e6] px-6 py-12 text-[#302b26]">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#98734b]">
          Clube do Livro · Pingar Bar
        </p>

        <div className="my-8">
          <span className="font-serif text-8xl font-bold text-[#c58a24] sm:text-9xl">
            404
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-[#d8cdbb]" />
        </div>

        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          Esta página saiu da estante
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#71675b]">
          Parece que este capítulo não existe por aqui. Que tal voltar para
          nossa estante e escolher uma boa leitura?
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#b58a51] bg-[#76552f] px-6 py-3 font-semibold text-white transition hover:bg-[#604426] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98734b]"
        >
          <span aria-hidden="true">←</span>
          Voltar para a estante
        </Link>

        <p className="mt-12 font-serif text-sm italic text-[#98734b]">
          Todo bom livro merece um novo começo.
        </p>
      </div>
    </main>
  );
}
