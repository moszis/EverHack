

 /***************TO DO************************
 * -1- Check most exposed area on player
 * -2- Use mobs "perception" (int+wis+attackSkill) to check probability of successful selection of best exposed area
 * -?- Consider attack type/weapon type and target armor??? --- To consider
 ********************************************/
function getNextMobExecutionDirection(engagedMobID){
    //Temprorarily will return random direction
    return getRandomInt(0, 7);
}

function setNextMobExecutionDirection(engagedMobID){
    engagedMobList[engagedMobID].executionDirection = getNextMobExecutionDirection(engagedMobID);
}


 /***************TO DO************************
 * -1- Modify to get exposed areas from existing array (probably attached to engaged mob object.
 ********************************************/
function getMobExposedAreas(engagedMobID){
    
    return engagedMobList[engagedMobID].exposedAreas;
    
}

function updateMobExposedAreas(engagedMobID){
    
    if(setMobExposedAreas(engagedMobID)){
            renderMobExposedAreas(engagedMobID);
    }
    
}

 /***************TO DO************************
 * -1- Define rules and use attack direction to identify exposed areas 
 * -?- Consider attack type/weapon type??? --- To consider
 * -?- Consider players Perception??? --- To consider
 ********************************************/
function setMobExposedAreas(engagedMobID){

    clearMobExposedAreas(engagedMobID);
    
    if(engagedMobList[engagedMobID].executionInProgress){
       var executionDirection = engagedMobList[engagedMobID].executionDirection;
       var exposedAreas = new Array();
       ///THIS IS JUST FOR TESTING PURPOSES
       exposedAreas[0] = getRandomInt(0, 7);
       exposedAreas[1] = getRandomInt(0, 7);
       //***********************************

       engagedMobList[engagedMobID].exposedAreas = exposedAreas;
       
    }else if(engagedMobList[engagedMobID].stunned == true){
       exposeAllMobAreas(engagedMobID)
    }
    
    return true;
}


function clearMobExposedAreas(engagedMobID){
    
    engagedMobList[engagedMobID].exposedAreas = null;
    
}


function exposeAllMobAreas(engagedMobID){
    
    var exposedAreas = new Array();
    
    for(var x=0; x<8; x++){
        exposedAreas[x] = x;
    }
    
    engagedMobList[engagedMobID].exposedAreas = exposedAreas;
}