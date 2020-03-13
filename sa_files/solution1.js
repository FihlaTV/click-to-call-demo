// Notes to Reviewer:
// This is my 'medium' sized solution (out of the three I am submitting for first code challenge).
// In this example, I am start to flesh out a quick, maintainable, and easily extensible solution.
// Albeit, this is still very light in detail, I think it takes into considerations FUTURE use 
// and repurposeability.  
//
// See `Solution2.js` for a more ... verbose example of my approach to this challenge.

// DEFAULTS
const PROTOCOL = 'tel:';
const PHONENUMBER_CLASS = 'invocaNumber';

function addTouchPhoneNum(protocol=PROTOCOL, className=PHONENUMBER_CLASS) {    
    // Get all elements with a className of invocaNumber.
    let allPhoneNumbers = document.getElementsByClassName(className);

    // ForEach element, prefix with 'tel:' protocol; using constants
    // for easy updating to protocol and/or class changes.
    Array.from(allPhoneNumbers).forEach(phoneNumber => {
        phoneNumber.href = `${protocol}:${phoneNumber.innerText}`;
    })
}

// Wrapped in a main to extend with additional functionality as needed.
function main() {
    addTouchPhoneNum();
}


// Run the main
main();


