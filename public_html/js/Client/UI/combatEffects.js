

//This would display a player shield when block is performed
 /***************TO DO************************
 * -1- Use equiped shield type to identify the closest shield immage to use for effect.
 * -2- Figure out how to not have the shield immage 'squished'.. possibly not use  height and width and rely on immage dimentions
 ********************************************/
function renderShieldBlockEffect(){
    
    //this should be defined based on equiped shield type
    var shieldType = effectsFolder+blockEffect1;
    
    var shieldEffect = PIXI.Sprite.fromImage(shieldType);

    shieldEffect.height = blockEffectHeight;
    shieldEffect.width  = blockEffectWidth;
    shieldEffect.position.x = blockEffectLocX;
    shieldEffect.position.y = blockEffectLocY;
    shieldEffect.alpha = 0.1;

    stage.addChild(shieldEffect);
            
    fadeInAndOutEffect(shieldEffect, 0, 0.25, 0.1, 100, 100, 1, 0);
}




function renderMobExecutionDirectionEffect(engagedMobID){
    
}



function renderMobExposedAreasEffect(engagedMobID){
    
}