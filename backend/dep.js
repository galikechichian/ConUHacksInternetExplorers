const regExpWeak = /[a-z]/;
const regExpMedium = /\d+/;
const regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
const min_week_password = 4;
const min_medium_password = 8;
const min_strong_password = 15;

const CHARACTERS = "`~!@#$%^&*()-_=+[]{}/|':;'?.>,<";
const SPECIAL = 20;
const ALPHA = 26;
const DIGITS = 10;

function special_char(password) {
    for (const char of CHARACTERS) {
        if (password.includes(char)) {
            return true;
        }
    }
    return false;
}

function get_possible_chars(password) {
    if (password.match(/^[a-zA-Z]+$/)) {
        return ["alpha"];
    }
    if (password.match(/^[0-9]+$/)) {
        return ["digit"];
    }

    if (!special_char(password)) {
        return ["alpha, digit"];
    }

    const to_return = [];
    if (password.match(/[a-zA-Z]/)) {
        to_return.push("alpha");
    }
    if (password.match(/\d/)) {
        to_return.push("digit");
    }
    if (special_char(password)) {
        to_return.push("special");
    }

    return to_return;
}

function get_hash_rate(password) {
    console.log("implement hash rate calculator");
    return 1_000_000_000;
}

function get_time(password) {
    // using entropy calculation
    const possible_chars = get_possible_chars(password);
    let N = 0;
    for (const type of possible_chars) {
        if (type === "alpha") {
            N += ALPHA;
        } else if (type === "digit") {
            N += DIGITS;
        } else {
            N += SPECIAL;
        }
    }

    const s = password.length;
    N = Math.pow(N, s);
    const C = get_hash_rate(password);

    // use formula: T = C / (N * s) to get time in seconds
    return C / (N * s) / 1000;
}

function hibp(password) {
    let hibp = require("hibp");
    console.log("This is the number of times the password has been leaked: ");
    hibp.pwnedPassword(password).then((numPwns) => console.log(numPwns));
}

function validPassword(input) {
    let text;
    const input_week = input.match(regExpWeak);
    const input_strong = input.match(regExpStrong);
    const input_medium = input.match(regExpMedium);
    if (input) {
        if (
            input.length <= min_week_password &&
            (input_week || input_medium || input_strong)
        ) {
            text = "Your password is too week";
        }
        if (
            input.length >= min_medium_password &&
            ((input_week && input_medium) ||
                (input_medium && input_strong) ||
                (input_week && input_strong))
        ) {
            text = "Your password is medium";
        }
        if (
            input.length >= min_strong_password &&
            input_week &&
            input_medium &&
            input_strong
        ) {
            text = "Your password is strong";
        }
    }
    return text;
}

console.log(
    get_time("lehqif;lekjf;qwekjqoweijfqoweijfqw[p9ruq[09r[09rpopifjpaoeof")
);

module.exports = {
    validPassword,
    hibp,
    get_time,
    get_hash_rate,
    get_possible_chars,
    special_char,
};
