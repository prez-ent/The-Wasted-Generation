import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
}

export function PageMeta({ title, description, image = "/opengraph.jpg" }: PageMetaProps) {
  const fullTitle = `${title} | TWG Network`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="TWG Network — The Wasted Generation" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
