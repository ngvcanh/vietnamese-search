import { search, slugify } from "vietnamese-search";

console.log("ESM example :: slugify ::", slugify("Việt Nam Xin Chào Thế Giới"));
console.log("ESM example :: slugify :: [separator= ]", slugify("Việt Nam Xin Chào Thế Giới", { separator: " " }));

console.log("ESM example :: search :: (Việt Nam)", search("Việt Nam Xin Chào Thế Giới", "Việt Nam"));
console.log("ESM example :: search :: (xin chao the)", search("Việt Nam Xin Chào Thế Giới", "xin chao the"));
