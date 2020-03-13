// Notes to Reviewer:
// This is my 'quick'/small-sized response to the coding challenge.  I understand
// not all challenges require a big answer, so I jumped into this exercise with the
// quick and dirty and solves the most immediate problem, but not necessarily in the 'best' way.
//
// See `Solution1.js` for a more a small evolution over this solution (and eventually `Solution2.js`
// for the large, crazy solution that you didn't ask for =P).
//
// Thank you for reviewing, and I welcome your opinion and code review.

function addTouchPhoneNum() {    
    console.info(`Updating all phone numbers with the "tel:" protocol...`);
    
    let allPhoneNumbers = document.getElementsByClassName('invocaNumber');

    Array.from(allPhoneNumbers).forEach(phoneNumber => {
        phoneNumber.href = `tel:${phoneNumber.innerText}`;
    })
}

addTouchPhoneNum();


