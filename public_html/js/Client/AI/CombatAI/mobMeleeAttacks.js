

//Need to first implement mob Abilities
//Need to pass body part where attack hit or would hit
function mobPrimaryAttack(engagedMobID, abilityID, bodyLocationID){

     //**************This is temporary for testing purposes***********
     var locationAC = 1;//use bodyLocationID to get real ac in the future
     var exposureLevel = 0;
     //*****************************************
     
    var attackerSkill = engagedMobList[engagedMobID].mobMeleeSkill;

    var hitSuccess = getHitSuccess(1, exposureLevel, attackerSkill, engagedMobList[engagedMobID].mobDex, engagedMobList[engagedMobID].mobWis, engagedMobList[engagedMobID].mobCha, Character.Agi, Character.Wis);

    if(hitSuccess == 0){
        handleChatSumbit(1, 'Mob misses you!');
        return 0;
    }
    
    var hitSuccessMultiplier = hitSuccess/100;

    var damage = getDamage(1, engagedMobList[engagedMobID].mobWeaponDamage, 2, engagedMobList[engagedMobID].mobStr, engagedMobList[engagedMobID].mobDex, engagedMobList[engagedMobID].mobAgi, engagedMobList[engagedMobID].mobInt, locationAC, 0)
    damage = Math.round(damage*hitSuccessMultiplier);
    
    //This is considered critical damage (need to display it somehow..
    if(hitSuccess > 90){
        damage=damage*2;
        handleChatSumbit(1, engagedMobList[engagedMobID].mobName+' '+Abilities[abilityID].abilityName+' YOU to '+playerActionDirectionNames[bodyLocationID]+' for '+damage+' CRITICAL damage!');
    }else{
       handleChatSumbit(1, engagedMobList[engagedMobID].mobName+' '+Abilities[abilityID].abilityName+' YOU to '+playerActionDirectionNames[bodyLocationID]+' for '+damage+' damage!');
    }
    
   
    return damage;
    
    
}


