export const koen = (text: string) => {
  const engChosung = "rRseEfaqQtTdwWczxvg";
  const engChosungReg = "[" + engChosung + "]";
  const engJungsung: { [key: string]: number } = {
    k: 0,
    o: 1,
    i: 2,
    O: 3,
    j: 4,
    p: 5,
    u: 6,
    P: 7,
    h: 8,
    hk: 9,
    ho: 10,
    hl: 11,
    y: 12,
    n: 13,
    nj: 14,
    np: 15,
    nl: 16,
    b: 17,
    m: 18,
    ml: 19,
    l: 20,
  };
  const engJungsungReg = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";
  const engJongsung: { [key: string]: number } = {
    "": 0,
    r: 1,
    R: 2,
    rt: 3,
    s: 4,
    sw: 5,
    sg: 6,
    e: 7,
    f: 8,
    fr: 9,
    fa: 10,
    fq: 11,
    ft: 12,
    fx: 13,
    fv: 14,
    fg: 15,
    a: 16,
    q: 17,
    qt: 18,
    t: 19,
    T: 20,
    d: 21,
    w: 22,
    c: 23,
    z: 24,
    x: 25,
    v: 26,
    g: 27,
  };
  const engJongsungReg =
    "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";
  const korChosung = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const korJungsung = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const korJongsung = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const korToEng: { [key: string]: string } = {
    ㄱ: "r",
    ㄲ: "R",
    ㄴ: "s",
    ㄷ: "e",
    ㄸ: "E",
    ㄹ: "f",
    ㅁ: "a",
    ㅂ: "q",
    ㅃ: "Q",
    ㅅ: "t",
    ㅆ: "T",
    ㅇ: "d",
    ㅈ: "w",
    ㅉ: "W",
    ㅊ: "c",
    ㅋ: "z",
    ㅌ: "x",
    ㅍ: "v",
    ㅎ: "g",
    ㅏ: "k",
    ㅐ: "o",
    ㅑ: "i",
    ㅒ: "O",
    ㅓ: "j",
    ㅔ: "p",
    ㅕ: "u",
    ㅖ: "P",
    ㅗ: "h",
    ㅘ: "hk",
    ㅙ: "ho",
    ㅚ: "hl",
    ㅛ: "y",
    ㅜ: "n",
    ㅝ: "nj",
    ㅞ: "np",
    ㅟ: "nl",
    ㅠ: "b",
    ㅡ: "m",
    ㅢ: "ml",
    ㅣ: "l",
    ㄳ: "rt",
    ㄵ: "sw",
    ㄶ: "sg",
    ㄺ: "sr",
    ㄻ: "fa",
    ㄼ: "fq",
    ㄽ: "ft",
    ㄾ: "fx",
    ㄿ: "fv",
    ㅀ: "fg",
    ㅄ: "qt",
  };

  const regExp = new RegExp(
    "(" +
      engChosungReg +
      ")(" +
      engJungsungReg +
      ")((" +
      engJongsungReg +
      ")(?=(" +
      engChosungReg +
      ")(" +
      engJungsungReg +
      "))|(" +
      engJongsungReg +
      "))|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]",
    "g"
  );

  const convertToEng = function (substring: string) {
    if (korToEng[substring]) return korToEng[substring];

    const ga = 44032;
    let uni = substring.charCodeAt(0) - ga;
    let choIdx = parseInt(`${uni / 588}`);
    let jungIdx = parseInt(`${(uni - choIdx * 588) / 28}`);
    let jongIdx = parseInt(`${uni % 28}`);
    const cho = korToEng[korChosung[choIdx]];
    const jung = korToEng[korJungsung[jungIdx]];
    const jong = korToEng[korJongsung[jongIdx]];
    return `${cho}${jung}${jong || ""}`;
  };
  const convertToKor = function (
    substring: string,
    cho: string,
    jung: string,
    jong: string
  ) {
    return String.fromCharCode(
      engChosung.indexOf(cho) * 588 +
        engJungsung[jung] * 28 +
        engJongsung[jong] +
        44032
    );
  };

  const converter = function (
    substring: string,
    cho: string,
    jung: string,
    jong: string
  ) {
    const isKorean = !cho;
    return isKorean
      ? convertToEng(substring)
      : convertToKor(substring, cho, jung, jong);
  };

  const result = text.replace(regExp, converter);
  return result;
};

console.log(
  koen(`qustn tjsdjsdms ㅍㅁㄱ, 채ㅜㄴㅅ, ㅣㄷㅅdmfh tjsdjsgkqslek.`)
);
