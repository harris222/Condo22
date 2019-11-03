function test(){
  alert("You are here!");
  var frm = document.getElementsByClassName()[0];
  var json = JSON.stringify(frm.serializeArray());
  $.ajax({
    type: "POST",
    url: "cluster0-qwtwk.mongodb.net:27017/condo19.con19",
    data: json,
    dataType:"text/plain",

    success: function(response){
        alert("You've succeeeded!");
    },
  });
}
