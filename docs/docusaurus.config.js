// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Obsidian Advanced URI',
  tagline: 'Control everything in Obsidian via URI',
  url: 'https://vinzent03.github.io',
  baseUrl: '/obsidian-advanced-uri/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'Vinzent03', // Usually your GitHub org/user name.
  projectName: 'obsidian-advanced-uri', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Vinzent03/obsidian-advanced-uri/tree/master/docs',
        },

      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Obsidian Advanced URI',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            href: 'https://github.com/Vinzent03/obsidian-advanced-uri',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contact',
            items: [
              {
                label: 'Support Me',
                href: 'https://ko-fi.com/vinzent',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Vinzent03',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Vinzent03_',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Feature Request',
                href: 'https://github.com/Vinzent03/obsidian-advanced-uri/issues',
              },
              {
                label: 'Bug Report',
                href: 'https://github.com/Vinzent03/obsidian-advanced-uri/issues',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Vinzent03/obsidian-advanced-uri',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["uri"]
      },
    }),
};

module.exports = config;
