
// Grazie all’utilizzo dell’API e il suo
// URL
// https://www.boolean.careers/api/ar
// ray/basket?n=numberPlayers
// Ricreare l’esercizio del basket,
// questa volta dando la possibilità
// all’utente di scegliere quanti
// player generare per poi stampare
// la lista in una sidebar e vedere le
// statistiche correlate al player
// clicccato



$(document).ready(function()
{
  var player = [];

  $('#utenteInput').keypress(function(event){

    if(event.which == 13){

      var thisInput = $(this);
      var numeroInserito = thisInput.val();
      // console.log(numeroInserito);

      $.ajax({
        url: "https://www.boolean.careers/api/array/basket",
        method: "GET",
        data: {
          n: numeroInserito
        },

        success: function(data){
          // console.log(data);

          for (var i=0; i < data.response.length; i++){
            player.push(data.response[i]);
          }

          for (var i = 0; i < player.length; i++) {
            var cod_giocatore = player[i].playerCode;

            // console.log(player[i].playerCode);
            var source = $('#playercode_template').html();
             //document.getElementById("playercode_template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {codicegiocatore : cod_giocatore};
            var html    = template(context);

            $(".codici_player").append(html);
          }

          $('.identificativoPlayer').click(function(){
            var thisCode = $(this).text();

            for (var i = 0; i < player.length; i++) {
              var cod_giocatore = player[i].playerCode;

              if (thisCode == cod_giocatore) {
                // console.log(player[i]);
                var source = $('#stats_template').html();
                 //document.getElementById("playercode_template").innerHTML;
                var template = Handlebars.compile(source);
                var context =
                  {code : player[i].playerCode, bounce : player[i].rebounds, score : player[i].points,
                   fault : player[i].fouls, shoots2 : player[i].twoPoints, shoots3 : player[i].threePoints };
                var html    = template(context);

                $(".statistiche").html(html);
              }
            }
          });
        },
        error: function(){
          alert("no no, non và propio");
        },
      })
    }
  });
});
