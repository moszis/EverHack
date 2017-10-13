
function runEngagedMob(engagedMobID){
    
    mobRun(engagedMobID);
}


function mobRun(engagedMobID){
    
    if(engagedMobList[engagedMobID].isAlive){
        
        if(engagedMobList[engagedMobID].executionInProgress == false && engagedMobList[engagedMobID].stunned == false){
            var abilityID = getNextMobAction(engagedMobID);
            engagedMobList[engagedMobID].executionInProgress = true;
            setNextMobExecutionDirection(engagedMobID);
            renderMobExecutionBar(engagedMobID, Abilities[abilityID].executionTime, abilityID);           
        }
        
        if(setMobExposedAreas(engagedMobID)){
            renderMobExposedAreas(engagedMobID);
        }
        
        setTimeout(function() {mobRun(engagedMobID);},5000);
        
    }
    
}


function mobAttack(engagedMobID, abilityID, attackDirection){
    
    if(engagedMobList[engagedMobID].isAlive){

        var damage = 0;
        
        switch (abilityID) {
            case 1:
                //damage = Kick(abilityID, mobIDTargeted);
                break;
            case 4:             
                damage = mobPrimaryAttack(engagedMobID, abilityID, engagedMobList[engagedMobID].executionDirection);               
                break;
            default:
                //Statements executed when none of the values match the value of the expression
                break;
        }
        
        if(damage > 0){
           applyDamageToCharacter(damage);
        }
        
        hideAllMobOpeningIndicators(engagedMobID);
        pullMobForward(engagedMobID);
        playMobMeleeAttackingSound(engagedMobID);
    }    
}


