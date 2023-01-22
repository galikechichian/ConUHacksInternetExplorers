const hibp = require("hibp");

const regExpWeak = /[a-z]/;
const regExpMedium = /\d+/;
const regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
const min_week_password = 4;
const min_medium_password = 8;
const min_strong_password = 15;

const SPECIAL = 20;
const ALPHA = 26;
const DIGITS = 10;
const CHARACTERS = "`~!@#$%^&*()-_=+[]{}/|':;'?.>,<";

function special_char(password) {
    for (let char of CHARACTERS) {
        if (password.includes(char)) {
            return true;
        }
    }
    return false;
}

function get_possible_chars(password) {
    if (password.toUpperCase() === password) {
        return ["ALPHA"];
    }
    if (password.toLowerCase() === password) {
        return ["alpha"];
    }
    if (password.match(/^[0-9]+$/)) {
        return ["digit"];
    }

    if (!special_char(password)) {
        return ["alpha, digit"];
    }

    const to_return = [];
    if (password.match(/[A-Z]/)) {
        to_return.push("ALPHA");
    }
    if (password.match(/[a-z]/)) {
        to_return.push("alpha");
    }
    if (password.match(/[0-9]/)) {
        to_return.push("digit");
    }
    if (special_char(password)) {
        to_return.push("special");
    }

    return to_return;
}

function get_time(password) {
    const possible_chars = get_possible_chars(password);
    let N = 0;
    for (let type of possible_chars) {
        if (type === "alpha") {
            N += ALPHA;
        } else if (type === "ALPHA") {
            N += ALPHA;
        } else if (type === "digit") {
            N += DIGITS;
        } else {
            N += SPECIAL;
        }
    }

    const s = password.length;
    const C = 1_000_000_000;

    return Math.pow(N, s) / C;
}

function get_formatted_time(time) {
    const time_dict = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    };

    if (time < 1) {
        // less than a second
        time_dict.milliseconds = Math.round(time * 1000, 2);
        return time_dict;
    }
    if (time < 60) {
        // less than a minute
        time_dict.seconds = Math.round(time, 2);
        return time_dict;
    }

    time = Math.floor(time);
    if (time < 3_600) {
        // less than an hour
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        time_dict.minutes = mins;
        time_dict.seconds = secs;
        return time_dict;
    }

    if (time < 86_400) {
        // less than a day
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        time_dict.hours = hrs;
        time_dict.minutes = mins;
        return time_dict;
    }

    if (time < 604_800) {
        // less than a week
        const days = Math.floor(time / 86_400);
        const hrs = Math.floor((time % 86_400) / 3600);
        time_dict.days = days;
        time_dict.hours = hrs;
        return time_dict;
    }

    if (time < 2_678_400) {
        // less than a month
        const weeks = Math.floor(time / (86400 * 7));
        const days = Math.floor((time % (86400 * 7)) / 86_400);
        time_dict.weeks = weeks;
        time_dict.days = days;
        return time_dict;
    }

    if (time < 86_400 * 365) {
        // less than a year
        const months = Math.floor(time / (86_400 * 31));
        const weeks = Math.floor((time % (86_400 * 31)) / (86_400 * 7));
        time_dict.months = months;
        time_dict.weeks = weeks;
        return time_dict;
    }
    const years = Math.floor(time / (86400 * 365));
    time_dict.years = years;
    return time_dict;
}

function str_info(password) {
    const time = get_time(password);
    const formatted_time = get_formatted_time(time);

    let time_str = "";
    if (formatted_time.years) {
        time_str += formatted_time.years + " years, ";
    }
    if (formatted_time.months) {
        time_str += formatted_time.months + " months, ";
    }
    if (formatted_time.weeks) {
        time_str += formatted_time.weeks + " weeks, ";
    }
    if (formatted_time.days) {
        time_str += formatted_time.days + " days, ";
    }
    if (formatted_time.hours) {
        time_str += formatted_time.hours + " hours, ";
    }
    if (formatted_time.minutes) {
        time_str += formatted_time.minutes + " minutes, ";
    }
    if (formatted_time.seconds) {
        time_str += formatted_time.seconds + " seconds, ";
    }
    if (formatted_time.milliseconds) {
        time_str += formatted_time.milliseconds + " milliseconds, ";
    }
    if (time_str.length > 0) {
        time_str = time_str.substring(0, time_str.length - 2);
    }
    return `It would take about ${time_str} to crack the password.`;
}

console.log(str_info("aaaaa"));

function getCompromised(password) {
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
    return text | "";
}

module.exports = {
    validPassword,
    getCompromised,
    str_info,
    get_possible_chars,
    special_char,
};
