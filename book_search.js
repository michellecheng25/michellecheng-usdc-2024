/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    if (typeof searchTerm != "string" || searchTerm == "") return result
    
    result.SearchTerm = searchTerm

    if(!Array.isArray(scannedTextObj) || scannedTextObj.length == 0) return result

    const searchRegex = new RegExp(`\\b${searchTerm}\\b`);

    for(const book of scannedTextObj){
        if(isValidBook(book)){
            for (const page of book.Content) {
                if (isValidContent(page) && page.Text.match(searchRegex)) {
                    searchResult = {
                        ISBN: book.ISBN,
                        Page: page.Page,
                        Line: page.Line,
                    };

                    result.Results.push(searchResult);
                }
            }
        }
    }

    return result; 
}

/**
 * Checks if bookObj has all the correct properties
 * @param {object} bookObj
 */
function isValidBook(book) {
    const validBook = 
    book.hasOwnProperty("ISBN") && typeof book.ISBN == "string" &&
    book.hasOwnProperty("Content") && typeof book.Content == "object" && book.Content !== null;

    return validBook
 }

 /**
 * Checks if pages have all the correct properties
 * @param {object} page
 */
 function isValidContent(page) {
    validContent =
    page.hasOwnProperty("Page") && typeof page.Page == "number" &&
    page.hasOwnProperty("Line") && typeof page.Line == "number" &&
    page.hasOwnProperty("Text") && typeof page.Text == "string";

    return validContent
 }

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const bestShortStoriesIn = [
    {
        "Title": "The Best Short Stories 2023",
        "ISBN": "978059347059",
        "Content": [
            {
                "Page": 72,
                "Line": 1,
                "Text": "You don't know, why, exactly, you\'ve been assigned to"

            },
            {
                "Page": 72,
                "Line": 2,
                "Text": "this particular family, in this particular home, in West Sacra-"

            },
            {
                "Page": 74,
                "Line": 12,
                "Text": "Lily, the youngest sneaks into the Kitchen."

            },
        ]
    }
]

const multipleBooksIn = twentyLeaguesIn.concat(bestShortStoriesIn)


const emtpyScannedObjectIn = []
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const emptyResultOut = {
    "SearchTerm": "",
    "Results": []
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


//If search term is not String, return 0 matches
const test3result = findSearchTermInBooks(100, twentyLeaguesIn); 
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//If search term is empty, return 0 matches
const test4result = findSearchTermInBooks("", twentyLeaguesIn); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test4result.Results.length);
}

//if search term is not in any books, return 0 matches
const test5result = findSearchTermInBooks("Elephants", multipleBooksIn); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test5result.Results.length);
}


//if scannedTextObj is not an array, return 0 matches
const test6result = findSearchTermInBooks("the", undefined); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test6result.Results.length);
}


//if scannedTextObj contains no books, return 0 matches
const test7result = findSearchTermInBooks("the", emtpyScannedObjectIn); 
if (test7result.Results.length == 0) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test7result.Results.length);
}

//if book is missing ISBN, return 0 matches for that book
const twentyLeaguesInCopy = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        //no ISBN
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            }
        ] 
    }
]

const test8result = findSearchTermInBooks("now", twentyLeaguesInCopy); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test8result.Results.length);
}


//if book is missing content, return 0 matches for that book
const twentyLeaguesInCopy2 = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        //no Content
    }
]


const test9result = findSearchTermInBooks("now", twentyLeaguesInCopy2); 
if (test9result.Results.length == 0) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test9result.Results.length);
}


//if book page is missing necessary page properties, return 0 matches for that page
const twentyLeaguesInCopy3 = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "Content": [
            {
                "Line": 8,
                //no page
                "Text": "now simply went on by her own momentum.  The dark-"
            }
        ] 
    }
]


const test10result = findSearchTermInBooks("now", twentyLeaguesInCopy3); 
if (test10result.Results.length == 0) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test10result.Results.length);
}


//if scannedObject has multiple books and words from multiple books matches searchTerm, return known output
const expectedOutput11 = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "978059347059",
            "Page": 74,
            "Line": 12

        }
    ]
}


const test11result = findSearchTermInBooks("the", multipleBooksIn); 
if (JSON.stringify(test11result.Results) == JSON.stringify(expectedOutput11.Results)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test11");
    console.log("Expected:", expectedOutput11.Results);
    console.log("Received:", test11result.Results);
}


//if scannedObject has multiple books and one book is missing necessary properties (ISBN), return known output
const multipleBooksInCopy = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
        ] 
    },
    {
        "Title": "The Best Short Stories 2023",
        //no ISBN
        "Content": [
            {
                "Page": 74,
                "Line": 12,
                "Text": "Lily, the youngest sneaks into the Kitchen."

            },
        ]
    }
]


const test12result = findSearchTermInBooks("the", multipleBooksInCopy); 
if (JSON.stringify(test12result.Results) == JSON.stringify(twentyLeaguesOut.Results)) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test12");
    console.log("Expected:", twentyLeaguesOut.Results);
    console.log("Received:", test12result.Results);
}


//case sensitive tests
const expectedOutput13 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const test13result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(test13result.Results) == JSON.stringify(expectedOutput13.Results)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test13");
    console.log("Expected:", expectedOutput13.Results);
    console.log("Received:", test13result.Results);
}


//search term is not a substring
const test14result = findSearchTermInBooks("mom", twentyLeaguesIn); 
if (test14result.Results.length == 0) {
    console.log("PASS: Test 14");
} else {
    console.log("FAIL: Test 14");
    console.log("Expected:", emptyResultOut.Results.length);
    console.log("Received:", test14result.Results.length);
}


//special characters test
const expectedOutput15 = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const test15result = findSearchTermInBooks("Canadian's", twentyLeaguesIn); 
if (JSON.stringify(test15result.Results) == JSON.stringify(expectedOutput15.Results)) {
    console.log("PASS: Test 15");
} else {
    console.log("FAIL: Test15");
    console.log("Expected:", expectedOutput15.Results);
    console.log("Received:", test15result.Results);
}


