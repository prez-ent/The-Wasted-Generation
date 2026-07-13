import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  jsonLd?: object;
}

export function PageMeta({ title, description, image = "/opengraph.jpg", jsonLd }: PageMetaProps) {
  const fullTitle = `${title} | TWG Network`;
  const [location] = useLocation();
  const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "");
  const canonical = siteUrl ? `${siteUrl}${location === "/" ? "" : location}` : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="TWG Network — The Wasted Generation" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
