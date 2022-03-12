const fs = require('fs');
const path = require('path');
String.prototype.replaceAll = function(s1,s2){    
	return this.replace(new RegExp(s1,'gm'),s2);    
};
console.log('Start processing...');

listFile(process.cwd());

function listFile(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err);
		} else {
			files.forEach(function (filename) {
				var filedir = path.join(filePath, filename);
				fs.stat(filedir, function (eror, stats) {
					if (eror) {
						console.warn('Cannot get stat of file: ' + filedir);
					} else {
						var isFile = stats.isFile();
						var isDir = stats.isDirectory();
						if (isFile) {
							if (filedir.match(/.git|.github|.vscode/) == null) {
								if (
									filedir
										.replace('phigros-html5', 'ph5')
										.match(/html|js|css/) != null &&
									filedir.match('cfDeploy.js') == null
								) {
									const fileData = fs
										.readFileSync(filedir)
										.toString();
									if (
										fileData.includes(
											'https://charts.phicommunity.com.cn/'
										)
									) {
										console.log(
											'Processing file:',
											filedir
										);
										fs.writeFileSync(
											filedir,
											fileData.toString().replaceAll(
												'https://charts.phicommunity.com.cn/',
												'https://vercel.charts.phicommunity.com.cn/'
											)
										);
									}
								}
							}
						}
						if (isDir) {
							if (filedir.match(/.git|.github|.vscode/) == null) {
								listFile(filedir);
							}
						}
					}
				});
			});
		}
	});
}
