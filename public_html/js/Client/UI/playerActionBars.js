/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var actionBar0Map = new Array();

var actionSlotObjects = [];
var actionObjects     = [];

var mouseOverActionSlot = false;
var mouseOverActionSlotID = -1;

var actionClicked = false;
var actionDragged = false;
var mouseOverAction = false;
var actionIDClicked = -1;
var actionIDDragged = -1;

var playerExecutionBar;



function generateActionBars(){
    
    generateActionBar0();
    
}

function generateActionBar0(){
  
        var actionSlot = new Object();
        var slotX = 0;
        var slotY = 0;
        var col   = 1;
        var slotID = 0;
        var barID  = 0;
        var hotkey = 1;

        //Generate Opponent Def Row
        for(x=0; x < actionBar0SlotNum; x++){

            actionSlot = {
                x : slotX,
                y : slotY,
                id : slotID,
                col : col,
                barID : barID,
                action : 0,
                actionID : 0,
                hotkey   : hotkey,
            }
            actionBar0Map[slotID] = actionSlot;

            slotX = slotX + actionBarSlotWidth + actionBarSpaceBetweenSlots;
            slotID++;
            col++;
            hotkey = col;
            if(col == 10){hotkey = 0;}
            if(col > 10) {hotkey = null;}
        }  
        
        actionBarsGenerated     = true;
}


function renderActionBars(){
    
   renderActionBar0(); 

}




function renderActionBar0(){
    
    
        var charActionBar0Width  = actionBarSlotWidth * actionBar0SlotNum;
        var actionBar = new PIXI.Graphics();
        actionBar.beginFill(0x000000);  
        actionBar.lineStyle(1, 0xFFFFFF);
        actionBar.drawRect(actionBar0LocX, actionBar0LocY, charActionBar0Width, actionBarSlotHeight);
        actionBar.endFill();  
        actionBar.boundsPadding = 0;
        var texture = actionBar.generateTexture();   
        
        var charActionBar0 = new PIXI.Sprite(texture);
        charActionBar0.buttonMode = true;
        charActionBar0.interactive = true;
        
        charActionBar0.position.x = actionBar0LocX;
        charActionBar0.position.y = actionBar0LocY;

        // use the mousedown and touchstart
        charActionBar0.mousedown = charActionBar0.touchstart = function(data)
        {
                this.data = data;
                this.alpha = 1;

                if(!mouseOverAction && !actionDragged){
                   this.dragging = true;
                }
        };

        // set the events for when the mouse is released or a touch is released
        charActionBar0.mouseup = charActionBar0.mouseupoutside = charActionBar0.touchend = charActionBar0.touchendoutside = function(data)
        { 
                this.anchor.x = 0;
                this.anchor.y = 0;
                
                this.alpha = 1;
                this.dragging = false;

                this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        charActionBar0.mousemove = charActionBar0.touchmove = function(data)
        {
            if(this.dragging)
            {
                this.anchor.x = 0;
                this.anchor.y = 0;

                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                
                this.position.x = newPosition.x
                this.position.y = newPosition.y
            }
        };

        charActionBar0.mouseover = charActionBar0.touchstart = function (data){

        };

        charActionBar0.mouseout = charActionBar0.touchend = function(data){

        };
        stage.addChild(charActionBar0);
        
        renderActionBar0Slots(charActionBar0);
}


function renderActionBar0Slots(charActionBar0){
    
    for(x=0; x < actionBar0SlotNum; x++){
        
                
        var actionSlot = new PIXI.Graphics();

        // set the line style to have a width of 5 and set the color to red
        actionSlot.lineStyle(1, 0xFFFFFF);
        actionSlot.buttonMode = true;
        actionSlot.interactive = true;
        actionSlot.beginFill(0xD3D3D3);          

        actionSlot.drawRect(actionBar0Map[x].x, actionBar0Map[x].y, actionBarSlotWidth, actionBarSlotHeight);
        //actionSlot.hitArea = new PIXI.Rectangle(actionBar0Map[x].x, actionBar0Map[x].y, actionBarSlotWidth, actionBarSlotHeight);
            
        actionSlot.boundsPadding = 0;
        var texture = actionSlot.generateTexture();  
            
        var thisSlot = new PIXI.Sprite(texture);
        //thisSlot.buttonMode = true;
        thisSlot.interactive = true;
        
        thisSlot.position.x = actionBar0Map[x].x;
        thisSlot.position.y = actionBar0Map[x].y;  
        thisSlot.id     = actionBar0Map[x].id;
            
            thisSlot.mouseover = function(data) {  
                this.alpha = 0.1;
                mouseOverActionSlot   = true;
                mouseOverActionSlotID = this.id;
            };

            thisSlot.mouseout = function(data) {  
                this.alpha = 1;
                
                if(this.id == mouseOverActionSlotID){
                   mouseOverActionSlot   = false;
                   mouseOverActionSlotID = -1;
               }
    
            };
            
            
            thisSlot.alpha = 1;

            charActionBar0.addChildAt(thisSlot, x);  
            
            actionSlotObjects[x] = thisSlot;
            
            renderActionHotKeyText(thisSlot);
    }
}


function renderActionHotKeyText(thisSlot){
    
        var font      = actionSlotHotKeyFont;
        var fontSize  = actionSlotHotKeyFontSize; 
        var fontColor = actionSlotHotKeyFontColor;


        var hotkeyText  = new PIXI.Text(actionBar0Map[thisSlot.id].hotkey);
        
        hotkeyText.setStyle({font:""+fontSize+"px "+font, fill:fontColor});
 
        var hotKeyTextX = actionBarSlotWidth/2 - actionSlotHotKeyFontSize/3;
        var hotKeyTextY = actionBarSlotHeight/2 - actionSlotHotKeyFontSize/2;
        
        hotkeyText.position.x = hotKeyTextX;
        hotkeyText.position.y = hotKeyTextY;

        thisSlot.addChildAt(hotkeyText, 0);
        
        
}

function renderActions(){

    var x = 1;
    
    for(x=1; x < characterActions.length; x++){
        
      renderAction(characterActions[x].id);
      
      
    }
    
}

function renderAction(actionID){
    

    var actionIconSrc = actionIconFolder+characterActions[actionID].abilityIcon; 
    var actionSlotID = characterActions[actionID].actionSlotID;
    var actionSlot = actionSlotObjects[actionSlotID];
 
    actionSlotObjects[characterActions[actionID].actionSlotID].actionID = actionID;
    
    var actionButton = PIXI.Sprite.fromImage(actionIconSrc);

        actionButton.interactive = true;
        actionButton.buttonMode = true;
        

        actionButton.height = actionIconHeight;
        actionButton.width  = actionIconWidth;

        actionButton.position.x = 0;
        actionButton.position.y = 0;
        actionButton.id = actionID;



     // use the mousedown and touchstart
        actionButton.mousedown = actionButton.touchstart = function(data)
        {
                this.data = data;
                this.alpha = 1;
                this.dragging = true; 
                this.anchor.x = 0;
                this.anchor.y = 0;
 
                actionClicked = true;
                actionIDClicked = this.id;

        };

        // set the events for when the mouse is released or a touch is released
        actionButton.mouseup = actionButton.mouseupoutside = actionButton.touchend = actionButton.touchendoutside = function(data)
        { 
                this.anchor.x = 0;
                this.anchor.y = 0;
                this.dragging = false;                
                
                //alert(actionIDDragged);
                if(mouseOverActionSlot && mouseOverActionSlotID !== characterActions[this.id].actionSlotID){
                   //Check here weather another action is in that slot 
                   
                   if(actionBar0Map[mouseOverActionSlotID].action !== 0){
                       alert("action already in this slot");
                       returnActionToPreviousActionSlot(actionID);
                   }else{
                       moveActionToSlot(actionIDDragged, mouseOverActionSlotID); 
                   }
     
                }else if(mouseOverActionSlot){
                   if(actionDragged == false){
                     initiateAbility(this.id);
                   }else{
                     returnActionToPreviousActionSlot(actionID);
                   }
                }
                else{
                    returnActionToPreviousActionSlot(actionID);
                }
                this.alpha = 1;               
                actionClicked = false;
                actionIDClicked = -1;
                actionDragged = false;
                actionIDDragged = -1;
                this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        actionButton.mousemove = actionButton.touchmove = function(data)
        {
            if(this.dragging)
            {
                actionDragged = true;
                actionIDDragged = this.id;

                this.anchor.x = 0;
                this.anchor.y = 0;
                this.alpha = 1;
                
                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                
                this.position.x = newPosition.x
                this.position.y = newPosition.y
            }
        };

        actionButton.mouseover = actionButton.touchstart = function (data){
             mouseOverAction = true;  
        };

        actionButton.mouseout = actionButton.touchend = function(data){
             mouseOverAction = false;  
        };
        
        
        actionObjects[actionID] = actionButton;
        actionSlot.addChildAt(actionButton, 1);

        actionBar0Map[actionSlotID].action = 1;
        actionBar0Map[actionSlotID].actionID = actionID;
           
}

function moveActionToSlot(actionID, actionSlotID){
    
    //console.log("actionID: "+actionID+" actionSlotID: "+actionSlotID);
    //console.log("*****Need to move "+characterActions[actionID].abilityName+" to slot# "+actionSlotID+" From slot "+characterActions[actionID].actionSlotID);

  
    var oldSlotID = characterActions[actionID].actionSlotID;
    var newSlotID = actionSlotID;
     
    if(actionBar0Map[newSlotID].action !== 0){
        alert("there is action in that slot already "+actionBar0Map[newSlotID].actionID); 
        //***SWAP ACTIONS.
    }

    actionBar0Map[newSlotID].actionID = actionID;
    characterActions[actionID].actionSlotID = newSlotID;
     
    actionSlotObjects[oldSlotID].removeChild(actionObjects[actionID]);
    actionBar0Map[oldSlotID].action = 0;
    
    updateActionSlotOnServer(characterActions[actionID].abilityID, newSlotID);
    renderAction(actionID);

}


function returnActionToPreviousActionSlot(actionID){

    actionSlotObjects[characterActions[actionID].actionSlotID].removeChild(actionObjects[actionID]);
    renderAction(actionID);

}


