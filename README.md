# makeTextures.js #

This is a Node.js program designed to create a file to hold the base64 data of images intended to be used with webGL.

### What is this repository for? ###

I created this for CS 559 Computer Graphics at UW - Madison as a way to help me auto create a file of textures.
The output format is based off of [this tool](http://graphics.cs.wisc.edu/Courses/559-f2015/Services/imagebundler/bundler.html).

### How do I get set up? ###

* You must have [Node.js](https://nodejs.org/en/) downloaded onto your computer in order for this program to run.
* Either copy or download makeTextures.js and run using Node.js.
* Save a copy of this program in the directory of your textures and run via the terminal:
```
node maketextures.js
```
* The new file will be called:
``
textures.js
``

###How to use textures.js in your program? ###
* In html file:
```
<script src="textureFolder/textures.js"></script>
```
* In the texture part of your code:
```
var image = new Image();
image.crossOrigin = "anonymous";
image.src = LoadedImageFiles["myTexture.jpg"];
image.onload = function(){
	//TODO: add texture code here
}
```

### Contribution guidelines ###

* If you would like to make edits, please create a pull request or make an new issue.

### Who do I talk to? ###

* Andrew Tomko
* tomand285@gmail.com
