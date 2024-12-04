import slugify from "./slugify";

export interface SearchResult {
  matches: string[];
  positions: Array<{
    start: number;
    length: number;
  }>;
};

const searchOptions = { separator: " " };

export default function search(original: string, search: string): SearchResult {
  const slugified = slugify(search, searchOptions);
  const searchLength = slugified.length;
  const result: SearchResult = { matches: [], positions: [] };

  if (!searchLength) {
    return result;
  }

  const originalChars = [...original.split("")].map((char, index) => ({
    originIndex: index,
    slugified: slugify(char, searchOptions),
    char,
  }));

  const originalFiltered = originalChars.filter((obj, index, chars) => {
    if (index === 0) {
      return obj.slugified;
    }

    if (obj.char === " "){
      return chars[index - 1].slugified;
    }

    return 1;
  });

  if (originalFiltered.length < searchLength) {
    return result;
  }

  for (let i = 0; i < originalFiltered.length;) {
    const firstChar = originalFiltered[i];

    if (firstChar.slugified !== slugified[0]) {
      ++i;
      continue;
    }
    const endPosition = i + searchLength;

    if (endPosition > originalFiltered.length) {
      break;
    }

    const chars = originalFiltered.slice(i, endPosition);

    const text = chars
      .map((c) => c.slugified === "" ? " " : c.slugified)
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    if (text !== slugified) {
      ++i;
      continue;
    }

    const lastChar = chars[chars.length - 1];
    const match = original.substring(firstChar.originIndex, lastChar.originIndex + 1);
    const length = match.length;

    result.matches.push(match);
    result.positions.push({
      start: firstChar.originIndex,
      length,
    });

    i = endPosition + 1;
  }

  return result;
}
