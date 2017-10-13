//*******Swing Key Codes********//
// 0 Straight to center [s, <down arrow>, num pad 5, num pad 2]
// 1 Swing from right to the middle [d, <right arrow>, num pad 6]
// 2 Swing from left to the middle [a, <left arrow>, num pad 4]
// 3 Underhand swing from right [x, num pad 3, pg down]
// 4 Underhand swing from left [z, num pad 1, End]
// 5 Overhand swing from right [e, num pad 9, pg up]
// 6 Overhand swing from left [q, num pad 7, Home]
// 7 Overhand to the middle [w, <up arrow>, num pad 8]
//****************************//



//****** TO DO **********************//
// 1. Make sure chat input box is not in focus.
// 2. Handle Arrow keys
// 
    document.onkeydown=function(e){
        
        var e=window.event || e

         
         //alert("Key Pressed: "+e.keyCode);
         
        switch (e.keyCode) {
          case 48:
            if(actionBar0Map[9].action !== 0){
                initiateAbility(actionBar0Map[9].actionID);
            }
            break;
          case 49:             
            if(actionBar0Map[0].action !== 0){
                initiateAbility(actionBar0Map[0].actionID);
            }
            break;
          case 50:
            if(actionBar0Map[1].action !== 0){
                initiateAbility(actionBar0Map[1].actionID);
            }
            break;
          case 51:
            if(actionBar0Map[2].action !== 0){
                initiateAbility(actionBar0Map[2].actionID);
            }
            break;
          case 52:
            if(actionBar0Map[3].action !== 0){
                initiateAbility(actionBar0Map[3].actionID);
            }
            break;
            
          case 53:
            if(actionBar0Map[4].action !== 0){
                initiateAbility(actionBar0Map[4].actionID);
            }
            break;
          case 54:
            if(actionBar0Map[5].action !== 0){
                initiateAbility(actionBar0Map[5].actionID);
            }
            break;
          case 55:
            if(actionBar0Map[6].action !== 0){
                initiateAbility(actionBar0Map[6].actionID);
            }
            break;
          case 56:
            if(actionBar0Map[7].action !== 0){
                initiateAbility(actionBar0Map[7].actionID);
            }
            break;
          case 57:
            if(actionBar0Map[8].action !== 0){
                initiateAbility(actionBar0Map[8].actionID);
            }
            break;
          case 58:
            if(actionBar0Map[9].action !== 0){
                initiateAbility(actionBar0Map[9].actionID);
            }
            break;
          case 59:

            break;
            //*********  Swing Directions*************//
            // 0 Straight to center [s, <down arrow>, num pad 5, num pad 2]
          case 83:
               playerActionDirection = 0;
            break;
          case 40:
               playerActionDirection = 0;
            break;
          case 98:
               playerActionDirection = 0;
            break;
          case 101:
               playerActionDirection = 0;
            break;
            // 1 Swing from right to the middle [d, <right arrow>, num pad 6]
          case 68:
               playerActionDirection = 1;
            break;
          case 39:
               playerActionDirection = 1;
            break;
          case 102:
               playerActionDirection = 1;
            break;
            // 2 Swing from left to the middle [a, <left arrow>, num pad 4]
          case 65:
               playerActionDirection = 2;
            break;
          case 37:
               playerActionDirection = 2;
            break;
          case 100:
               playerActionDirection = 2;
            break;
            // 3 Underhand swing from right [x, num pad 3, pg down]
          case 88:
               playerActionDirection = 3;
            break;
          case 99:
               playerActionDirection = 3;
            break;
          case 34:
               playerActionDirection = 3;
            break;
            // 4 Underhand swing from left [z, num pad 1, End]
          case 90:
               playerActionDirection = 4;
            break;
          case 97:
               playerActionDirection = 4;
            break;
          case 35:
               playerActionDirection = 4;
            break;
            // 5 Overhand swing from right [e, num pad 9, pg up]
          case 69:
               playerActionDirection = 5;
            break;
          case 105:
               playerActionDirection = 5;
            break;
          case 33:
               playerActionDirection = 5;
            break;
            // 6 Overhand swing from left [q, num pad 7, Home]
          case 81:
               playerActionDirection = 6;
            break;
          case 103:
               playerActionDirection = 6;
            break;
          case 36:
               playerActionDirection = 6;
            break;
            // 7 Overhand to the middle [w, <up arrow>, num pad 8]
          case 87:
               playerActionDirection = 7;
            break;
          case 104:
               playerActionDirection = 7;
            break;
          case 38:
               playerActionDirection = 7;
            break;
            //***************END SWING DIRECTION******************//
          case 9:
              targetNextMob();
            break;
          case 84:
              targetNextMob();
            break;
          default:
            //Statements executed when none of the values match the value of the expression
            break;
        }
    }