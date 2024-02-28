export function countWords(str) {
    // Remove leading and trailing whitespaces
    if(str?.length>0){
    str = str.trim();
    
    // Split the string into an array of words using whitespace as delimiter
    let words = str.split(/\s+/);
    
    // Return the length of the array, which represents the number of words
    return words.length;
}else{
    return 0;
}
}

export function countOccurrences(str, word) {
    // Create a regular expression to match the word globally (i.e., all occurrences)
    if(str?.length>0){
        let regex = new RegExp('\\b' + word + '\\b', 'gi');
    
        // Use the match() function with the regular expression to find all occurrences
        let matches = str?.match(regex);
        
        // Return the number of matches
        return matches ? matches.length : 0;
    }else{
        return 0;
    }
   
}