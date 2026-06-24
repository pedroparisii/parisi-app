import { ProfileHeader } from "@/components/about/profile-header";
import { LanguagesRow } from "@/components/layout/languages-row";
import { profile, education, facts } from "@/components/about/about-data";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const metadata = {
  title: "About — Pedro Parisi",
  description: "Fullstack developer based in Brazil. Who I am and what I build.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 sm:px-8 pb-24">
      <p className="pt-14 pb-8 font-mono text-sm text-primary ">
        <span className="text-muted-foreground">~/</span>about-me
      </p>

      <ProfileHeader />
      <Separator  className="my-8"/>      

      {/* Bio */}
      <section className=" space-y-4 leading-relaxed text-muted-foreground">
        <h1 className=" text-lg text-primary leading-relaxed">About me</h1>
        {profile.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      {/* Quick facts */}
      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <dt className="font-mono text-xs text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {/* Languages — reuses the hover-row component */}
      <section className="mt-5 rounded-xl border border-border bg-card p-6">
        <LanguagesRow />
      </section>

      {/* Education */}
      <section className="mt-14">
        <h2 className="font-mono text-xs text-muted-foreground">
          ~/education
        </h2>
        <div className="mt-3 flex items-baseline justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4">
            <Image
              src="/ufscar.png"
              alt="UFSCar"
              width={52}
              height={52}
              className="rounded-lg border border-border"
            />
            <div>
              <p className="font-medium">{education.institution}</p>
              <p className="text-sm text-muted-foreground">{education.course}</p>
            </div>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {education.period}
          </span>
        </div>
      </section>
    </main>
  );
}