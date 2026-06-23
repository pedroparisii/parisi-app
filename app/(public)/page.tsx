import { Hero } from "@/components/home/hero";
import { FeaturedProject } from "@/components/home/featured-project";
import { ChangelogPreview } from "@/components/home/changelog-preview";
import { CurrentlyLearning } from "@/components/home/currently-learning";
import { LocalTime } from "@/components/home/local-time";
import { SpotifyNowPlaying } from "@/components/home/spotify-now-playing";
import { LanguagesRow } from "@/components/layout/languages-row";


export default function Home() {
  return (
    <main className="mx-auto max-w-310 px-6 ">
      <Hero />

      {/* Bento grid */}
      <section
        aria-label="Highlights"
        className="grid grid-cols-1 gap-4 pt-14 pb-4 md:grid-cols-6">

        <div className="md:col-span-4">
          <FeaturedProject />
        </div>
        <div className="md:col-span-2">
          <ChangelogPreview />
        </div>
        
        <div className="md:col-span-2">
          <CurrentlyLearning />
        </div>
        <div className="md:col-span-2">
          <LocalTime />
        </div>
        <div className="md:col-span-2">
          <SpotifyNowPlaying />
        </div>
        <div className="md:col-span-3 rounded-xl border border-border bg-card p-6">
          <LanguagesRow />
        </div>
      </section>

    </main>
  );
}