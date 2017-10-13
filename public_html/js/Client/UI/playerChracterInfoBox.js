
var charInfoBox;

/* global characterInfoBoxH, characterInfoBoxW, characterInfoBoxX, characterInfoBoxY, charInfoBoxSrc, PIXI */

//display character main info window (HP, Mana, Edurance, Exp)
function renderCharacterInfoBox(){
    
        charInfoBox = PIXI.Sprite.fromImage(charInfoBoxSrc);

        charInfoBox.interactive = true;
        charInfoBox.buttonMode = true;

        charInfoBox.height = characterInfoBoxH;
        charInfoBox.width  = characterInfoBoxW;
        charInfoBox.position.x = characterInfoBoxX;
        charInfoBox.position.y = characterInfoBoxY;


        // use the mousedown and touchstart
        charInfoBox.mousedown = charInfoBox.touchstart = function(data)
        {
                this.data = data;
                this.alpha = 1;
                this.dragging = true; 
        };

        // set the events for when the mouse is released or a touch is released
        charInfoBox.mouseup = charInfoBox.mouseupoutside = charInfoBox.touchend = charInfoBox.touchendoutside = function(data)
        { 
                this.anchor.x = 0;
                this.anchor.y = 0;
                
                this.alpha = 1;
                this.dragging = false;

                this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        charInfoBox.mousemove = charInfoBox.touchmove = function(data)
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

        charInfoBox.mouseover = charInfoBox.touchstart = function (data){

        };

        charInfoBox.mouseout = charInfoBox.touchend = function(data){

        };

        stage.addChild(charInfoBox);
        
        renderCharacterTitleBarName(charInfoBox);
        renderCharacterTitleBarLevel(charInfoBox);
        renderCharacterHPBar(charInfoBox);
        renderCharacterManaBar(charInfoBox);
        renderCharacterEnduranceBar(charInfoBox);
    }
    
    
    function renderCharacterTitleBarName(){
        
        var font      = characterTitleBarNameFont;
        var fontSize  = characterTitleBarNameFontSize; 
        var fontColor = characterTitleBarNameFontColor;


        var charTitleBoxName  = new PIXI.Text(Character.name);
        
        charTitleBoxName.setStyle({font:""+fontSize+"px "+font, fill:fontColor});
 
        charTitleBoxName.position.x = characterTitleBarNameLocX;
        charTitleBoxName.position.y = characterTitleBarNameLocY;

        charInfoBox.addChildAt(charTitleBoxName, 0);
        
    }
    
    function renderCharacterTitleBarLevel(charInfoBox){
        
        var font      = characterTitleBarLevelFont;
        var fontSize  = characterTitleBarLevelFontSize; 
        var fontColor = characterTitleBarLevelFontColor;


        var charTitleBoxLevel  = new PIXI.Text(Character.level);
        
        charTitleBoxLevel.setStyle({font:""+fontSize+"px "+font, fill:fontColor});
 
        charTitleBoxLevel.position.x = characterTitleBarLevelLocX;
        charTitleBoxLevel.position.y = characterTitleBarLevelLocY;

        charInfoBox.addChildAt(charTitleBoxLevel, 1);
        
    }
    
    function renderCharacterHPBar(){
        
        var HPBar = new PIXI.Graphics();
        var HPBarLengh = characterInfoHpBarMaxWidth/100 * getCharacterHPPercentage();

            // set the line style to have a width of 5 and set the color to red
            HPBar.lineStyle(1, 0xFFFFFF);
            HPBar.buttonMode = true;
            //graphics.setInteractive(true);
            HPBar.beginFill(0xFF0000);          
            
            HPBar.drawRect(characterInfoHPBarLocX, characterInfoHPBarLocY, HPBarLengh, characterInfoHpBarHeight);

            HPBar.mouseover = function(e) {
                //Not useful at this moment.  Moving card over is not considered mouse over.
                //Possibly can utilize for tooltips about that slot.
                //But will need to figure out how to identify each of them separatelly
            };

            HPBar.alpha = 1;

            charInfoBox.addChildAt(HPBar, 2);  
    }
    
    
    function updateCharacterHPBar(){
        
        try{
          charInfoBox.removeChildAt(2);  
        }catch(exception) {}
        
        renderCharacterHPBar()
    }
    
    
    
    function renderCharacterManaBar(){
        
            var ManaBar = new PIXI.Graphics();
            var ManaBarLengh = characterInfoManaBarMaxWidth/100 * getCharacterManaPercentage();

            // set the line style to have a width of 5 and set the color to red
            ManaBar.lineStyle(1, 0xFFFFFF);
            ManaBar.buttonMode = true;
            //graphics.setInteractive(true);
            ManaBar.beginFill(0x0000FF);          
            
            ManaBar.drawRect(characterInfoManaBarLocX, characterInfoManaBarLocY, ManaBarLengh, characterInfoManaBarHeight);

            ManaBar.mouseover = function(e) {
                //Not useful at this moment.  Moving card over is not considered mouse over.
                //Possibly can utilize for tooltips about that slot.
                //But will need to figure out how to identify each of them separatelly
            };

            ManaBar.alpha = 1;

            charInfoBox.addChildAt(ManaBar, 3);  
    }
    
    function renderCharacterEnduranceBar(){
            
            var EndBar = new PIXI.Graphics();
            var EndBarLengh = characterInfoEndBarMaxWidth/100 * getCharacterEndPercentage();

            // set the line style to have a width of 5 and set the color to red
            EndBar.lineStyle(1, 0xFFFFFF);
            EndBar.buttonMode = true;
            //graphics.setInteractive(true);
            EndBar.beginFill(0xFFFF00);          
            
            EndBar.drawRect(characterInfoEndBarLocX, characterInfoEndBarLocY, EndBarLengh, characterInfoEndBarHeight);

            EndBar.mouseover = function(e) {
                //Not useful at this moment.  Moving card over is not considered mouse over.
                //Possibly can utilize for tooltips about that slot.
                //But will need to figure out how to identify each of them separatelly
            };

            EndBar.alpha = 1;

            charInfoBox.addChildAt(EndBar, 3);  
    }
    
    
    function renderCharacterEXPBar(){
        
    }