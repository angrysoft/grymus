const groups = [
  {
    name: "Mrówki",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Iwona Grzeszczak mgr Joanna Jędrych</p><p><strong>Pomaga nam:</strong> Katarzyna Skoczek</p>",
    image: "/img/mrowki.webp",
    urls: [{ name: "Galeria", url: "/galeria/mrowki" }],
  },
  {
    name: "Wieloryby",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Beata Chrzanowska mgr Małgorzata Olszowa</p><p><strong>Pomaga nam:</strong> Renata Sobota</p>",
    image: "/img/wieloryby.webp",
    urls: [{ name: "Galeria", url: "/galeria/wieloryby" }],
  },
  {
    name: "Żaby",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Małgorzata Gawryluk mgr Aneta Wasążnik</p><p><strong>Pomaga nam:</strong> Monika Bąk</p>",
    image: "/img/zaby.webp",
    urls: [{ name: "Galeria", url: "/galeria/zaby" }],
  },
  {
    name: "Pszczoły",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Emilia Trzepałka mgr Aneta Wasążnik mgr Dominika Kudlicka</p><p><strong>Pomaga nam:</strong> Urszula Walicka Barbara Chmiel</p>",
    image: "/img/pszczoly.webp",
    urls: [{ name: "Galeria", url: "/galeria/pszczoly" }],
  },
  {
    name: "Koty",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Urszula Musielak mgr Małgorzata Daniluk</p><p><strong>Nauczyciel wspomagający:</strong> mgr Agnieszka Kądziela<strong></p><p><strong>Pomoc nauczyciela: Maria Waszczak</p><p><strong>Pomaga nam:</strong> Bożena Sulejewska</p>",
    image: "/img/koty.webp",
    urls: [{ name: "Galeria", url: "/galeria/koty" }],
  },
  {
    name: "Żyrafy",
    desc: "<p><strong>Wychowawczynie:</strong> mgr Anna Orłowska Beata Włodek-Bazewicz</p><p><strong>Nauczyciel wspomagający:</strong> mgr Małgorzata Daniluk<strong></p><p><strong>Pomaga nam:</strong> Dorota Zielińska Iwona Czułba</p>",
    image: "/img/zyrafy.webp",
    urls: [{ name: "Galeria", url: "/galeria/zyrafy" }],
  },
];

export async function GET() {
  return Response.json(groups);
}
