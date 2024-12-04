# Vietnamese Search

A lightweight utility library for processing Vietnamese text, including slug generation and keyword-based search.

## Features

- Slugify: Convert Vietnamese text into URL-friendly slugs.
- Search: Perform simple keyword searches on Vietnamese text.

## Installation

Install the package using Yarn or NPM:

```bash
# Using Yarn
yarn add vietnamese-search

# Using NPM
npm install vietnamese-search
```

## Usage

### Importing the Library

```javascript
// CommonJS
const { slugify, search } = require('vietnamese-search');

// ES Module
import { slugify, search } from 'vietnamese-search';
```

### Slugify

The `slugify` function converts a given string into a slug suitable for URLs. It handles Vietnamese diacritics and removes special characters.

```javascript
const text = "Xin chào, Việt Nam!";

const slug1 = slugify(text);
console.log(slug1);
// Output: "xin-chao-viet-nam"

const slug2 = slugify(text, { separator: " " });
console.log(slug2);
// Output: "xin chao viet nam"
```

#### Parameters

1. `text` *(string)*: The input string to be converted.
2. `options` *(SlugifyOptions, optional)*: 
  - `separator` *(string, optional)*: The character used to separate words in the slug. Defaults to "-".

#### Returns

- *(string)*: The slugified version of the input string.

### Search

The `search` function performs a keyword search in a given text and provides details about all matches, including the matched strings and their positions.

```javascript
const text = "Xin chào, Việt Nam! Chào mừng bạn đến với Việt Nam.";
const keyword = "chào";

const result = search(text, keyword);
console.log(result);
// Output:
// {
//   matches: ["chào", "Chào"],
//   positions: [
//     { start: 4, length: 4 },
//     { start: 18, length: 4 }
//   ]
// }
```

#### Parameters

1. `text1` *(string, required)*: The input text to search in.
2.	`keyword` *(string, required)*: The keyword to search for.

#### Returns

- *(SearchResult)*: An object with the following structure:
	- `matches` *(string[])*: An array of strings that match the keyword (case-insensitive).
	- `positions` *(object[])*: An array of objects containing the start index and length of each match.

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Support

If you encounter any issues or have feature requests, feel free to open an issue on [GitHub](https://github.com/ngvcanh/vietnamese-search).
