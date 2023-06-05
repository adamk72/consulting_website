// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Adam Kecskes Consulting",
  tagline: "Less Effort, Better Results",
  url: "https://kecskes.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/blue_flipped_imbr_icon.png",
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
          blogSidebarTitle: 'Ten most recent posts',
          blogSidebarCount: 10,
        },
        theme: {
          customCss: [
            require.resolve('./src/css/decorators.scss'),
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/grids.css'),
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
          alt: "Teamwork Site Logo",
          src: "img/flipped_imbr_icon.svg",
        },
        items: [
          { to: "/resume", label: "Resume", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: 'Light Reading',
            items: [
              // {
              //   label: 'Getting Started',
              //   to: 'docs/',
              // },
              {
                label: 'Tech & PM Blog',
                to: 'blog',
              },
              // {
              //   label: 'Speaking Blog',
              //   to: 'speaking-blog',
              // },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/adamkecskes/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/adamk72',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/13907148/adam-kecskes',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/akecskes',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Adam Kecskes Consulting`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [
      'docusaurus-plugin-sass', require.resolve("@cmfcmf/docusaurus-search-local"),
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
    ]
};

module.exports = config;
