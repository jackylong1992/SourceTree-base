function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
                // console.log(e.target.result);
                initializeTodayFood(e.target.result);

				// console.log('e readAsText = ', e);
                // console.log('e readAsText target = ', e.target);

                
				// try {
				// 	json = JSON.parse(e.target.result);
				// 	alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
				// } catch (ex) {
				// 	alert('ex when trying to parse json = ' + ex);
				// }
			}
		})(f);
		reader.readAsText(f);
	}

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);