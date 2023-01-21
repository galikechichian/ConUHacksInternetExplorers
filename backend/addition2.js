const PASSWD = "Enter password: ";
const SPECIAL = 20;
const ALPHA = 26;
const DIGITS = 10;
const CHARACTERS = "`~!@#$%^&*()-_=+[]{}\/|':;'?.>,<";

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
  return 1000000000;
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
  return (C / (N * s)) / 1000;
}
