<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>

      <?php

        if(isset($error)){
          echo $error;
        } else {
          foreach($jokes as $joke){
            echo $joke . '</p><p>';
          }
        }

       ?>

    </p>
  </body>
</html>
