function phoneFormat(phoneNo: string): string {
  return phoneNo
    .split("")
    .map((i, index) => {
      if (index % 3 === 0) {
        return " " + i;
      }
      return i;
    })
    .join("");
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .split("")
    .map((c) => {
      switch (c) {
        case "ę":
          return "e";
        case "ó":
          return "o";
        case "ą":
          return "a";
        case "ś":
          return "s";
        case "ł":
          return "l";
        case "ż":
        case "ź":
          return "z";
        case "ć":
          return "c";
        case "ń":
          return "n";
        default:
          return c;
      }
    })
    .join("")
    .replace(/[^\w-]+/g, "");
}

export { phoneFormat, createSlug };
