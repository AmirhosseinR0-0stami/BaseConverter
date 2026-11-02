const inputNum = document.getElementById("inputNum");
const fromBase = document.getElementById("inputBasis");
const toBase = document.getElementById("outputBasis");
const button = document.querySelector(".submitBtn button");
const resultBox = document.getElementById("resultBox");
const swapButton = document.getElementById("swapBases");
const baseNames = {
    2: "باینری",
    8: "اکتال",
    10: "دسیمال",
    16: "هگزادسیمال"
};

function charToValue(ch) {
    if (ch >= "0" && ch <= "9") {
        return ch.charCodeAt(0) - "0".charCodeAt(0);
    }

    if (ch >= "A" && ch <= "F") {
        return ch.charCodeAt(0) - "A".charCodeAt(0) + 10;
    }

    if (ch >= "a" && ch <= "f") {
        return ch.charCodeAt(0) - "a".charCodeAt(0) + 10;
    }

    return -1;
}
function valueToChar(v) {
    if (v >= 0 && v <= 9) {
        return String.fromCharCode(v + "0".charCodeAt(0));
    }

    return String.fromCharCode(v - 10 + "A".charCodeAt(0));
}
function toDecimal(num, base) {
    let result = 0;

    for (let i = 0; i < num.length; i++) {
        const val = charToValue(num[i]);

        if (val < 0 || val >= base) {
            return NaN;
        }

        result = result * base + val;
    }

    return result;
}
function fromDecimal(decimal, base) {
    if (decimal === 0) {
        return "0";
    }

    let result = "";

    while (decimal > 0) {
        const remainder = decimal % base;

        result = valueToChar(remainder) + result;

        decimal = Math.floor(decimal / base);
    }

    return result;
}
function convert(num, fromBasis, toBasis) {
    const decimalValue = toDecimal(num, fromBasis);

    if (Number.isNaN(decimalValue)) {
        return "ورودی نامعتبر است!";
    }

    return fromDecimal(decimalValue, toBasis);
}
function showResult(num, from, to, converted) {
    const isEmpty = num.length === 0;

    const isInvalid =
        !isEmpty &&
        converted === "ورودی نامعتبر است!";

    const isError = isEmpty || isInvalid;

    resultBox.classList.remove(
        "result-success",
        "result-error",
        "result-pop"
    );

    void resultBox.offsetWidth;

    resultBox.classList.add(
        isError ? "result-error" : "result-success",
        "result-pop"
    );

    const title = isEmpty
        ? "ورودی خالی است"
        : isInvalid
            ? "خطا در تبدیل"
            : "نتیجه تبدیل";

    const description = isEmpty
        ? "برای شروع، یک عدد وارد کن."
        : isInvalid
            ? "عدد واردشده با مبنای انتخابی سازگار نیست."
            : "عدد شما با موفقیت تبدیل شد.";

    const finalValue = isEmpty
        ? "عدد را وارد کنید."
        : converted;

    resultBox.replaceChildren();

    const heading = document.createElement("div");
    heading.className = "result-heading";

    const icon = document.createElement("div");
    icon.className = "result-icon";

    const iconText = document.createElement("span");
    iconText.textContent = isError ? "!" : "🧮";

    icon.appendChild(iconText);

    const headingContent = document.createElement("div");

    const headingTitle = document.createElement("h3");
    headingTitle.textContent = title;

    const headingDescription = document.createElement("p");
    headingDescription.textContent = description;

    headingContent.append(headingTitle, headingDescription);

    const status = document.createElement("span");
    status.className = "result-status";
    status.textContent = isError
        ? "ERROR"
        : "SUCCESS";

    heading.append(icon, headingContent, status);

    const details = document.createElement("div");
    details.className = "result-details";

    const items = [
        {
            label: "عدد ورودی",
            value: num || "---"
        },
        {
            label: "مبنای ورودی",
            value: `${from} · ${baseNames[from]}`
        },
        {
            label: "مبنای خروجی",
            value: `${to} · ${baseNames[to]}`
        }
    ];

    items.forEach(item => {
        const element = document.createElement("div");
        element.className = "result-item";

        const label = document.createElement("span");
        label.textContent = item.label;

        const value = document.createElement("p");
        value.dir = "ltr";
        value.textContent = item.value;

        element.append(label, value);

        details.appendChild(element);
    });


    const divider = document.createElement("div");
    divider.className = "result-divider";


    const finalResult = document.createElement("div");
    finalResult.className = "final-result";

    const finalLabel = document.createElement("span");
    finalLabel.className = "final-result-label";

    finalLabel.textContent = isError
        ? "پیام سیستم"
        : "مقدار تبدیل‌شده";

    const finalText = document.createElement("p");
    finalText.className = "final-result-value";
    finalText.dir = "ltr";
    finalText.textContent = finalValue;

    finalResult.append(finalLabel, finalText);


    resultBox.append(
        heading,
        details,
        divider,
        finalResult
    );
}

button.addEventListener("click", () => {
    const num = inputNum.value.trim();

    const from = Number(fromBase.value);
    const to = Number(toBase.value);

    const converted = num.length === 0
        ? "ورودی نامعتبر است!"
        : convert(num, from, to);

    showResult(num, from, to, converted);
});
inputNum.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});
swapButton.addEventListener("click", () => {
    const previousFrom = fromBase.value;

    fromBase.value = toBase.value;
    toBase.value = previousFrom;

    swapButton.classList.remove("swap-animation");

    void swapButton.offsetWidth;

    swapButton.classList.add("swap-animation");

    const num = inputNum.value.trim();

    if (num.length > 0) {
        const from = Number(fromBase.value);
        const to = Number(toBase.value);

        const converted = convert(num, from, to);

        showResult(num, from, to, converted);
    }
});
swapButton.addEventListener("animationend", () => {
    swapButton.classList.remove("swap-animation");
});
