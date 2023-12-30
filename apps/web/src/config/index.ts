export const siteConfig = {
  name: "Gitau Labs",
  logo: "/images/logo.png",
  author: "Rodgers M Gitau",
  url: "https://labs.rgitau.com",
  ogImage: "https://labs.rgitau.com/og.jpg",
  repo: "https://github.com/rodgersgitau/labs",
  authorLinks: {
    twitter: "https://twitter.com/funkybantu",
    github: "https://github.com/rodgersgitau/labs",
  },
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  navLinks: [
    { path: "/about", label: "About" },
    { path: "/shop", label: "Shop" },
    { path: "/games", label: "Games" },
    { path: "/ranking", label: "Ranking" },
  ],
};

export type SiteConfig = typeof siteConfig;
