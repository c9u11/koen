"use strict";
exports.__esModule = true;
exports.koen = void 0;
var koen = function (text) {
    var engChosung = "rRseEfaqQtTdwWczxvg";
    var engChosungReg = "[" + engChosung + "]";
    var engJungsung = {
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
        l: 20
    };
    var engJungsungReg = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";
    var engJongsung = {
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
        g: 27
    };
    var engJongsungReg = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";
    var korChosung = [
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
    var korJungsung = [
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
    var korJongsung = [
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
    var korToEng = {
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
        ㅄ: "qt"
    };
    var regExp = new RegExp("(" +
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
        "))|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]", "g");
    var convertToEng = function (substring) {
        if (korToEng[substring])
            return korToEng[substring];
        var ga = 44032;
        var uni = substring.charCodeAt(0) - ga;
        var choIdx = parseInt("".concat(uni / 588));
        var jungIdx = parseInt("".concat((uni - choIdx * 588) / 28));
        var jongIdx = parseInt("".concat(uni % 28));
        var cho = korToEng[korChosung[choIdx]];
        var jung = korToEng[korJungsung[jungIdx]];
        var jong = korToEng[korJongsung[jongIdx]];
        return "".concat(cho).concat(jung).concat(jong || "");
    };
    var convertToKor = function (substring, cho, jung, jong) {
        return String.fromCharCode(engChosung.indexOf(cho) * 588 +
            engJungsung[jung] * 28 +
            engJongsung[jong] +
            44032);
    };
    var converter = function (substring, cho, jung, jong) {
        var isKorean = !cho;
        return isKorean
            ? convertToEng(substring)
            : convertToKor(substring, cho, jung, jong);
    };
    var result = text.replace(regExp, converter);
    return result;
};
exports.koen = koen;
