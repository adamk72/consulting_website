// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "More than Just Engineering Management",
  tagline:
    "Purveyor of fine software development, leadership, and process improvement for the discerning corporate palate.",
  url: "https://kecskes.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "/img/flipped_imbr_icon.svg",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "adamk72", // Usually your GitHub org/user name.
  projectName: "consulting_website", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          blogSidebarTitle: "Most recent posts",
          blogSidebarCount: 20,
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/decorators.scss"),
            require.resolve("./src/css/custom.css"),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Adam Kecskes Consulting",
        logo: {
          alt: "logo",
          src: "img/flipped_imbr_icon.svg",
        },
        items: [
          { to: "/resume", label: "Resume", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/docs", label: "Haskell", position: "left" },
        ],
      },
      footer: {
        links: [
          {
            title: "Light Reading",
            items: [
              {
                label: "Tech & PM Blog",
                to: "blog",
              },
              {
                label: "Learning Haskell",
                to: "docs/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/adamkecskes/",
              },
              {
                label: "GitHub",
                href: "https://github.com/adamk72",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/users/13907148/adam-kecskes",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/akecskes",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Adam Kecskes Consulting`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ["haskell"],
      },
    }),
  plugins: [
    "docusaurus-plugin-sass",
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

module.exports = config;
