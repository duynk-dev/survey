import MenuLogo from "./extensions/logo.png";
import AuthLogo from "./extensions/logo.png";
import favicon from "./extensions/logo.ico";
import vi from "./extensions/translations/vi.json";
import en from "./extensions/translations/en.json";

export default {
  config: {
    locales: ["en", "vi"],
    auth: {
      logo: AuthLogo,
    },
    // Extend the translations
    menu: {
      logo: MenuLogo,
    },
    head: {
      favicon: favicon,
    },
    translations: {
      en,
      vi,
    },
    theme: {
      colors: {
        primary100: "#f6ecfc",
        primary200: "#f6ecfc",
        primary500: "#ae1c31",
        primary600: "#ae1c3f",
        primary700: "#ae1c3f",
        danger700: "#b72b1a",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap() {},
};
