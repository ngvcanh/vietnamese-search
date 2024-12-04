const { search, slugify } = require("vietnamese-search");

console.log("Basic example :: slugify ::", slugify("Việt Nam Xin Chào Thế Giới"));
console.log("Basic example :: slugify :: [separator= ]", slugify("Việt Nam Xin Chào Thế Giới", { separator: " " }));

console.log("Basic example :: search :: (Việt Nam)", search("Việt Nam Xin Chào Thế Giới", "Việt Nam"));
console.log("Basic example :: search :: (xin chao the)", search("Việt Nam Xin Chào Thế Giới", "xin chao the"));
