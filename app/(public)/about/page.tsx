import { getTranslations } from "next-intl/server";
import { ProfileHeader } from "@/components/about/profile-header";
import { LanguagesRow } from "@/components/layout/languages-row";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return {
    title: "About — Pedro Parisi",
    description: `${t("role")}. ${t("heading")}.`,
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const bio = t.raw("bio") as string[];
  const facts = [
    { label: t("factBasedInLabel"), value: t("factBasedInValue") },
    { label: t("factWritingLabel"), value: t("factWritingValue") },
    { label: t("factStatusLabel"), value: t("factStatusValue") },
    { label: t("factSinceLabel"), value: t("factSinceValue") },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 sm:px-8 pb-24">
      <p className="pt-14 pb-8 font-mono text-sm text-primary ">
        <span className="text-muted-foreground">~/</span>about-me
      </p>

      <ProfileHeader />
      <Separator  className="my-8"/>

      {/* Bio */}
      <section className=" space-y-4 leading-relaxed text-muted-foreground">
        <h1 className=" text-lg text-primary leading-relaxed">{t("heading")}</h1>
        {bio.map((paragraph, i) => (
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
          {t("educationLabel")}
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
              <p className="font-medium">{t("institution")}</p>
              <p className="text-sm text-muted-foreground">{t("course")}</p>
            </div>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {t("period")}
          </span>
        </div>
      </section>
    </main>
  );
}