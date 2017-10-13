var abilityinterrupted  = false;
var executionInProgress = false;

                   
function initiateAbility(abilityID){
    
    ///****TO DO******
    // If no mobs in combat stop execution!
    
    if(!isMobTargeted && requiresTarget(abilityID)){
        if(!targetNextMob()){return};
    }   
    
    if(!executionInProgress){
      executionInProgress = true;
      renderExecutionBar(characterActions[abilityID].executionTime, abilityID);
    }else{
       handleChatSumbit(1, 'You already executing an ability');
    }
}


function executeAbility(abilityID){
    
    

    //check and apply effects (stun, etc..)
    //check skill gains
    
    
    var damage = 0;
    var mobExposedAreas = getMobExposedAreas(mobIDTargeted);
    var exposureLevel = 0;

        for(var x =0; x<mobExposedAreas.length; x++){
            
           // alert("Exposed area: "+mobExposedAreas[x]);
            if(mobExposedAreas[x] == playerActionDirection){
                alert("exposure level 1!!");
                exposureLevel = 1;
            }
        }
        
   
    

    switch (abilityID) {
        case 1:
            
            damage = Kick(abilityID, mobIDTargeted, exposureLevel);
            break;
        case 3:
            ///Block

            Block(abilityID, mobIDTargeted);
            break;
        case 4:             
            damage = WeaponAttack(abilityID, mobIDTargeted, exposureLevel);
            break;
        default:
            //Statements executed when none of the values match the value of the expression
            break;
    }
    
    
    if(damage > 0){ 

      applyDamageToMob(mobIDTargeted, damage);      
      ///var hpPercent = getMobHPPercentage(mobIDTargeted);
     
      if(engagedMobList[mobIDTargeted].activeHP > 0){
          
          if(characterActions[abilityID].stunTime > 0){
             
             stunMob(mobIDTargeted, characterActions[abilityID].stunTime);
          }
          alert("mob Stunned!@!"); 
          if(characterActions[abilityID].knockBack == 1){
             pushMobBack(mobIDTargeted); 
          }
          alert("mob pushed??!@!"); 
          playMobGettingHitSound(mobIDTargeted);
      }
    }
    
    alert("executionInProgress reset");
    
    executionInProgress = false;
}

