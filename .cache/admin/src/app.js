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
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap() {},
};
