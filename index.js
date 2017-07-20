var fs = require("fs");
var path = require("path");
var Remarkable = require('remarkable');
var md = new Remarkable('full');
var root = path.join(__dirname+'/markdown')

readDirSync(root)
function readDirSync(path){
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)	
		if(info.isDirectory()){			
			readDirSync(path+"/"+ele);
		}else{
			//console.log("file: "+ele)
			var file_name = ele;
			if (file_name.substr(file_name.length - 3) === ".md") {
				console.log("File: " + file_name + " found!");            
				var txt = fs.readFileSync(path+"/"+file_name);
				fs.writeFileSync(
					 path+"/"+file_name.substr(0,file_name.length - 3) + ".html",
					md.render(txt.toString()));
				console.log("File: " + 
						file_name.substr(0,file_name.length - 3) + 
						".html" + " Write Success!\n")
			}
		}	
	})
}