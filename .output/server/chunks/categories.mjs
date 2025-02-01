import { defineEventHandler } from 'h3';

const categories = defineEventHandler(() => {
  return [
    {
      id: 1,
      title: {
        en: "Web App",
        id_ID: "Web App"
      }
    },
    {
      id: 2,
      title: {
        en: "Graphic Desgin",
        id_ID: "Desain Grafis"
      }
    }
  ];
});

export { categories as default };
//# sourceMappingURL=categories.mjs.map
