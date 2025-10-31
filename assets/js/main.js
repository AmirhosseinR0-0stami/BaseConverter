const inputNum = document.getElementById("inputNum");
const fromBase = document.getElementById("inputBasis");
const toBase = document.getElementById("outputBasis");
const button = document.querySelector(".submitBtn button");
const resultBox = document.getElementById("resultBox");

function charToValue(ch) {
    if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - '0'.charCodeAt(0);
    if (ch >= 'A' && ch <= 'F') return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    if (ch >= 'a' && ch <= 'f') return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    return -1;
}

function valueToChar(v) {
    if (v >= 0 && v <= 9) return String.fromCharCode(v + '0'.charCodeAt(0));
    return String.fromCharCode(v - 10 + 'A'.charCodeAt(0));
}

function toDecimal(num, base) {
    let result = 0;
    for (let i = 0; i < num.length; i++) {
        const val = charToValue(num[i]);
        if (val < 0 || val >= base) return NaN; // بررسی ورودی نامعتبر
        result = result * base + val;
    }
    return result;
}

function fromDecimal(decimal, base) {
    if (decimal === 0) return "0";
    let result = "";
    while (decimal > 0) {
        let remainder = decimal % base;
        result = valueToChar(remainder) + result;
        decimal = Math.floor(decimal / base);
    }
    return result;
}

function convert(num, fromBasis, toBasis) {
    const decimalValue = toDecimal(num, fromBasis);
    if (isNaN(decimalValue)) return "ورودی نامعتبر است!";
    const result = fromDecimal(decimalValue, toBasis);
    return result;
}

button.addEventListener("click", () => {
    const num = inputNum.value.trim();
    const from = parseInt(fromBase.value);
    const to = parseInt(toBase.value);

    const converted = convert(num, from, to);

    resultBox.innerHTML = `
        <p>عدد ورودی: ${num}</p>
        <p>مبنای ورودی: ${from}</p>
        <p>مبنای خروجی: ${to}</p>
        <hr>
        <p>نتیجه: <strong>${converted}</strong></p>
    `;
});
