function updateCloud(){
  counter = 0;
  var clouds = document.querySelectorAll('#cloud');
  clouds.forEach(function(element){
    if (counter == 0){
      element.style.left = window.innerWidth/40 + 'px';
      element.style.top = window.innerHeight/6 + 'px';
    } else if (counter == 1){
      element.style.left = window.innerWidth/11 + 'px';
      element.style.top = window.innerHeight/1.5 + 'px';
    } else if (counter == 2){
      element.style.left = window.innerWidth/1.4 + 'px';
      element.style.top = window.innerHeight/5 + 'px';
    } else if (counter == 3){
      element.style.left = window.innerWidth/1.3 + 'px';
      element.style.top = window.innerHeight/1.45 + 'px';
    }

    counter += 1;
  });

} // updateCloud


window.onload = updateCloud;
window.onresize = updateCloud;

// Math.random
// x = Math.random() * (window.innerWidth - element.clientWidth);
// y = Math.random() * (window.innerHeight - element.clientHeight);
