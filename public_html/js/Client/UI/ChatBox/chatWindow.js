$(function() {
    $( "#ChatContainer" ).draggable().resizable();
  });
  
  

$(function(){
   $("#InputText").keyup(function (e) {
      if (e.which == 13) {
        var chatText = document.getElementById('InputText');
        handleChatSumbit(1, chatText.value);
        document.getElementById('InputText').value='';
        $("#InputText").blur();
      }
   });
});

    
function handleChatSumbit(textType, textContent){
    
          //alert("chat text submitted");
    
          var text = '<font color="white"> '+textContent+'</font> <br>';
          var div = document.getElementById('ChatBox');

          div.innerHTML = div.innerHTML + text;
          
          div.scrollTop = div.scrollHeight;



}

