import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("Hero");
  return (
    <section className="flex flex-col items-start pt-12 sm:pt-20">
      {/* terminal prompt eyebrow */}

      <h1 className="max-w-3xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
        {t("titleName")}{" "}
        <span className="text-muted-foreground">{t("titleMuted")}</span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/work">
            {t("viewWorks")}
              <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about">{t("aboutMe")}</Link>
        </Button>
      </div>

    </section>
  );
}
