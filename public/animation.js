function loadBlocks(){
    var tagHolder = "";
    $('.blocks').empty();
    for (var i = 0; i < window.innerWidth + 60; i += 60){
      if (i % 180 == 0){
        tagHolder = '<img id="blossom_tile1" src="images/blossom_tile1.png" />';
      } else if (i % 480 == 0){
        tagHolder = '<img id="blossom_tile2" src="images/blossom_tile2.png" />';
      } else {
        tagHolder = '<img id="grass_tile" src="images/grass_tile.png" />';
      } // if

      $('.blocks').prepend(tagHolder);
    }

}

window.onload = loadBlocks;
window.onresize = loadBlocks;
