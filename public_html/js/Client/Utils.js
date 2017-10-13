/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {type} val1
 * @param {type} val2
 * @returns percentage val1 is of val2
 */
function getPercentage(val1, val2){
    
    if(val2 <=0){val2 = 1;}
    
    var percentage = val1/val2*100;
    
    if(percentage < 0){
        percentage = 0;
    }
    return percentage;
    
}


