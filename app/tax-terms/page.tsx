import { TaxGlossary } from "../components/TaxGlossary";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="mb-8 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Tax terms glossary
        </h1>
        <TaxGlossary />
      </main>
    </div>
  );
}
