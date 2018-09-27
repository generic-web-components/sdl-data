# \<sdl-data\>

A Generic Data Provider to elements that are placed into the default slot of this element.   Also, an event 'sdl-data-ready' is also thrown to those who are listening and want it as well.  


## Download from npm using yarn into your node_modules directory
```
$ yarn upgrade
$ yarn add @sdl-web/sdl-data --flat
```

##  Run the es6 version of the Demo (Assuming you installed at SERVER_ROOT using npm)
```
{SERVER_ROOT}/node_modules/@sdl-web/sdl-data/build-demo/es6-bundled/demo/index.html
```

##  Include sdl-data-loader.js to use as stand-alone bundled component 
or 
##  Include sdl-data.js directly if including in a polymer project. 
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>sdl-data demo</title>

    <!-- If using in an existing polymer project:  use sdl-srch-bar.js directly-->
    <script type="import" src="@sdl-web/sdl-data/src/components/sdl-data.js"></script> 

    <!-- Now add sdl-data to html section -->
    <sdl-data name="combo1-data" id='combo1-data' url='./data/srch-data.txt' name="names">  
        <vaadin-combo-box name="combo1" item-label-path="name" item-value-path="_id" label="Name"></vaadin-combo-box>
    </sdl-data>


    <!-- Finally, listen for change event -->
    <!-- <script>
        $('document').ready(function(){

          var combo1 = document.querySelector('#combo1-data');
          combo1.addEventListener("sdl-data-ready", function(e) {
            console.log("NAME=",e.detail.name);
            console.log("PAYLOAD",e.detail.payload);
          }, false);

        });
    </script> -->

    </script>
  </body>
</html>

```
