

//Block does not require a target.  
//Executing a block of specific body area will have a chance to negate all attacks in progress to that area.
/***************TO DO************************
 * -1- Calculate probability of successful block.  Use block skill vs mob attack skill.
 * -2- Use shield type/size to identify all blocking directions. (ex tower shield will block multiple areas around selected area).
 * -3- Make block soundeffect request dynamic and shield specific.
 * -4- Make mob visual effect request dynamic.
 ********************************************/

function Block(abilityID, engagedMobID){
    
    var x = 0;
    
    for(x=0; x< engagedMobList.length; x++){
        if(engagedMobList[x].executionInProgress == true){
            var blockSuccess = true;
            var correctDirection = false;
           
            if(engagedMobList[x].executionDirection == playerActionDirection){
                correctDirection = true;
            }

            if(blockSuccess && correctDirection){
                interruptMob(x);
                handleChatSumbit(1, 'You '+characterActions[abilityID].abilityName+' an attack of '+engagedMobList[x].mobName+' to '+playerActionDirectionNames[playerActionDirection]+'!');
                renderShieldBlockEffect()
                blockSound1.play();///move this out to soundeffects file and change this to method call
                pullMobForward(x);///change this to "mob attack effect" method call.
            }
        }
    }
}





