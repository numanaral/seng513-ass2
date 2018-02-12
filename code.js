//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    return {
        nChars: count_nChars(txt),
        nWords: count_nWords(txt),
        nLines: count_nLines(txt),
        nNonEmptyLines: count_nNonEmptyLines(txt),
        maxLineLength: count_maxLineLength(txt),
        averageWordLength: count_averageWordLength(txt),
        palindromes: list_palindromes(txt),
        longestWords: list_longestWords(txt),
        mostFrequentWords: list_mostFrequentWords(txt)
    };

                        // ================ //
    // =============== //  MAIN FUNCTIONS  // =============== //
                      // ================ //

    // ====================================================== //
    // nChars
    function count_nChars(txt){
        return txt.length;
    }
    // ====================================================== //
    // nWords
    function count_nWords(txt){
        return listOfWords(txt).length;
    }
    // ====================================================== //
    // nLines
    function count_nLines(txt){
        return nLines(txt).length;
    }
    // ====================================================== //
    // nNonEmptyLines
        // replace the nonalpha chars with empty
        // then check if there is any char in that line
            // Y ? -> not an empty line
    function count_nNonEmptyLines(txt) {
        nonEmptyLines = 0;
        lines = nLines(txt);
        for (i = 0; i < lines.length; i++){
            if(lines[i].replace(/[^a-zA-Z0-9]/gi, '') != ''){
                nonEmptyLines++;
            }
        }
        return nonEmptyLines;
    }
    // ====================================================== //
    // maxLineLength
        // compare line lengths until the max
    function count_maxLineLength(txt) {
        lines = nLines(txt);
        longestLine = 0;
        for (i = 0; i < lines.length; i++) {
            if (lines[i].length > longestLine) {
                longestLine = lines[i].length;
            }
        }
        return longestLine;
    }
    // ===================================================== //
    // averageWordLength
        // replace the nonalpha chars with empty, then count + div
    function count_averageWordLength(txt){
        noSpaceTXT = txt.replace(/[^a-zA-Z0-9]/gi, '').length
        return noSpaceTXT / count_nWords(txt);
    }
    // ===================================================== //
    // palindromes
        // get the list of words and check the cases
        // to see if it's a palindrome or not
    function list_palindromes(txt){
        wordList = listOfWords(txt);
        returnList = [];

        for(i = 0; i < wordList.length; i++){
            if(checkPalindrome(wordList[i])
                && (wordList[i] != '')
                && (wordList[i].length > 2)){
                returnList.push(wordList[i]);
            }
        }
        return returnList;
    }
    // ===================================================== //
    // longestWords
        // sort the list by word length
        // remove the duplicates
        // take the first 10 elements
    function list_longestWords(txt){
        if(txt.length == 0){
            return [];
        } else {

            wordList = listOfWords(txt);

            // sort by word length
            wordList.sort(function (a, b) {
                return b.length - a.length;
            });

            // remove duplicates
            wordList = wordList.filter(function(curt, next) {
                return wordList.indexOf(curt) == next;
            })

            // take first 10
            return wordList.slice(0, 10);
        }
    }
    // ===================================================== //
    // mostFrequentWords
        // Not the prettiest approach but easy to read //
        // 1st array : word list
        // 2nd array : freq of the words appearing
        // ---
        // checks if the current word is the same as the
        // previous, if yes, ++ the frequency in the 2nd
        // array, if not move on and add freq of 1
    function list_mostFrequentWords(txt) {
        if (txt.length == 0) {
            return [];
        } else {

            // sort the word list
            wordList = listOfWords(txt).sort();

            // empty lists
            words = [], freq = [], prevWord = '';

            // compare the words in the word list
            for (i = 0; i < wordList.length; i++) {
                if (wordList[i] != prevWord) {
                    words.push(wordList[i]);
                    freq.push(1);
                } else {
                    freq[freq.length - 1]++;
                }
                prevWord = wordList[i];
            }

            // add the freq in "()" next to the word
            for (i = 0; i < words.length; i++) {
                words[i] = words[i] + "(" + freq[i] + ")";
            }

            // compare by the freq char
            words.sort(function (a, b) {
                return parseInt(b[b.length - 2])
                    -  parseInt(a[a.length - 2]);
            });

            // take first 10
            return words.slice(0, 10);
        }
    }
    // ====================================================== //




                        // ================ //
    // =============== //  XTRA FUNCTIONS  // =============== //
                      // ================ //

    // ====================================================== //

    // creates an array of words from the given txt
    // ---
    // functions can definitely be combined, but this approach
    // provides easier readability so I separated them into
    // meaningful parts
    function listOfWords(txt){
        // if empty string, return an empty list
        if(txt.length == 0){
            return [];
        }

        // var to check the spaces in the beg and end
        edgeSpace = 0;

        // replace all non alphanumeric characters with ' '
        alphaOnlyText = txt.replace(/[^a-zA-Z0-9]/gi, ' ');

        // replace multiple spaces with only 1
        singleSpaceText = alphaOnlyText.replace(/\s\s+/g, ' ');

        // convert the whole string into lower case
        singleLowerCase = singleSpaceText.toLowerCase();

        // create an array by splitting the string into words
        wordList = singleLowerCase.split(' ');

        // remove empty strings
        wordList = wordList.filter(function(i) {
            return i != '';
        });

        // return the list of words
        return wordList;
    }

    // ====================================================== //

    // separates the lines into an array to be used
    // in the functions regarding the line counts
    // (split by the new line)
    function nLines(txt){
        return txt.split(/\n/g);
    }

    // ====================================================== //

    // checks if the word reversed and joined is still
    // the same to confirm if it's a palindrome or not
    function checkPalindrome(txt) {
        return txt == txt.split('').reverse().join('');

    }

}

