import Link from "next/link"
import AuthNavbar from "./components/AuthNavbar"

export default function Home() {
  const subjects = [
    { id: "famous_places", name: "Famous Places", detail: "Explore landmarks around the world", icon: "🏛️", color: "bg-emerald-100 text-emerald-700" },
    { id: "general_knowledge", name: "General Knowledge", detail: "Test what you know about everything", icon: "💡", color: "bg-amber-100 text-amber-700" },
    { id: "brain_teasers", name: "Brain Teasers", detail: "Challenge yourself with fun puzzles", icon: "🧩", color: "bg-orange-100 text-orange-700" },
    { id: "world_culture", name: "World & Culture", detail: "Discover traditions and life around the globe", icon: "🌍", color: "bg-rose-100 text-rose-700" },
  ]

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#home" className="flex items-center gap-2 text-xl font-black tracking-tight" aria-label="Quizzy home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4500] text-lg text-white">Q</span>
          quizzy
        </a>
        <AuthNavbar />
      </header>

      <section id="home" className="mx-auto max-w-6xl px-6 pb-16 pt-12 text-center sm:pt-20">
        <span className="inline-flex rounded-full bg-[#fff1eb] px-4 py-2 text-sm font-semibold text-[#ff4500]">
          A little learning goes a long way
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Curious minds <span className="text-[#ff4500]">earn big.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Take quizzes, build your points, and earn money when you reach reward milestones. Learning can pay off.
        </p>
        <Link href="/quiz?category=general_knowledge" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#e63e00]">
          Find a quiz <span aria-hidden="true">→</span>
        </Link>
        <p className="mt-4 text-sm font-medium text-slate-500">
          Take quizzes <span className="mx-2 text-[#ff4500]">→</span> Earn points <span className="mx-2 text-[#ff4500]">→</span> Unlock money rewards
        </p>
      </section>

      <section id="subjects" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff4500]">Choose your topic</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">What are you curious about?</h2>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">4 subjects to explore</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Link 
              key={subject.id} 
              href={`/quiz?category=${subject.id}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#ff4500] hover:shadow-lg hover:shadow-slate-100"
            >
              <article>
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${subject.color}`} aria-hidden="true">
                  {subject.icon}
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{subject.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{subject.detail}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100 py-6 text-center text-sm text-slate-500">
        One question at a time. You’ve got this.
      </footer>
    </main>
  );
}









// import Link from "next/link"

// export default function Home() {
//   const subjects = [
//     { name: "Famous Places", detail: "Explore landmarks around the world", icon: "🏛️", color: "bg-emerald-100 text-emerald-700" },
//     { name: "General Knowledge", detail: "Test what you know about everything", icon: "💡", color: "bg-amber-100 text-amber-700" },
//     { name: "Brain Teasers", detail: "Challenge yourself with fun puzzles", icon: "🧩", color: "bg-orange-100 text-orange-700" },
//     { name: "World & Culture", detail: "Discover traditions and life around the globe", icon: "🌍", color: "bg-rose-100 text-rose-700" },
//   ]

//   return (
//     <main className="min-h-screen bg-white text-slate-900">
//       <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
//         <a href="#home" className="flex items-center gap-2 text-xl font-black tracking-tight" aria-label="Quizzy home">
//           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4500] text-lg text-white">Q</span>
//           quizzy
//         </a>
//         <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-3">
//           <a href="#subjects" className="hidden rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-[#ff4500] hover:text-[#ff4500] sm:inline-flex">
//             Explore subjects
//           </a>
//           <button type="button" className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition hover:text-[#ff4500] sm:px-5">
//             Log in
//           </button>
//           <button type="button" className="cursor-pointer rounded-full bg-[#ff4500] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e63e00] sm:px-5">
//             Sign up
//           </button>
//         </nav>
//       </header>

//       <section id="home" className="mx-auto max-w-6xl px-6 pb-16 pt-12 text-center sm:pt-20">
//         <span className="inline-flex rounded-full bg-[#fff1eb] px-4 py-2 text-sm font-semibold text-[#ff4500]">
//           A little learning goes a long way
//         </span>
//         <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
//           Curious minds <span className="text-[#ff4500]">earn big.</span>
//         </h1>
//         <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
//           Take quizzes, build your points, and earn money when you reach reward milestones. Learning can pay off.
//         </p>
//         <Link href="/quiz" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#e63e00]">
//           Find a quiz <span aria-hidden="true">→</span>
//         </Link>
//         <p className="mt-4 text-sm font-medium text-slate-500">
//           Take quizzes <span className="mx-2 text-[#ff4500]">→</span> Earn points <span className="mx-2 text-[#ff4500]">→</span> Unlock money rewards
//         </p>
//       </section>

//       <section id="subjects" className="mx-auto max-w-6xl px-6 pb-20">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-widest text-[#ff4500]">Choose your topic</p>
//             <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">What are you curious about?</h2>
//           </div>
//           <span className="hidden text-sm text-slate-500 sm:block">4 subjects to explore</span>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {subjects.map((subject) => (
//             <article key={subject.name} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#ff4500] hover:shadow-lg hover:shadow-slate-100">
//               <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${subject.color}`} aria-hidden="true">
//                 {subject.icon}
//               </span>
//               <h3 className="mt-5 text-lg font-bold">{subject.name}</h3>
//               <p className="mt-1 text-sm leading-6 text-slate-600">{subject.detail}</p>
//             </article>
//           ))}
//         </div>
//       </section>

//       <footer className="border-t border-slate-100 py-6 text-center text-sm text-slate-500">
//         One question at a time. You’ve got this.
//       </footer>
//     </main>
//   );
// }
