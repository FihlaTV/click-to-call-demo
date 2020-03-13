// Notes to Reviewer:
// I blew this ask WAY above and beyond what I thought was asked of the original solution
// because I wanted to give a view of different patterns, best practices, coding styles, 
// and something more substantial for you to code review.  Is this typical or do I think this is best?  
// No. I just felt bad for my `Solution0.js` having so little to evaluate, and I had fun playing around 
// thinking of ways to raise an eyebrow!  Hope you enjoy and I welcome feedback.
//
// If I countinued down this path of 'over architecture', I would have ...
// - broken the logging into a separate module/import,
// - provided unit test coverage,
// - wrote a better 'poor-man' decorator/wrapper,
// - and wrote various doc strings and generated HTML doc.
// - possibly obfuscated/minified the code.


// DEFAULTS
const PROTOCOL = 'tel:';
const PHONENUMBER_CLASS = 'invocaNumber';
const LOG_LEVELS = {
    'none': 0,
    'log': 1,
    'info': 2,
    'warn': 3,
    'error': 4
}
const MAX_LOG_LEVEL = LOG_LEVELS.none;

function log(level=LOG_LEVELS.log, message="", args={}) {
    if (level <= MAX_LOG_LEVEL) {
        let _levelStr = "log"; // defensive programming -- default!

        switch (level) {
            case 1:
                _levelStr = 'log';
                break;
            case 2:
                _levelStr = 'info';
                break;
            case 3:
                _levelStr = 'warn';
                break;
            case 4:
                _levelStr = 'error';
                break;
        }
        if (args.toString().length === 0) {args = ""};
        console[_levelStr](message, args);
    }
}


function log_event(data){
    log(LOG_LEVELS.info, "...This is where I would send any 'eventing' to indicate if a number has been pressed on screen...");
    log(LOG_LEVELS.log, Date(), [data, navigator]);
}


function add_touchPhoneNum(args={}) {
    // Destruction pattern, to get 'named' arguments from fn call.   
    let {protocol=PROTOCOL, className=PHONENUMBER_CLASS} = args;

    log(LOG_LEVELS.info, `Updating all elements with className{${className}} with the prefix protocol{${protocol}}`);
    
    // Get all elements with a className of invocaNumber.
    let allPhoneNumbers = document.getElementsByClassName(className);

    // Init'ing var's for later summarization.
    let [_updated, _ignored, _errored] = [0, 0, 0];

    // Admittedly taken/repurposed from: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    let phoneRegEx = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/); 
  
    try {
        // ForEach element, prefix with 'tel:' protocol, using constant notation
        // for easy updating or protocol changes.
        Array.from(allPhoneNumbers).forEach(phoneNumber => {
            if (!phoneRegEx.test(phoneNumber.innerText)) {
                ++_ignored;
            }
            else {
                phoneNumber.href = `${protocol}${phoneNumber.innerText}`;
                phoneNumber.addEventListener('click', data => log_event(data));
                ++_updated;
            }
        });
        
    }
    catch(err) {
        log(LOG_LEVELS.error, "**Nom Nom Nom** I swallowed an error...", err);
        ++_errored;
    }
    finally {
        log(LOG_LEVELS.info, 
            `Updated: \n\tSuccessful = ${_updated} \n\tIgnored = ${_ignored} \n\tErrored = ${_errored} \n\tTOTAL FOUND = ${_updated+_ignored+_errored}`);
    }
}



// Poor-mans decorator/wrapper
function measure_performance(callBack) {
    let _performanceStart = performance.now();
    
    // NOTES to reviewer:
    // First position argument expected is an object, which allows overriding
    // of defaults for `protocol` and `PHONENUMBER_CLASS`, in this way an external
    // invoker can continue to extend/use this utility fn() outside of this single case.
    callBack(); // ex. callBack({protocol="ftp:"}); 
    
    let _performanceStop = performance.now();
    log(LOG_LEVELS.info, `This function took: ${(_performanceStop-_performanceStart).toFixed(2)}ms`);
}

function main() {
    measure_performance(add_touchPhoneNum);
}


main();


