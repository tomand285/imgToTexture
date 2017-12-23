/**
 * @author Andrew Tomko
 * https://github.com/tomand285/imgToTexture
 *
 * This is a Node.js program for converting all image files in the current dir into one file called textues.js to hold base64 data
 */

var fs = require('fs');
var path = require('path');
 
if (process.argv.length != 2) {
    console.log("Usage: node " + path.basename(__filename));
    process.exit(-1);
}
 
//current directory
var path = ".";
var imgList = new Array();

//JSON data of file types allowed, add new types here.
var mimeType = 	[
					{"ext":"jpg", "mime": "image/jpeg"},
					{"ext":"jpeg", "mime": "image/jpeg"},
					{"ext":"png", "mime": "image/png"},
					{"ext":"gif", "mime": "image/gif"},
				];

/**
 *	Returns the file as a base64 string
 *	@param {string} file - name of file	
 *	@returns {string} string of base64 data
 */
function base64_encode(file){
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap).toString('base64');
}

/**
 *	Returns the index of the JSON object
 *	@param {string} string - extension of the file	
 *	@returns {int} index of JSON object
 */
function indexOfJSON(string){
	for(var i=0;i<mimeType.length;i++){
		if(mimeType[i].ext == string)
			return i;
	}
	return -1;
}
 
/**
 *	Creates an imgList array of all files in directory
 *	@param {string} path - directory to be scanned
 *	@callback {err, files} files - an array of files in the directory
 */
fs.readdir(path, function(err, files) {	
	console.log("Reading Directory...");
    for (var i=0; i<files.length; i++) {
    	if(files[i].indexOf('.') == -1)
    		continue;
    	imgList[i] = new Object();
    	imgList[i].fullName = files[i];
    	imgList[i].name = files[i].split('.')[0];
    	imgList[i].ext = (files[i].split('.')[1]).toLowerCase();
    	imgList[i].base64 = base64_encode(files[i]);
    }
});

//creates a new file called "texture.js" or overwrites existing file
var stream = fs.createWriteStream("textures.js");

/**
 *	Writes to file all the image data
 */
stream.once('open', (fd) => {
	console.log("Writing to file...");
	stream.write("var LoadedImageFiles = LoadedImageFiles || {};\n");
	for(var i=0; i<imgList.length; i++){
		if(indexOfJSON(imgList[i].ext) != -1){
			stream.write("LoadedImageFiles[\""+imgList[i].fullName+"\"] = \"data:"+ mimeType[indexOfJSON(imgList[i].ext)].mime +";base64,"+imgList[i].base64+"\"\n");
			console.log("   LoadedImageFiles[\""+imgList[i].fullName+"\"] is finished");
		}
	}
	stream.end();
	console.log("textures.js is ready");
});