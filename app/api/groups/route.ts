const groups = [
  {
    name: "Mrówki",
    desc: "<p>Wychowawczynie: mgr Iwona Grzeszczak mgr Joanna Jędrych</p><p>Pomaga nam: Katarzyna Skoczek</p>",
    image: "/img/mrowki.jpg",
    urls: [{ name: "Galeria", url: "/galeria/mrowki" }],
  },
  {
    name: "Wieloryby",
    desc: "",
    image: "/img/wieloryby.jpg",
    urls: [{ name: "Galeria", url: "/galeria/wieloryby" }],
  },
  {
    name: "Żaby",
    desc: "",
    image: "/img/zaby.jpg",
    urls: [{ name: "Galeria", url: "/galeria/zaby" }],
  },
  {
    name: "Pszczoły",
    desc: "",
    image: "/img/pszczoly.jpg",
    urls: [{ name: "Galeria", url: "/galeria/pszczoly" }],
  },
  {
    name: "Koty",
    desc: "",
    image: "/img/koty.jpg",
    urls: [{ name: "Galeria", url: "/galeria/koty" }],
  },
];

export async function GET() {
  return Response.json(groups);
}
