
//*******Swing Key Codes********//
// 0 Thrust to center
// 1 Swing from right to the middle
// 2 Swing from left to the middle
// 3 Underhand swing from right
// 4 Underhand swing from left
// 5 Overhand swing from right
// 6 Overhand swing from left
// 7 Overhand to the middle
//****************************//
var playerActionDirectionNames = new Array("center", "right side", "left side", "right low", "left low", "right top", "left top", "top middle");
var playerActionDirection = 0;

var isMobTargeted = false;
var mobIDTargeted = -1;



function targetMob(engagedMobID){

    if(isMobTargeted){
        if(mobIDTargeted == engagedMobID) return;
        
        renderMobUntargeting(mobIDTargeted);
    }
    
    isMobTargeted = true;
    mobIDTargeted = engagedMobID;
    
    renderMobTargeting(engagedMobID);
}

function targetNextMob(){
    
    
    var x = 0;
    var tmp = mobIDTargeted;
    
    for(x=0; x<engagedMobList.length; x++){
          
        tmp++;
        if(tmp==engagedMobList.length){
            tmp = 0;
        }

        if(engagedMobList[tmp].isAlive){
            targetMob(tmp);
            return true;
        }
        
    }
    return false;
}



//Attacker Skill will be primiry variable for hit success
//Agility of the target will be used to reduce the melee hit success 
//Dexterity of the attacker will be used to increase the melee hit success
//Wisdom of both attacker and target will be used to calculate hit success of magic attacks
//Charisma will be used to calculate the hit success of mind altering skills/spells.
//**** hit Success of under 10% will be considered missess and will be applied 0 damage
//**** hit Success of over 90% will be considered criticals and will be applied double the damage.
//**** Attack Types: 1. Melee, 2. Ranged Physical, 3 Magic, 4. Mind Altering

function getHitSuccess(attackType, exposureLevel, attackerSkill, attackerDex, attackerWis, attackerCha, targetAgi, targetWis){

    var attackerSkillAverage;
    var defenderSkillAverage;
        
    if(attackType == 1){

        attackerSkillAverage = (attackerDex+attackerSkill)/2;
        defenderSkillAverage = targetAgi;
    }else if(attackType == 2){
        //ranged
    }else if(attackType == 3){
        attackerSkillAverage = (attackerWis+attackerSkill)/2;
        defenderSkillAverage = (targetWis+targetAgi)/2;
    }else if(attackType == 4){
        //This is a mild altering attack
        //Charisma should be used by attacker.
        //Agi is not used in defending
        attackerSkillAverage = (attackerWis+attackerSkill+attackerCha)/3;
        defenderSkillAverage = targetWis;
    }
    
    var hitSuccess = calculateDamageHitSuccess(defenderSkillAverage, attackerSkillAverage);
    
    if(hitSuccess < 10) {
        hitSuccess = 0;
    }

    hitSuccess = hitSuccess + exposureLevel*10;
    

    return hitSuccess;
}

//roll 1 to 100 to see the base hit success
//than if defenders skill is higher than average of skill/stats for attacker  roll the range of reduction (range is 0 to the difference)
function calculateDamageHitSuccess(defenderSkillAverage, attackerSkillAverage){
    
    var baseHitPottential       = getRandomInt(0, 100);
    var deffenderSkillAdvantage = getPercentage(defenderSkillAverage, attackerSkillAverage)-100;
    
    var hitSuccess = baseHitPottential;

    
    
    if(deffenderSkillAdvantage > 0){
        if(deffenderSkillAdvantage > 100){
           deffenderSkillAdvantage = 100;
        }
        hitSuccess = hitSuccess - getRandomInt(0, deffenderSkillAdvantage);
    }
    
    return hitSuccess;
    
}


//Str of attacker will be used to calculate the damage multiplier for swords(75%), axes(100%), maces(100%), spears(50%), polearms(100%), shields(100%), kick(25%), hand to hand(50%)
//Dex of attacker will be used to calculate the damage multiplier for swords(25%), spears(50%), daggers(75%), bows(100%), hand to hand (25%)
//Agi of attacker will be used to calculate the damage multiplier for kicks(75%), hand to hand(25%)
//As a placeholder only kick is handled below
function getDamage(attackType, attackBaseDamage, attackSkillType, attackerStr, attackerDex, attackerAgi, attackerInt, defenderAC, defenderResist){
    
    var attackerStatAverage;
    
    if(attackType == 1){
        switch (attackSkillType) {
          case 11:
            //kick
            attackerStatAverage = (attackerAgi*3+attackerStr)/4;
            
            break;
          case 2:
            //weapon
            attackerStatAverage = (attackerStr*3+attackerDex)/4;
            
            break;
          default:
            //Statements executed when none of the values match the value of the expression
            break;
    }    
        return calculateMeleeDamage(attackBaseDamage, attackerStatAverage, defenderAC);
        
    }else if(attackType == 2){
        return calculateMagicDamage(attackBaseDamage, attackerInt, defenderAC, defenderResist);
    }
}

///need to change this to have attacker stats add to damage than reduce final damage by defender AC, not comparison between ac and stats.
///Attacker Stat Average will be the percentage by which base damage is increased
///Defenders AC ....
function calculateMeleeDamage(attackBaseDamage, attackerStatAverage, defenderAC){
    
   //alert("attackerStatAverage "+attackerStatAverage);
    var attackerStatDamagePercentageIncrease  = getRandomInt(0, attackerStatAverage)* 10;
  ///alert("attackerStatDamagePercentageIncrease "+attackerStatDamagePercentageIncrease);
    var finalDamageMultiplier = attackerStatDamagePercentageIncrease/100+1;
  ///alert("finalDamageMultiplier "+finalDamageMultiplier);
    var damageBeforeAc = attackBaseDamage * finalDamageMultiplier;
  //alert("damageBeforeAc "+damageBeforeAc);
    
    
    var damage = damageBeforeAc;

    if(damage < 0){
        
        damage = 0;
    }
    
    return damage;
}

function calculateMagicDamage(attackBaseDamage, attackerInt, defenderAC, defenderResist){
    //To do
}

