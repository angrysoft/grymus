const groups = [
  {
    name: "Mrówki",
    desc: "<p>Wychowawczynie: mgr Iwona Grzeszczak mgr Joanna Jędrych</p><p>Pomaga nam: Katarzyna Skoczek</p>",
    image: "/img/mrowki.webp",
    urls: [{ name: "Galeria", url: "/galeria/mrowki" }],
  },
  {
    name: "Wieloryby",
    desc: "",
    image: "/img/wieloryby.webp",
    urls: [{ name: "Galeria", url: "/galeria/wieloryby" }],
  },
  {
    name: "Żaby",
    desc: "",
    image: "/img/zaby.webp",
    urls: [{ name: "Galeria", url: "/galeria/zaby" }],
  },
  {
    name: "Pszczoły",
    desc: "",
    image: "/img/pszczoly.webp",
    urls: [{ name: "Galeria", url: "/galeria/pszczoly" }],
  },
  {
    name: "Koty",
    desc: "",
    image: "/img/koty.webp",
    urls: [{ name: "Galeria", url: "/galeria/koty" }],
  },
];

export async function GET() {
  return Response.json(groups);
}
