
var engagedMobBoxList = new Array();
var engagedMobBoxSpriteObjects = [];
var engagedMobSpriteObjects = [];
var mobOpeningIndicatorsArray = new Array();

var mobBoxY;




function renderEngagedMob(engagedMobID){
 
    if(!isMobBoxAvailable()){
        handleChatSumbit(0, engagedMobList[engagedMobID].mobName+"Have taken notice of you but will have to wait its turn!  You are already surrounded!");
        return;
    }
    handleChatSumbit(0, engagedMobList[engagedMobID].mobName+" is coming for you!");
    
    var mobBoxID = getNextAvailableMobBox();

    engagedMobList[engagedMobID].mobBoxID = mobBoxID;

    var mobX = 0;
    var mobY = 0;
    //var mobHeight = mobDefaultHeight;
    //var mobHeight = engagedMobBoxSpriteObjects[mobBoxID].height*mobHeightMultiplierRelativeToBox;
    var mobHeight = engagedMobBoxSpriteObjects[mobBoxID].height;
    var mobWidth  = engagedMobBoxSpriteObjects[mobBoxID].width;
    var mobImage  = mobImageFolder+engagedMobList[engagedMobID].mobIMG;
    
    var mob = generateMobSprite(engagedMobID, mobBoxID, mobX, mobY, mobHeight, mobWidth, mobImage);
    
            
    engagedMobBoxSpriteObjects[mobBoxID].addChildAt(mob, 0);
    engagedMobBoxSpriteObjects[mobBoxID].hasMob = 1;
    engagedMobBoxSpriteObjects[mobBoxID].engagedMobID = engagedMobID;


    //*********TO DO*****************************
    //Is there a need for mob box array?  or is object array enough??
    //engagedMobBoxList[nextAvailableBoxID].hasMob = 1;
    //engagedMobBoxList[nextAvailableBoxID].engagedMobID = engagedMobID;
     
}


//This function requests creation all UI associated with the mob
//Mob boxes, combat indicators, mob statistic bars
function renderMobBoxes(){

    renderAllMobBoxSprites();
    
}

//This function defines dimetions and calls the creation of all mob boxes.
function renderAllMobBoxSprites(){
    
    var mobBoxCenter;
    var mobBoxLeft;
    var mobBoxRight;
    var mobBoxLeftBack;
    var mobBoxRightBack;

    var mobBoxID;
    mobBoxY           = windowHeight - (windowHeight * currentZoneObj.frontBoxFloorPct/100)-(mobFrontBoxHeight/2);
    var mobBoxX;
    
    //**************Back Boxes Size*******************//   
    
    ///Mob Box Left Back
    mobBoxX = windowWidth/2-mobFrontBoxWidth/2;
    mobBoxID   = 3;
    mobBoxLeftBack = renderMobBoxSprite(mobBoxID, mobBoxX, mobBoxY, mobBackBoxWidth, mobBackBoxHeight);
    engagedMobBoxSpriteObjects[mobBoxID] = mobBoxLeftBack;
    
    
    ///Mob Box Right Back
    mobBoxX = windowWidth/2+mobFrontBoxWidth/2;
    mobBoxID   = 4;
    mobBoxRightBack = renderMobBoxSprite(mobBoxID, mobBoxX, mobBoxY, mobBackBoxWidth, mobBackBoxHeight);
    engagedMobBoxSpriteObjects[mobBoxID] = mobBoxRightBack;
    
    
    //**************Front Boxes Size*******************//
    //
    ///Mob Box Center
    mobBoxX = windowWidth/2;
    mobBoxID   = 0;
    mobBoxCenter = renderMobBoxSprite(mobBoxID, mobBoxX, mobBoxY, mobFrontBoxWidth, mobFrontBoxHeight);
    engagedMobBoxSpriteObjects[mobBoxID] = mobBoxCenter;
    
    
    ///Mob Box Left
    mobBoxX = windowWidth/4;
    mobBoxID   = 1;
    mobBoxLeft = renderMobBoxSprite(mobBoxID, mobBoxX, mobBoxY, mobFrontBoxWidth, mobFrontBoxHeight);
    engagedMobBoxSpriteObjects[mobBoxID] = mobBoxLeft;
    

    ///Mob Box Right
    mobBoxX = windowWidth/4*3;
    mobBoxID   = 2;
    mobBoxRight = renderMobBoxSprite(mobBoxID, mobBoxX, mobBoxY, mobFrontBoxWidth, mobFrontBoxHeight);
    engagedMobBoxSpriteObjects[mobBoxID] = mobBoxRight;
    
}



function renderMobBoxSprite(boxID, locX, locY, boxWidth, boxHeight){
    
        var mobBox = new PIXI.Graphics();
        //mobBox.beginFill(0x000000);  
        mobBox.lineStyle(0, 0xFFFFFF);
        mobBox.drawRect(locX, locY, boxWidth, boxHeight);
        mobBox.endFill();  
        mobBox.boundsPadding = 0;
        var texture = mobBox.generateTexture();   
        
        var mobBoxSprite = new PIXI.Sprite(texture);
        mobBoxSprite.buttonMode = false;
        mobBoxSprite.interactive = false;
        
        mobBoxSprite.anchor.x = 0.5;
        mobBoxSprite.anchor.y = 0.5;
        
        mobBoxSprite.position.x = locX;
        mobBoxSprite.position.y = locY;
        mobBoxSprite.id = boxID;
        mobBoxSprite.hasMob = 0;
        mobBoxSprite.engagedMobID = -1;
        
        stage.addChild(mobBoxSprite);
      
      generateOpeningIndicatorSprites(mobBoxSprite);
      
        return mobBoxSprite;
                
}



function generateMobSprite(engagedMobID, mobBox, mobX, mobY, mobHeight, mobWidth, mobImage){

        var mob = PIXI.Sprite.fromImage(mobImage);

        mob.interactive = true;
        mob.buttonMode = true;
        

        mob.height = mobHeight;
        mob.width  = mobWidth;

        mob.position.x = mobX;
        mob.position.y = mobY;
        mob.anchor.x = 0.5;
        mob.anchor.y = 0.5;
        mob.id = engagedMobID;
        mob.engagedMobID = engagedMobID;
        
        mob.mobBoxID = mobBox; ///???????

        mob.mousedown = mob.touchstart = function(data)
        {
                this.data = data;
                this.alpha = 1;

                handleChatSumbit(0, engagedMobList[this.engagedMobID].mobName+" Targeted!");
                targetMob(this.engagedMobID);
        };

        // set the events for when the mouse is released or a touch is released
        mob.mouseup = mob.mouseupoutside = mob.touchend = mob.touchendoutside = function(data)
        { 
                this.alpha = 1;

                this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        mob.mousemove = mob.touchmove = function(data)
        {

        };

        mob.mouseover = mob.touchstart = function (data){
             this.alpha = 0.9;
        };

        mob.mouseout = mob.touchend = function(data){
              this.alpha = 1;
        };
        
        //***********TO DO*************
        //Only use this function to generate mob sprite
        //Attach sprite to box and assign all box attributes in another function
        //maybe.. maybe not.. think about it
        //


        engagedMobSpriteObjects[engagedMobID] = mob;//??????
        
        return mob;

}


function pushMobBack(engagedMobID){
    engagedMobSpriteObjects[engagedMobID].height = engagedMobSpriteObjects[engagedMobID].height*0.8;
    engagedMobSpriteObjects[engagedMobID].width  = engagedMobSpriteObjects[engagedMobID].width*0.8;
    
    setTimeout(function() {returnMobToDefaultPosition(engagedMobID);},500);
}

function pullMobForward(engagedMobID){
    engagedMobSpriteObjects[engagedMobID].height = engagedMobSpriteObjects[engagedMobID].height*1.2;
    engagedMobSpriteObjects[engagedMobID].width  = engagedMobSpriteObjects[engagedMobID].width*1.2;
    
    setTimeout(function() {returnMobToDefaultPosition(engagedMobID);},500);
}
function returnMobToDefaultPosition(engagedMobID){
    engagedMobSpriteObjects[engagedMobID].height = engagedMobBoxSpriteObjects[engagedMobSpriteObjects[engagedMobID].mobBoxID].height;
    engagedMobSpriteObjects[engagedMobID].width  = engagedMobBoxSpriteObjects[engagedMobSpriteObjects[engagedMobID].mobBoxID].width;
}


function isMobBoxAvailable(){
    
    var x = 0;
    
    for(x=0; x<engagedMobBoxSpriteObjects.length; x++){
        if(engagedMobBoxSpriteObjects[x].hasMob == 0)
            return true;
    }
    
    return false;
}


function getNextAvailableMobBox(){
    
    if(engagedMobBoxSpriteObjects[0].hasMob == 0){
        return 0;
    }else if(engagedMobBoxSpriteObjects[1].hasMob == 0  && engagedMobBoxSpriteObjects[2].hasMob == 0){
        return getRandomInt(1, 2);
    }else if(engagedMobBoxSpriteObjects[1].hasMob == 0  && engagedMobBoxSpriteObjects[2].hasMob == 1){
        return 1;
    }else if(engagedMobBoxSpriteObjects[1].hasMob == 1  && engagedMobBoxSpriteObjects[2].hasMob == 0){
        return 2;
    }else if(engagedMobBoxSpriteObjects[3].hasMob == 0  && engagedMobBoxSpriteObjects[4].hasMob == 0){
        return getRandomInt(3, 4);
    }else if(engagedMobBoxSpriteObjects[3].hasMob == 0  && engagedMobBoxSpriteObjects[4].hasMob == 1){
        return 3;
    }else if(engagedMobBoxSpriteObjects[3].hasMob == 1  && engagedMobBoxSpriteObjects[4].hasMob == 0){
        return 4;
    }else{
        return false;
    }   
}

function assignMobToAvailableDisplayBox(engagedMobID){
    
}


function renderMobHealthBar(engagedMobID){


    var HPBar = new PIXI.Graphics();
    
    var HPBarMaxlength = engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].width * mobHPBarWidtMultiplierAgainstBox;
    var HPBarLengh = HPBarMaxlength/100 * getMobHPPercentage(engagedMobID);
    var HPBarLocX  = HPBarMaxlength/2*-1;
    var HPBarLocY  = engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].height/2 * -1;

    // set the line style to have a width of 5 and set the color to red
    HPBar.lineStyle(1, 0xFFFFFF);
    HPBar.buttonMode = true;
    //graphics.setInteractive(true);
    HPBar.beginFill(0xFF0000);          
 
    
    HPBar.drawRect(HPBarLocX, HPBarLocY, HPBarLengh, mobHPBarHeight);

    HPBar.mouseover = function(e) {
        //Not useful at this moment.  Moving card over is not considered mouse over.
        //Possibly can utilize for tooltips about that slot.
        //But will need to figure out how to identify each of them separatelly
    };

    HPBar.alpha = 1;
    
    var mobBox = engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID];
    mobBox.addChildAt(HPBar, 1);  
}

function updateMobHealthBar(engagedMobID){

    try{
      var mobBox = engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID];
      mobBox.removeChildAt(1); 
    }catch(exception) {}
    
    
    renderMobHealthBar(engagedMobID);
    
}


//In this functions all aspects of rendering related to targetting a mob will be handled.
function renderMobTargeting(engagedMobID){
     renderMobHealthBar(engagedMobID);
}

function renderMobUntargeting(engagedMobID){
    
    var mobBoxID = engagedMobList[engagedMobID].mobBoxID;

    try{
       engagedMobBoxSpriteObjects[mobBoxID].removeChildAt(1); 
    }catch(exception) {}
   
}



function removeMobSprite(engagedMobID){
    
    try{
     engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].removeChildAt(0); 
    }catch(exception) {}
    
    try{
     engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].removeChildAt(1); 
    }catch(exception) {}
    
    engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].hasMob = 0;
    engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID].engagedMobID = -1;
}


function renderMobExecutionBar(engagedMobID, executionTime, abilityID){
                          
        var mobBox = engagedMobBoxSpriteObjects[engagedMobList[engagedMobID].mobBoxID]; 
        var bar = new PIXI.Graphics();

        var barLengh  = 1;
        var barLocX   = 0;
        var barLocY   = 0;
        var barHeight = mobExecutionBarHeight;

        bar.lineStyle(1, 0x0000FF);
        bar.buttonMode = false;
        bar.beginFill(0xFF0000);   
        bar.drawRect(barLocX, barLocY, barLengh, barHeight);

        var texture = bar.generateTexture();   

        var mobExecutionBar = new PIXI.Sprite(texture);
        mobExecutionBar.buttonMode = false;
        mobExecutionBar.interactive = false;

        mobExecutionBar.anchor.x = 0;
        mobExecutionBar.anchor.y = 0;

        mobExecutionBar.position.x = barLocX;
        mobExecutionBar.position.y = barLocY;

        mobExecutionBar.alpha = 1;

        mobBox.addChild(mobExecutionBar);  

        runMobExecutionBar(engagedMobID, executionTime, abilityID, mobExecutionBar);
}


//TO DO .. NEED TO PROPERLY IMPLEMENT INTERRUPT
function runMobExecutionBar(engagedMobID, executionTime, abilityID, mobExecutionBar){

    var totalTicks = executionTime/executionBarTickInterval;

    executionBarIncreasePerTick = mobExecutionBarLength/totalTicks;
    try{
        var currLength = mobExecutionBar.width;
        var newLength = currLength+executionBarIncreasePerTick;       

        mobExecutionBar.width = newLength;
   
        if(newLength < mobExecutionBarLength && !engagedMobList[engagedMobID].abilityinterrupted){
    
            setTimeout(function() {runMobExecutionBar(engagedMobID, executionTime, abilityID, mobExecutionBar);},executionBarTickInterval);
        }else{
            mobExecutionBar.width = 0;
            if(!engagedMobList[engagedMobID].abilityinterrupted){
               engagedMobList[engagedMobID].executionInProgress = false;
               mobAttack(engagedMobID, abilityID);
            }else{
               engagedMobList[engagedMobID].abilityinterrupted  = false;
               engagedMobList[engagedMobID].executionInProgress = false;
            }
        } 
    }catch(exception){}
    
}



function renderMobExposedAreas(engagedMobID){
    var exposedAreas      = getMobExposedAreas(engagedMobID);
    if(exposedAreas !== null){
        var mobBoxID          = engagedMobList[engagedMobID].mobBoxID;
        var openingIndicators = mobOpeningIndicatorsArray[mobBoxID];
        for(var x =0; x<exposedAreas.length; x++){

            openingIndicators[exposedAreas[x]].visible = true;
        }
    }
}


function hideAllMobOpeningIndicators(engagedMobID){
    
    var mobBoxID          = engagedMobList[engagedMobID].mobBoxID;
    var openingIndicators = mobOpeningIndicatorsArray[mobBoxID];
    
    for(var x =0; x<openingIndicators.length; x++){

        openingIndicators[x].visible = false;
    }
    
}




function generateOpeningIndicatorSprites(mobBoxSprite){
    
        var greenBottom = PIXI.Sprite.fromImage(effectsFolder+'Green_bottom.png');
        var mobOpeningIndicators = new Array();

        greenBottom.height = mobBoxSprite.height*0.1;
        greenBottom.width  = mobBoxSprite.width*0.4;

        greenBottom.position.x = 0;
        greenBottom.position.y = mobBoxSprite.height/2 - greenBottom.height;
        greenBottom.position.y = 0;
        greenBottom.anchor.x = 0.5;
        greenBottom.anchor.y = 0;
        greenBottom.visible = false;
        
        mobBoxSprite.addChild(greenBottom);       
        mobOpeningIndicators[0] = greenBottom;
        
        
        
        var greenTop = PIXI.Sprite.fromImage(effectsFolder+'Green_top.png');


        greenTop.height = mobBoxSprite.height*0.1;
        greenTop.width  = mobBoxSprite.width*0.4;

        greenTop.position.x = 0;
        greenTop.position.y = 0 - mobBoxSprite.height/2;;
        greenTop.anchor.x = 0.5;
        greenTop.anchor.y = 0;
        greenTop.visible = false;
        
        mobBoxSprite.addChild(greenTop);
        mobOpeningIndicators[7] = greenTop;
        
        
        
        
        var greenTopLeft = PIXI.Sprite.fromImage(effectsFolder+'Green_top_left.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenTopLeft.height = mobBoxSprite.height*0.33;
        greenTopLeft.width  = mobBoxSprite.width*0.3;

        greenTopLeft.position.x = 0 - mobBoxSprite.width/2;
        greenTopLeft.position.y = 0 - mobBoxSprite.height/2;
        greenTopLeft.anchor.x = 0;
        greenTopLeft.anchor.y = 0;
        greenTopLeft.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenTopLeft);
        mobOpeningIndicators[6] = greenTopLeft;
        
        
        
        
        var greenTopRight = PIXI.Sprite.fromImage(effectsFolder+'Green_top_right.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenTopRight.height = mobBoxSprite.height*0.33;
        greenTopRight.width  = mobBoxSprite.width*0.3;

        greenTopRight.position.x = mobBoxSprite.width/2 - greenTopRight.width;
        greenTopRight.position.y = 0 - mobBoxSprite.height/2;
        greenTopRight.anchor.x = 0;
        greenTopRight.anchor.y = 0;
        greenTopRight.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenTopRight);
        mobOpeningIndicators[5] = greenTopRight;
        
        
        
        
        
        var greenLeft = PIXI.Sprite.fromImage(effectsFolder+'Green_left.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenLeft.height = mobBoxSprite.height*0.33;
        greenLeft.width  = mobBoxSprite.width*0.1;

        greenLeft.position.x = 0 - mobBoxSprite.width/2;
        greenLeft.position.y = 0;
        greenLeft.anchor.x = 0;
        greenLeft.anchor.y = 0.5;
        greenLeft.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenLeft);
        mobOpeningIndicators[2] = greenLeft;
        
        
        
        
        
        var greenRight = PIXI.Sprite.fromImage(effectsFolder+'Green_right.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenRight.height = mobBoxSprite.height*0.33;
        greenRight.width  = mobBoxSprite.width*0.1;

        greenRight.position.x = mobBoxSprite.width/2 - greenRight.width;
        greenRight.position.y = 0;
        greenRight.anchor.x = 0;
        greenRight.anchor.y = 0.5;
        greenRight.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenRight);
        mobOpeningIndicators[1] = greenRight;
        
        
        
        
        var greenBottomLeft = PIXI.Sprite.fromImage(effectsFolder+'Green_bottom_left.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenBottomLeft.height = mobBoxSprite.height*0.33;
        greenBottomLeft.width  = mobBoxSprite.width*0.3;

        greenBottomLeft.position.x = 0 - mobBoxSprite.width/2;
        greenBottomLeft.position.y = mobBoxSprite.height/2 - greenBottomLeft.height;
        greenBottomLeft.anchor.x = 0;
        greenBottomLeft.anchor.y = 0;
        greenBottomLeft.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenBottomLeft);
        mobOpeningIndicators[4] = greenBottomLeft;
        
        
        var greenBottomRight = PIXI.Sprite.fromImage(effectsFolder+'Green_bottom_right.png');

        //mob.interactive = true;
        //mob.buttonMode = false;
        

        greenBottomRight.height = mobBoxSprite.height*0.33;
        greenBottomRight.width  = mobBoxSprite.width*0.3;

        greenBottomRight.position.x = mobBoxSprite.width/2 - greenBottomRight.width;
        greenBottomRight.position.y = mobBoxSprite.height/2 - greenBottomRight.height;
        greenBottomRight.anchor.x = 0;
        greenBottomRight.anchor.y = 0;
        greenBottomRight.visible = false;
        //greenTop.id = engagedMobID;
        //greenTop.engagedMobID = engagedMobID;
        
        mobBoxSprite.addChild(greenBottomRight);
        mobOpeningIndicators[3] = greenBottomRight;
 
   
        mobOpeningIndicatorsArray[mobBoxSprite.id] = mobOpeningIndicators;   
}

