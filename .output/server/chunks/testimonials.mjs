import { defineEventHandler } from 'h3';

const testimonials = defineEventHandler(() => {
  return [
    {
      id: 1,
      title: "Name",
      content: {
        en: "English.",
        id_ID: "Indonesia."
      },
      image: "/images/.png"
    }
  ];
});

export { testimonials as default };
//# sourceMappingURL=testimonials.mjs.map
