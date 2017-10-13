

function fadeOutEffect(effect, currentAlpha, alphaChunk, timeChunk, minAlpha){
    
    currentAlpha = currentAlpha - alphaChunk;
    effect.alpha = currentAlpha;
    
    if(currentAlpha <= 0){
        stage.removeChild(shieldEffect);
    }else{
       setTimeout(function() {fadeOutEffect(effect, currentAlpha, alphaChunk, timeChunk);},timeChunk); 
    }
    
}


function fadeInEffect(effect, currentAlpha,  alphaChunk, timeChunk, maxAlpha){
    
    currentAlpha = currentAlpha + alphaChunk;
    effect.alpha = currentAlpha;
    
    if(currentAlpha < maxAlpha){
       setTimeout(function() {fadeInEffect(effect, currentAlpha, alphaChunk, timeChunk, maxAlpha);},timeChunk); 
    }else{
        effect.alpha = maxAlpha;
    }
    
}


function fadeInAndOutEffect(effect, currentAlpha, fadeInAlphaChunk, fadeOutAlphaChunk, fadeInTimeChunk, fadeOutTimeChunk, maxAlpha, minAlpha){
    
    var fadeInTime = (maxAlpha-currentAlpha)/fadeInAlphaChunk*fadeInTimeChunk;

    fadeInEffect(effect, currentAlpha, fadeInAlphaChunk, fadeInTimeChunk, maxAlpha);
    
    setTimeout(function() {fadeOutEffect(effect, maxAlpha, fadeOutAlphaChunk, fadeOutTimeChunk, minAlpha);},fadeInTime);
}