export interface SlugifyOptions {
  separator?: string;
}

export default function slugify(str: string, options: SlugifyOptions = {}): string {
  const { separator = "-" } = options;

  if (!str) {
    return "";
  }

  str = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^\w]|_|-/g, separator);


  if (!separator) {
    return str.trim();
  }

  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return str
    .replace(new RegExp(`${escapedSeparator}+`, "g"), separator)
    .replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, "g"), "")
    .trim();
}
