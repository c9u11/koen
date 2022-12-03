export const convertEngToKor = (text: string) => {
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
      "))",
    "g"
  );

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

  const result = text.replace(regExp, convertToKor);
  return result;
};

console.log(
  convertEngToKor(`qustn tjsdjsdms ㅍㅁㄱ, 채ㅜㄴㅅ, ㅣㄷㅅdmfh tjsdjsgkqslek.`)
);
