var Abilities        = new Array();
var characterActions = new Array();


function convertJSONtoAbilitiesObject(abilitiesJSON){

    var abilities = $.parseJSON(abilitiesJSON);
    var i = 0;
    for(var i = 0; i<abilities.length; i++){
        ability= {
            id            : abilities[i].abilityID,
            abilityID     : abilities[i].abilityID,
            abilityName   : abilities[i].abilityName,
            abilityIcon   : abilities[i].abilityIcon,
            baseDmg       : abilities[i].baseDamage,
            executionTime : abilities[i].executionTime,
            stunTime      : abilities[i].stunTime,
            actionCatID   : abilities[i].actionCatID,
            actionCatName : abilities[i].actionCatName,
            damageCatID   : abilities[i].damageCatID,
            damageCatName : abilities[i].damageCatName,
            baseSkillID   : abilities[i].baseSkillID,
            baseSkillName : abilities[i].baseSkillName,
            knockBack     : abilities[i].knockBack,
        };   

        Abilities[abilities[i].abilityID] = ability;
    }

    allAbilitiesLoaded = true;
}



function convertJSONtoPlayerCharacterActionsObject(charAbilitiesJSON){

    var characterAbilities = $.parseJSON(charAbilitiesJSON);
    var i = 0;
    for(var i = 0; i<characterAbilities.length; i++){
        ability= {
            id            : characterAbilities[i].abilityID,
            charID        : characterAbilities[i].charID,
            actionSlotID  : characterAbilities[i].actionSlotID,
            abilityID     : characterAbilities[i].abilityID,
            abilityName   : characterAbilities[i].abilityName,
            abilityIcon   : characterAbilities[i].abilityIcon,
            baseDmg       : characterAbilities[i].baseDamage,
            executionTime : characterAbilities[i].executionTime,
            stunTime      : characterAbilities[i].stunTime,
            actionCatID   : characterAbilities[i].actionCatID,
            actionCatName : characterAbilities[i].actionCatName,
            damageCatID   : characterAbilities[i].damageCatID,
            damageCatName : characterAbilities[i].damageCatName,
            baseSkillID   : characterAbilities[i].baseSkillID,
            baseSkillName : characterAbilities[i].baseSkillName,
            knockBack     : characterAbilities[i].knockBack,
        };   

        characterActions[characterAbilities[i].abilityID] = ability;
    }
    
    characterAbilitiesLoaded = true;
}



//This functions checks wether ability requires target or not
function requiresTarget(abilityID){
    if(characterActions[abilityID].actionCatID < 4 || characterActions[abilityID].actionCatID == 7){
        return true;
    }
    return false;
}





