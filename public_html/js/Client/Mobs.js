
var zoneMobList       = new Array();
var visibleMobList    = new Array();
var engagedMobList    = new Array();
var archetypeList     = new Array();
//var mobAbilities      = new Array();



function initMobs(){
    getMobArchetypes();
}

function convertJSONtoMobArchetypesObject(mobJSON){

    
    var archetypes = $.parseJSON(mobJSON);
    var i = 0;
    
    var archetype;
    
    for(var i = 0;i<archetypes.length;i++){
        archetype = {
            id                          : archetypes[i].archetypeID,
            archetypeID                 : archetypes[i].archetypeID,
            archetypeName               : archetypes[i].archetypeName,
            archetypeHPPerLevel         : archetypes[i].archetypeHPPerLevel,
            archetypeWeaponDamagePerLevel   : archetypes[i].archetypeWeaponDamagePerLevel,
            archetypeMeleeSkillPerLevel : archetypes[i].archetypeMeleeSkillPerLevel,
            archetypeMagicSkillPerLevel : archetypes[i].archetypeMagicSkillPerLevel,
            archetypeStrPerLevel        : archetypes[i].archetypeStrPerLevel,
            archetypeAgiPerLevel        : archetypes[i].archetypeAgiPerLevel,
            archetypeDexPerLevel        : archetypes[i].archetypeDexPerLevel,
            archetypeIntPerLevel        : archetypes[i].archetypeIntPerLevel,
            archetypeWisPerLevel        : archetypes[i].archetypeWisPerLevel,
            archetypeChaPerLevel        : archetypes[i].archetypeChaPerLevel
            
        };  
        archetypeList[archetypes[i].archetypeID] = archetype;    
    }    
    
    mobArchetypesLoaded = true;
}


//The object created here represents mob information for all possible mobs in this zone
function convertJSONtoMobBaseObject(mobJSON){

    var mobs = $.parseJSON(mobJSON);
    var i = 0;
    var mobTMP;
    
    for(var i = 0;i<mobs.length;i++){
 
        var mobAbilities = new Array();
        
        mobTMP = {
            id              : i,
            zoneMobID       : i,
            sysMobID        : mobs[i].mobID,
            mobArchetypeID  : mobs[i].mobArchetypeID,
            mobName         : mobs[i].mobName,
            mobDesc         : mobs[i].mobDesc,
            mobIMG          : mobs[i].mobIMG,
            mobMinLevel     : mobs[i].mobMinLevel,
            mobMaxLevel     : mobs[i].mobMaxLevel,
            mobHPMultiplier : mobs[i].mobHPMultiplier,
            mobACMultiplier : mobs[i].mobACMultiplier,
            mobWeaponBaseDamageMultiplier : mobs[i].mobWeaponDamageMultiplier,
            mobMeleeSkillMultiplier   : mobs[i].mobMeleeMultiplier,
            mobMagicSkillMultiplier   : mobs[i].mobMagicMultiplier,
            mobStrMultiplier   : mobs[i].mobStrMultiplier,
            mobAgiMultiplier   : mobs[i].mobAgiMultiplier,
            mobDexMultiplier   : mobs[i].mobDexMultiplier,
            mobIntMultiplier   : mobs[i].mobIntMultiplier,
            mobWisMultiplier   : mobs[i].mobWisMultiplier,
            mobChaMultiplier   : mobs[i].mobChaMultiplier,
            mobRarity          : mobs[i].mobRarity,
            mobRarityMultiplier     : mobs[i].rarityMultiplier,
            mobZoneRarityMultiplier : mobs[i].zoneRarityMultiplier,
            mobRank            : mobs[i].mobRank,
            mobAbilities       : mobAbilities,
            mobMeleeAttackSound : mobs[i].mobMeleeAttackSound,
            mobDeathSound       : mobs[i].mobDeathSound,
            mobGettingMeleeHitSound : mobs[i].mobGettingMeleeHitSound
            
        };   

        zoneMobList[i] = mobTMP;
        
        zoneMobsLoaded = true;
    }   
    
}

function convertJSONtoMobAbilitiesObject(mobAbilitiesJSON){

    mobAbilities = $.parseJSON(mobAbilitiesJSON);   
       
    mobAbilitiesLoaded = true;
}


function assosiateAbilitiesToZoneMobs(){
    var i = 0;
    var mobZoneID;
       
    for(var i = 0;i<mobAbilities.length;i++){        
        var mobAbilityList = mobAbilities[i].abilityIDList.split(',');
        mobZoneID          = getZoneMobIDByMobSysID(mobAbilities[i].mobID);
        zoneMobList[mobZoneID].mobAbilities = mobAbilityList;        
    }   
   
    mobAbilitiesGenerated = true;
}

//This function takes in systemMobID and returns id of current zone mob list instance for that mob
function getZoneMobIDByMobSysID(sysMobID){
    
    for(var i = 0;i<zoneMobList.length;i++){
        
        if(zoneMobList[i].sysMobID == sysMobID)return i;
        
    }
    
    return false;
}

function buildVisibleMobList(){
    
    var x = visibleMobList.length;
    var i = 0;
    var mobVisibleTMP;
    var mobLevel;
    var mobHP;
    var mobAC;
    var mobWeaponDamage;
    var mobMeleeSkill;
    var mobMagicSkill;
    var mobStr;
    var mobAgi;
    var mobDex;
    var mobInt;
    var mobWis;
    var mobCha;
    
    while(visibleMobList.length<mobListVisibleSize){
        var zoneMob  = getNextVisibleMob();
        
        mobLevel      = getRandomInt(zoneMob.mobMinLevel, zoneMob.mobMaxLevel);
        mobHP         = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeHPPerLevel*zoneMob.mobHPMultiplier;
        mobAC         = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeACPerLevel*zoneMob.mobACMultiplier;
        mobWeaponDamage = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeWeaponDamagePerLevel*zoneMob.mobWeaponBaseDamageMultiplier;
        mobMeleeSkill = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeMeleeSkillPerLevel*zoneMob.mobMeleeSkillMultiplier;
        mobMagicSkill = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeMagicSkillPerLevel*zoneMob.mobMagicSkillMultiplier;
        mobStr        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeStrPerLevel*zoneMob.mobStrMultiplier;
        mobAgi        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeAgiPerLevel*zoneMob.mobAgiMultiplier;
        mobDex        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeDexPerLevel*zoneMob.mobDexMultiplier;
        mobInt        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeIntPerLevel*zoneMob.mobIntMultiplier;
        mobWis        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeWisPerLevel*zoneMob.mobWisMultiplier;
        mobCha        = mobLevel*archetypeList[zoneMob.mobArchetypeID].archetypeChaPerLevel*zoneMob.mobChaMultiplier;
        
        mobVisibleTMP = {
            id        : i,
            visibleMobID : i,
            zoneMobID : zoneMob.zoneMobID,
            sysMobID  : zoneMob.mobID,
            mobName   : zoneMob.mobName,
            mobDesc   : zoneMob.mobDesc,
            mobIMG    : zoneMob.mobIMG,
            mobLevel      : mobLevel,
            mobHP         : mobHP,
            mobAC         : mobAC,
            mobWeaponDamage : mobWeaponDamage,
            mobMeleeSkill : mobMeleeSkill,
            mobMagicSkill : mobMagicSkill,
            mobStr        : mobStr,
            mobAgi        : mobAgi,
            mobDex        : mobDex,
            mobInt        : mobInt,
            mobWis        : mobWis,
            mobCha        : mobCha,
            mobRarity : zoneMob.mobRarity,
            mobRank   : zoneMob.mobRank,
            mobMeleeAttackSound : zoneMob.mobMeleeAttackSound,
            mobDeathSound       : zoneMob.mobDeathSound,
            mobGettingMeleeHitSound : zoneMob.mobGettingMeleeHitSound
        }; 
        
        visibleMobList[i] = mobVisibleTMP;
        x++;
        i++;
    }
    visibleMobListGenerated = true;   
}


function getNextVisibleMob(){

    while(zoneMobList.length >= 0){

        var zoneMobID = getRandomInt(0, zoneMobList.length-1);

        var mobDefaultRarityMulti = zoneMobList[zoneMobID].mobRarityMultiplier;
        var mobZoneRarityMulti    = zoneMobList[zoneMobID].mobZoneRarityMultiplier;   
        var currentRarity         = mobDefaultRarityMulti*mobZoneRarityMulti;

        var chanceofsuccess      = currentRarity*100;
        var probabilityRoll      = getRandomArbitrary(0, 100);
        var rollNeededForSuccess = 100 - chanceofsuccess;

            if(probabilityRoll - rollNeededForSuccess >= 0){
               return zoneMobList[zoneMobID];
            }else{
               handleChatSumbit(0, "You noticed "+zoneMobList[zoneMobID].mobName+" from the corner of your eye but it quickly dissapeared in the shadows");
            }       
    }
}

function pullMob(visibleMobID){

    handleChatSumbit(0, "You pulled "+visibleMobList[visibleMobID].mobName);
    engageMob(visibleMobID);
}

function engageMob(visibleMobID){

    var engagedMobID;
    var engaged = false;
    var mobEngagedTMP;
    
    var x = 0;
    while(x< maximumEngagedMobs){
        if(x == engagedMobList.length || engagedMobList[x].isAlive != 1){

            mobEngagedTMP = {
                id        : x,
                engagedMobID : x,
                visibleMobID : visibleMobList[visibleMobID].visibleMobID,
                zoneMobID : visibleMobList[visibleMobID].zoneMobID,
                sysMobID  : visibleMobList[visibleMobID].mobID,
                mobName   : visibleMobList[visibleMobID].mobName,
                mobDesc   : visibleMobList[visibleMobID].mobDesc,
                mobIMG    : visibleMobList[visibleMobID].mobIMG,
                mobLevel  : visibleMobList[visibleMobID].mobLevel,
                mobHP     : visibleMobList[visibleMobID].mobHP,
                mobWeaponDamage : visibleMobList[visibleMobID].mobWeaponDamage,
                mobMeleeSkill : visibleMobList[visibleMobID].mobMeleeSkill,
                mobMagicSkill : visibleMobList[visibleMobID].mobMagicSkill,
                mobAC     : visibleMobList[visibleMobID].mobAC,
                mobStr    : visibleMobList[visibleMobID].mobStr, 
                mobAgi    : visibleMobList[visibleMobID].mobAgi,  
                mobDex    : visibleMobList[visibleMobID].mobDex, 
                mobInt    : visibleMobList[visibleMobID].mobInt, 
                mobWis    : visibleMobList[visibleMobID].mobWis, 
                mobCha    : visibleMobList[visibleMobID].mobCha, 
                mobRarity : visibleMobList[visibleMobID].mobRarity,
                mobRank   : visibleMobList[visibleMobID].mobRank,
                hasMob    : 1,
                isAlive   : 1,
                activeHP  : visibleMobList[visibleMobID].mobHP,
                mobBoxID  : -1,
                mobAbilities : zoneMobList[visibleMobList[visibleMobID].zoneMobID].mobAbilities,
                mobMeleeAttackSound : visibleMobList[visibleMobID].mobMeleeAttackSound,
                mobDeathSound       : visibleMobList[visibleMobID].mobDeathSound,
                mobGettingMeleeHitSound : visibleMobList[visibleMobID].mobGettingMeleeHitSound,
                abilityinterrupted  : false,
                executionInProgress : false,
                executionDirection  : -1,
                executionAbilityID  : -1,
                stunned             : false
                
            }; 
        
            engagedMobList[x] = mobEngagedTMP;
            engagedMobID = x;
            engaged = true;           
            break;
        }
        x++;
    }
    

    if(engaged){       
        if(isMobBoxAvailable()){
            renderEngagedMob(engagedMobID);
            runEngagedMob(engagedMobID);
        }else{
            handleChatSumbit(0, engagedMobList[engagedMobID].mobName+" have taken notice of you but will have to wait its turn!  You are already surrounded!");
        }
    }else{
        handleChatSumbit(0, "You can not pull anymore mobs!  Your hands are a bit too full right now!");
    }
    
}


function getMobHPPercentage(engagedMobID){
    
    var mobHPPercentage = engagedMobList[engagedMobID].activeHP/engagedMobList[engagedMobID].mobHP*100;
    if(mobHPPercentage < 0){
        mobHPPercentage = 0;
    }
    return mobHPPercentage;
}


function applyDamageToMob(engagedMobID, damageAmount){
    
    var newHealth = engagedMobList[engagedMobID].activeHP - damageAmount;
    
    if(newHealth <= 0){
        engagedMobList[engagedMobID].activeHP = 0;
        updateMobHealthBar(engagedMobID); 
        killMob(engagedMobID);
    }else{
        engagedMobList[engagedMobID].activeHP = newHealth;
        updateMobHealthBar(engagedMobID);    
    }

}


function killMob(engagedMobID){
    
    engagedMobList[engagedMobID].isAlive = 0;
    engagedMobList[engagedMobID].hasMob  = 0;
   
    if(mobIDTargeted == engagedMobID){
        isMobTargeted = false;
        mobIDTargeted = -1;
    }
    playMobDeathSound(engagedMobID);
        
   //**********Need to generage Loot****************///
   //**********Need to distribute EXP***************///
   //**********Need to distribute skills/achevements if any for kill****//
   updateMobExposedAreas(engagedMobID);
   removeMobSprite(engagedMobID);  
}


function stunMob(engagedMobID, stunTime){
    engagedMobList[engagedMobID].executionInProgress = false;
    engagedMobList[engagedMobID].stunned = true;
    engagedMobList[engagedMobID].abilityinterrupted = true;
    updateMobExposedAreas(engagedMobID);
    setTimeout(function() {unstunMob(engagedMobID);},stunTime);
}

function unstunMob(engagedMobID){
    alert("mob unstunned!");
    engagedMobList[engagedMobID].stunned = false;
    engagedMobList[engagedMobID].abilityinterrupted = false;
    updateMobExposedAreas(engagedMobID);
}

function interruptMob(engagedMobID){
    engagedMobList[engagedMobID].abilityinterrupted = true;
}

