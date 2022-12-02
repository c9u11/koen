const convertKorToEng = (text) => {
  const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
    'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
    'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const toEng = {
    'ㄱ': 'r',
    'ㄲ': 'R',
    'ㄴ': 's',
    'ㄷ': 'e',
    'ㄸ': 'E',
    'ㄹ': 'f',
    'ㅁ': 'a',
    'ㅂ': 'q',
    'ㅃ': 'Q',
    'ㅅ': 't',
    'ㅆ': 'T',
    'ㅇ': 'd',
    'ㅈ': 'w',
    'ㅉ': 'W',
    'ㅊ': 'c',
    'ㅋ': 'z',
    'ㅌ': 'x',
    'ㅍ': 'v',
    'ㅎ': 'g',
    'ㅏ': 'k',
    'ㅐ': 'o',
    'ㅑ': 'i',
    'ㅒ': 'O',
    'ㅓ': 'j',
    'ㅔ': 'p',
    'ㅕ': 'u',
    'ㅖ': 'P',
    'ㅗ': 'h',
    'ㅘ': 'hk',
    'ㅙ': 'ho',
    'ㅚ': 'hl',
    'ㅛ': 'y',
    'ㅜ': 'n',
    'ㅝ': 'nj',
    'ㅞ': 'np',
    'ㅟ': 'nl',
    'ㅠ': 'b',
    'ㅡ': 'm',
    'ㅢ': 'ml',
    'ㅣ': 'l',
    'ㄳ': 'rt',
    'ㄵ': 'sw',
    'ㄶ': 'sg',
    'ㄺ': 'sr',
    'ㄻ': 'fa',
    'ㄼ': 'fq',
    'ㄽ': 'ft',
    'ㄾ': 'fx',
    'ㄿ': 'fv',
    'ㅀ': 'fg',
    'ㅄ': 'qt'
  }
  const ga = 44032;
  const result = [];
  for (let char of text) {
    if (toEng[char]) {
      result.push(toEng[char]);
      continue;
    }

    let uni = char.charCodeAt(0) - ga;

    let choIdx = parseInt(uni / 588);
    let jungIdx = parseInt((uni - (choIdx * 588)) / 28);
    let jongIdx = parseInt(uni % 28);
    // result.push({
    //   cho: CHO[choIdx],
    //   jung: JUNG[jungIdx],
    //   jong: JONG[jongIdx]
    // })
    const cho = toEng[CHO[choIdx]];
    const jung = toEng[JUNG[jungIdx]];
    const jong = toEng[JONG[jongIdx]];
    result.push(cho, jung);
    if (jong) result.push(jong);
  }

  return result;
};

console.log(convertKorToEng("ㄱ나다라다앍가슴살"));