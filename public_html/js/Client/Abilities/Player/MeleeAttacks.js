
//Kick damage uses stats: Str, Dex
function Kick(abilityID, engagedMobID, exposureLevel){
    
    var attackerSkill = Character.Kick;

    var hitSuccess = getHitSuccess(1, exposureLevel, attackerSkill, Character.Dex, Character.Wis, Character.Cha, engagedMobList[engagedMobID].mobAgi, engagedMobList[engagedMobID].mobWis);
    
    if(hitSuccess == 0){
        handleChatSumbit(1, 'You miss!');
        return 0;
    }
    
    var hitSuccessMultiplier = hitSuccess/100;

    var damage = getDamage(1, characterActions[abilityID].baseDmg, 11, Character.Str, Character.Dex, Character.Agi, Character.Int, engagedMobList[engagedMobID].mobAC, 0);
    
    
    damage = Math.round(damage*hitSuccessMultiplier);
    
    //This is considered critical damage (need to display it somehow..
    if(hitSuccess > 90){
        damage=damage*2;
        handleChatSumbit(1, 'You '+characterActions[abilityID].abilityName+' '+engagedMobList[engagedMobID].mobName+' to '+playerActionDirectionNames[playerActionDirection]+' for '+damage+' CRITICAL damage!');
    }else{
       handleChatSumbit(1, 'You '+characterActions[abilityID].abilityName+' '+engagedMobList[engagedMobID].mobName+' to '+playerActionDirectionNames[playerActionDirection]+' for '+damage+' damage!');
    }
    
   
    return damage;
 
}



//Attack damage uses stats: Str, Dex
function WeaponAttack(abilityID, engagedMobID, exposureLevel){
    
    //Seeting to slashing for testing.  In the future need to replace it with CharacterEquipment.PrimaryWeapon
    var attackerSkill = 5;

    var hitSuccess = getHitSuccess(1, exposureLevel, attackerSkill, Character.Dex, Character.Wis, Character.Cha, engagedMobList[engagedMobID].mobAgi, engagedMobList[engagedMobID].mobWis)
    
    if(hitSuccess == 0){
        handleChatSumbit(1, 'You miss!');
        return 0;
    }

    var hitSuccessMultiplier = hitSuccess/100;

    var damage = getDamage(1, characterActions[abilityID].baseDmg, 2, Character.Str, Character.Dex, Character.Agi, Character.Int, engagedMobList[engagedMobID].mobAC, 0)
    damage = Math.round(damage*hitSuccessMultiplier);
    
    //This is considered critical damage (need to display it somehow..
    if(hitSuccess > 90){
        damage=damage*2;
        handleChatSumbit(1, 'You '+characterActions[abilityID].abilityName+' '+engagedMobList[engagedMobID].mobName+' to '+playerActionDirectionNames[playerActionDirection]+' for '+damage+' CRITICAL damage!');
    }else{
       handleChatSumbit(1, 'You '+characterActions[abilityID].abilityName+' '+engagedMobList[engagedMobID].mobName+' to '+playerActionDirectionNames[playerActionDirection]+' for '+damage+' damage!');
    }
    
   
    return damage;
 
}








