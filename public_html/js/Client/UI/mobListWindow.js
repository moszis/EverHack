var mobListWindow;
var mobVisibleSlots = new Array();
var mobSlotObjects = [];

var mouseOverMobSlot   = false;
var mouseOverMobSlotID = -1;

function renderMobSelection(){
   
   renderMobListWindow();
   buildMobListSlots();
   renderMobListSlots();
   renderMobList();
}

function buildMobListSlots(){
    
        var mobSlot = new Object();
        var slotX = 0;
        var slotY = 0;
        var slotID = 0;

        var x = 0;
        //Generate Opponent Def Row
        for(x=0; x < mobListVisibleSize; x++){
//
            mobSlot = {
                x : slotX,
                y : slotY,
                id : slotID,
                mob : 0,
                mobArrayID : 0
            }
            mobVisibleSlots[slotID] = mobSlot;

            slotY = slotY + mobListVisibleSlotHeight;
            slotID++;
        }  

}


function renderMobListWindow(){
    
         
        var mobListWin = new PIXI.Graphics();
        mobListWin.beginFill(0x000000);  
        mobListWin.lineStyle(1, 0xFFFFFF);
        mobListWin.drawRect(mobListWindowLocX, mobListWindowLocY, mobListWindowWidth, mobListWindowHeight);
        mobListWin.endFill();  
        mobListWin.boundsPadding = 0;
        var texture = mobListWin.generateTexture();   
        
        mobListWindow = new PIXI.Sprite(texture);
        mobListWindow.buttonMode = true;
        mobListWindow.interactive = true;
        
        mobListWindow.position.x = mobListWindowLocX;
        mobListWindow.position.y = mobListWindowLocY;

        // use the mousedown and touchstart
        mobListWindow.mousedown = mobListWindow.touchstart = function(data)
        {
                this.data = data;
                this.alpha = 1;
                if(!mouseOverMobSlot)
                this.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        mobListWindow.mouseup = mobListWindow.mouseupoutside = mobListWindow.touchend = mobListWindow.touchendoutside = function(data)
        { 
                this.anchor.x = 0;
                this.anchor.y = 0;
                
                this.alpha = 1;
                
                this.dragging = false;

                this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        mobListWindow.mousemove = mobListWindow.touchmove = function(data)
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

        mobListWindow.mouseover = mobListWindow.touchstart = function (data){

        };

        mobListWindow.mouseout = mobListWindow.touchend = function(data){

        };
        
       
        stage.addChild(mobListWindow);
   
         
  
}

function renderMobListSlots(){
    
    var x = 0;
    
    for(x=0; x < mobVisibleSlots.length; x++){
        
                
        var mobVisibleSlot = new PIXI.Graphics();
        
        // set the line style to have a width of 5 and set the color to red
        mobVisibleSlot.lineStyle(1, 0xFFFFFF);
        mobVisibleSlot.buttonMode = true;
        mobVisibleSlot.interactive = true;
        mobVisibleSlot.beginFill(0xD3D3D3);          

        mobVisibleSlot.drawRect(mobVisibleSlots[x].x, mobVisibleSlots[x].y, mobListWindowWidth, mobListVisibleSlotHeight);
            
        mobVisibleSlot.boundsPadding = 0;
        var texture = mobVisibleSlot.generateTexture();  
            
        var thisSlot = new PIXI.Sprite(texture);
        //thisSlot.buttonMode = true;
        thisSlot.interactive = true;
     
        thisSlot.position.x = mobVisibleSlots[x].x;
        thisSlot.position.y = mobVisibleSlots[x].y;  
        thisSlot.id     = mobVisibleSlots[x].id;
            
            thisSlot.mouseover = function(data) {  
                this.alpha = 0.1;
                mouseOverMobSlot   = true;
                mouseOverMobSlotID = this.id;
            };

            thisSlot.mouseout = function(data) {  
                this.alpha = 1;
                
                if(this.id == mouseOverMobSlotID){
                   mouseOverMobSlot   = false;
                   mouseOverMobSlotID = -1;
               }
    
            };
            
            thisSlot.mouseup = thisSlot.mouseupoutside = thisSlot.touchend = thisSlot.touchendoutside = function(data)
            { 
                    pullMob(mobSlotObjects[this.id].id);
            };
        
            thisSlot.alpha = 1;

            mobListWindow.addChildAt(thisSlot, x);  
          
            mobSlotObjects[x] = thisSlot;
            
    }
}

function renderMobList(){
    
    var x = 0;
    
    for(x=0; x < visibleMobList.length; x++){
        
        var font      = mobListVisibleFont;
        var fontSize  = mobListVisibleFontSize; 
        var fontColor = mobListVisibleFontColor;


        var mobText  = new PIXI.Text(visibleMobList[x].mobName);
        
        mobText.setStyle({font:""+fontSize+"px "+font, fill:fontColor});
 
        var mobTextX = 0;
        var mobTextY = 0;
        
        mobText.position.x = mobTextX;
        mobText.position.y = mobTextY;

        mobSlotObjects[x].addChildAt(mobText, 0);
        
    }
}


