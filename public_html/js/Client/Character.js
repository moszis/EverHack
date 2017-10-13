var Character     = [];



function initCharacter(charID){
    
    ///getCharacter(charID);
    
}

/*
function getCharacterDetails(){};

function getCharacterAbilities(){};

function getCharacterInventory(){};

function getCharacterEquipment(){};
*/


function convertJSONtoPlayerCharacterBaseObject(characterJSON){

    var character = $.parseJSON(characterJSON);
    var i = 0;
    
        char = {
            id        : character[i].charID,
            name      : character[i].charName,
            classID   : character[i].charClassID,
            className : character[i].charClass,
            raceID    : character[i].charRace,
            raceName  : character[i].charClass,
            level     : character[i].charLevel,
            EXP       : character[i].charEXP,
            baseHP    : character[i].charBaseHP,
            baseMana  : character[i].charBaseMana,
            baseEnd   : character[i].charBaseEnd,
            baseStr   : character[i].charBaseStr,
            baseSta   : character[i].charBaseSta,
            baseDex   : character[i].charBaseDex,
            baseAgi   : character[i].charBaseAgi,
            baseInt   : character[i].charBaseInt,
            baseWis   : character[i].charBaseWis,
            baseCha   : character[i].charBaseCha,
            base1hSlash  : character[i].OneHSlashing,
            base2hSlash  : character[i].TwoHSlashing,
            base1hBlunt  : character[i].OneHBlunt,
            base2hBlunt  : character[i].TwoHBlunt,
            base1hPierce : character[i].OneHPiercing,
            base2hPierce : character[i].TwoHPiercing,
            baseDualWield : character[i].DualWield,
            baseKick      : character[i].Kick,
            baseBlock     : character[i].Block,
            baseDodge     : character[i].Dodge,
            baseRiposte   : character[i].Riposte,
            baseParry     : character[i].Parry,
            baseBash      : character[i].Bash,
            baseSlam      : character[i].Slam,     
            HP    : character[i].charBaseHP,
            Mana  : character[i].charBaseMana,
            End   : character[i].charBaseEnd,
            AC    : 0,
            Str   : character[i].charBaseStr,
            Sta   : character[i].charBaseSta,
            Dex   : character[i].charBaseDex,
            Agi   : character[i].charBaseAgi,
            Int   : character[i].charBaseInt,
            Wis   : character[i].charBaseWis,
            Cha   : character[i].charBaseCha,
            OneHSlash  : character[i].OneHSlashing,
            TwoHSlash  : character[i].TwoHSlashing,
            OneHBlunt  : character[i].OneHBlunt,
            TwoHBlunt  : character[i].TwoHBlunt,
            OneHPierce : character[i].OneHPiercing,
            TwoHPierce : character[i].TwoHPiercing,
            DualWield : character[i].DualWield,
            Kick      : character[i].Kick,
            Block     : character[i].Block,
            Dodge     : character[i].Dodge,
            Riposte   : character[i].Riposte,
            Parry     : character[i].Parry,
            Bash      : character[i].Bash,
            Slam      : character[i].Slam
            
        };   

        Character = char;
        
        characterLoaded = true;
}


function applyItemStats(){
    ///Loop through equipped items and add stats on items to Character stats
}

function getCurrentCharacterHP(){
    return Character.HP;
}

function getCharacterMaxHP(){
    return Character.baseHP;
}

function getCharacterHPPercentage(){
    return getPercentage(Character.HP, Character.baseHP);
}

function getCurrentCharacterMana(){
    return Character.baseMana;
}

function getCharacterMaxMana(){
    return Character.baseMana;
}

function getCharacterManaPercentage(){
    return 100;
}

function getCurrentCharacterEndurance(){
    return Character.baseEnd;
}

function getCharacterMaxMana(){
    return Character.baseEnd;
}

function getCharacterEndPercentage(){
    return 100;
}

function applyDamageToCharacter(damageAmount){
    var newHealth = Character.HP - damageAmount;
    
    if(newHealth <= 0){
        Character.HP = 0;
        updateCharacterHPBar(); 
        killCharacter();
    }else{
        Character.HP = newHealth;
        updateCharacterHPBar();    
    }

}


function killCharacter(){
    alert("YOU ARE DEAD!!  Loading..Please Wait...")
}