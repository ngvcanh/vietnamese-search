import search from "./search";

describe("search", () => {
  describe("exact matches", () => {
    const text = "Hôm nay trời đẹp quá";

    it("should find single word matches", () => {
      expect(search(text, "troi")).toMatchObject({
        matches: ["trời"],
        positions: [{ start: 8, length: 4 }],
      });
    });

    it("should find phrase matches", () => {
      expect(search(text, "troi dep")).toMatchObject({
        matches: ["trời đẹp"],
        positions: [{ start: 8, length: 8 }],
      });
    });

    it("should find multiple words phrase", () => {
      expect(search(text, "hom nay troi")).toMatchObject({
        matches: ["Hôm nay trời"],
        positions: [{ start: 0, length: 12 }],
      });
    });
  });

  describe("partial matches", () => {
    const menuText = `THỰC ĐƠN:
- Món #123: Phở bò tái nạm gầu
- Món #456: Cơm tấm sườn bì chả
*Giá: 50.000đ/phần

KHUYẾN MÃI:
+ Freeship dưới 2km
+ Giảm 10% cho hoá đơn trên 200k

Liên hệ: 0123-456-789
Địa chỉ: 123/45 Đường Lê_Lợi, P.Bến_Nghé, Q.1, TP.HCM

#pho #comtam #monngon #ship`.trim();

    it("should find numbers", () => {
      expect(search(menuText, "123")).toMatchObject({
        matches: ["123", "123", "123"],
        positions: [
          { start: 17, length: 3 },
          { start: 169, length: 3 },
          { start: 190, length: 3 },
        ],
      });
    });

    it("should find with diacritics characters", () => {
      expect(search(menuText, "pho")).toMatchObject({
        matches: ["Phở", "pho"],
        positions: [
          { start: 22, length: 3 },
          { start: 237, length: 3 },
        ],
      });
    });

    it("should find words containing underscore", () => {
      expect(search(menuText, "ben nghe")).toMatchObject({
        matches: ["Bến_Nghé"],
        positions: [{ start: 213, length: 8 }],
      });
    });
  });

  describe("multiple matches in complex text", () => {
    const reportText = `
      BÁO CÁO KINH DOANH 2023
      ---------------------------
      
      1. Quý 1/2023:
      - Doanh thu: 1.234.567.890đ
      - Chi phí: 567.890.123đ
      - Lợi nhuận: 666.677.767đ
      
      2. Quý 2/2023:
      - Doanh thu: 2.345.678.901đ
      - Chi phí: 789.012.345đ
      - Lợi nhuận: 1.556.666.556đ
      
      3. Quý 3/2023:
      - Doanh thu: 3.456.789.012đ
      - Chi phí: 901.234.567đ
      - Lợi nhuận: 2.555.554.445đ
      
      4. Quý 4/2023:
      - Doanh thu: 4.567.890.123đ
      - Chi phí: 1.234.567.890đ
      - Lợi nhuận: 3.333.322.233đ
      
      === TỔNG KẾT NĂM 2023 ===
      * Tổng doanh thu: 11.604.925.926đ
      * Tổng chi phí: 3.492.704.925đ
      * Tổng lợi nhuận: 8.112.221.001đ
      
      Ghi chú: Số liệu đã được kiểm toán bởi CÔNG TY TNHH KIỂM TOÁN ABC
      Mã số thuế: 0123456789-001
    `.trim();

    it("should find and match financial numbers", () => {
      expect(search(reportText, "567")).toMatchObject({
        matches: ["567", "567", "567", "567", "567", "567"],
        positions: [
          { start: 111, length: 3 },
          { start: 137, length: 3 },
          { start: 395, length: 3 },
          { start: 483, length: 3 },
          { start: 519, length: 3 },
          { start: 819, length: 3 },
        ],
      });
    });

    it("should find recurring phrases in Vietnamese text", () => {
      expect(search(reportText, "doanh thu")).toMatchObject({
        matches: ["Doanh thu", "Doanh thu", "Doanh thu", "Doanh thu", "doanh thu"],
        positions: [
          { start: 94, length: 9 },
          { start: 218, length: 9 },
          { start: 344, length: 9 },
          { start: 470, length: 9 },
          { start: 614, length: 9 },
        ],
      });
    });

    it("should find with case sensitivity in Vietnamese", () => {
      expect(search(reportText, "tong")).toMatchObject({
        matches: ["TỔNG", "Tổng", "Tổng", "Tổng"],
        positions: [
          { start: 579, length: 4 },
          { start: 609, length: 4 },
          { start: 649, length: 4 },
          { start: 686, length: 4 },
        ],
      });
    });
  });

  describe("special characters handling", () => {
    it("should handle text with mixed unicode blocks", () => {
      const mixedText = "Xin chào 你好 こんにちは แผ่นดินฮั่นเสื่อมโทรมแสนสังเวช";
      expect(search(mixedText, "xin chao")).toMatchObject({
        matches: ["Xin chào"],
        positions: [{ start: 0, length: 8 }],
      });
    });

    // it("should handle text containing emojis", () => {
    //   const emojiText = "👋 Xin chào 🌍! Chào mừng đến 🇻🇳 Việt Nam 🎉";
    //   expect(search(emojiText, "viet nam")).toMatchObject({
    //     matches: ["Việt Nam"],
    //     positions: [{ start: 32, length: 8 }],
    //   });
    // });

    it("should handle text with control characters", () => {
      const controlText = "Dòng1\r\nDòng2\tCách\u0000KýTựNull\u001FĐơnVị";
      expect(search(controlText, "dong")).toMatchObject({
        matches: ["Dòng", "Dòng"],
        positions: [
          { start: 0, length: 4 },
          { start: 7, length: 4 },
        ],
      });
    });
  });

  describe("regex special characters in text", () => {
    const text = "Chào (thế giới) [kiểm tra] {123} ^bắt đầu$ |đường|\\gạch chéo/";

    it("should handle regex special characters in search pattern", () => {
      expect(search(text, "(the gioi)")).toMatchObject({
        matches: ["thế giới"],
        positions: [{ start: 6, length: 8 }],
      });

      expect(search(text, "[kiem tra]")).toMatchObject({
        matches: ["kiểm tra"],
        positions: [{ start: 17, length: 8 }],
      });

      expect(search(text, "\\gach cheo")).toMatchObject({
        matches: ["gạch chéo"],
        positions: [{ start: 51, length: 9 }],
      });
    });
  });
});
