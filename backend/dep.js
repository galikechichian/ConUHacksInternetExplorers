//HAVE I BEEN PWND????????
// function hibp(password)
// {
//     let hibp = require('hibp');
//     console.log("This is the number of times the password has been leaked: ")
//     hibp.pwnedPassword(password).then(numPwns => console.log(numPwns))
// }

// hibp("Selim")


//Check password length function
function checkPasswordLength(password)
{
    return Number(password.length >= 15);
}

//




// Function to check the strength of a password
function checkPasswordStrength(password) {
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasSpecialChars = /[!@#\$%\^\&*\)\(+=._-]/.test(password);
    var score = 0;
    var feedback = "";
    
    // check for minimum length
    if (password.length < 8) {
        feedback = "Password is too short";
        return {score: score, feedback: feedback};
    }
    // check for minimum number of required character types
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
        feedback = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
        return {score: score, feedback: feedback};
    }
    // check for common passwords

    // if (commonPasswords.indexOf(password) !== -1) {
    //     feedback = "Password is too common";
    //     return {score: score, feedback: feedback};
    // }

    // check for password length (DONE)
    score += password.length * 4;
    score += (checkPasswordLength(password));
    // check for character types
    score += (hasUpperCase ? 2 : 0);
    score += (hasLowerCase ? 2 : 0);
    score += (hasNumbers ? 4 : 0);
    score += (hasSpecialChars ? 6 : 0);
    // check for numbers only or letters only
    if (password.match(/^[0-9]+$/) || password.match(/^[a-zA-Z]+$/)) {
        score -= password.length;
        feedback = "Password should not contain only numbers or letters";
    }
    // check for repeating characters
    var repeat = new RegExp("(.)\\1{2,}", "g");
    if (password.match(repeat)) {
        score -= password.length;
        feedback = "Password should not contain repeating characters";
    }
    // check for sequential characters
    var sequential = new RegExp("abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz", "gi");
    if (password.match(sequential)) {
        score -= password.length;
        feedback = "Password should not contain sequential characters";
    }
    // assign a score
    if (score < 20) {
        feedback = "Weak";
    } else if (score < 40) {
        feedback = "Moderate";
    } else {
        feedback = "Strong";
    }
    return {score: score, feedback: feedback};
}

console.log(checkPasswordStrength("asdf(*^93S"))