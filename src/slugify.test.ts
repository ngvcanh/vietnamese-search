import slugify, { SlugifyOptions } from "./slugify";

describe("slugify", () => {
  describe("Vietnamese characters", () => {
    it("should convert vowels with marks", () => {
      const cases = [
        { input: "áàạảãâấầậẩẫăắằặẳẵ", expected: "aaaaaaaaaaaaaaaaa" },
        { input: "éèẹẻẽêếềệểễ", expected: "eeeeeeeeeee" },
        { input: "íìịỉĩ", expected: "iiiii" },
        { input: "óòọỏõôốồộổỗơớờợởỡ", expected: "ooooooooooooooooo" },
        { input: "úùụủũưứừựửữ", expected: "uuuuuuuuuuu" },
        { input: "ýỳỵỷỹ", expected: "yyyyy" },
      ];

      cases.forEach(({ input, expected }) => {
        expect(slugify(input)).toBe(expected);
      });
    });

    it("should convert đ/Đ to d", () => {
      expect(slugify("đường Đi")).toBe("duong-di");
    });
  });

  describe("separator handling", () => {
    const text = "Hello World";

    it("should use hyphen as default separator", () => {
      expect(slugify(text)).toBe("hello-world");
    });

    it("should handle custom separators", () => {
      const cases: Array<[string, SlugifyOptions]> = [
        ["hello_world", { separator: "_" }],
        ["hello world", { separator: " " }],
        ["helloworld", { separator: "" }],
        ["hello.world", { separator: "." }],
      ];

      cases.forEach(([expected, options]) => {
        expect(slugify(text, options)).toBe(expected);
      });
    });

    it("should handle special characters in separator", () => {
      const options = { separator: "*" };
      expect(slugify("hello world", options)).toBe("hello*world");
    });
  });

  describe("special cases", () => {
    it("should handle multiple spaces", () => {
      expect(slugify("hello   world")).toBe("hello-world");
    });

    it("should handle leading/trailing spaces", () => {
      expect(slugify("  hello world  ")).toBe("hello-world");
    });

    it("should handle special characters", () => {
      const cases = [
        { input: "hello!@#$%^&*()world", expected: "hello-world" },
        { input: "hello___world", expected: "hello-world" },
        { input: "hello...world", expected: "hello-world" },
      ];

      cases.forEach(({ input, expected }) => {
        expect(slugify(input)).toBe(expected);
      });
    });

    it("should handle numbers", () => {
      expect(slugify("hello 123 world")).toBe("hello-123-world");
    });

    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });

    it("should handle strings with only special characters", () => {
      expect(slugify("!@#$%^&*()")).toBe("");
    });
  });

  describe("case conversion", () => {
    it("should convert to lowercase", () => {
      expect(slugify("HELLO WORLD")).toBe("hello-world");
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("hElLo WoRlD")).toBe("hello-world");
    });
  });
});