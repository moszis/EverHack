/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var skelletonAttack2;
//var skelletonDeath1;
//var skelletonDeath2;
var blockSound1;

function preLoadStaticSoundEffects(){
    blockSound1 = new Audio(soundFolder+"block_sound1.wav");
   // skelletonAttack2 = new Audio(soundFolder+"NPC_Skeleton_Attack_02.wav"); // buffers automatically when created
    //skelletonDeath1  = new Audio(soundFolder+"NPC_Skeleton_Death_01.wav");
    //skelletonDeath2  = new Audio(soundFolder+"NPC_Skeleton_Death_02.wav");
}


function playMobGettingHitSound(engagedMobID){
    try{
      GameAssetsObjects[engagedMobList[engagedMobID].mobGettingMeleeHitSound].play();
    }catch(e){}
}


function playMobDeathSound(engagedMobID){
    try{
       GameAssetsObjects[engagedMobList[engagedMobID].mobDeathSound].play();
    }catch(e){}
}

function playMobMeleeAttackingSound(engagedMobID){
    try{
       GameAssetsObjects[engagedMobList[engagedMobID].mobMeleeAttackSound].play();
    }catch(e){}
}