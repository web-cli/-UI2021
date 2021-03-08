function getidfa(){
	if(window.plus){
		var name = plus.os.name; 
		if(name == 'Android'){
			var imei = plus.storage.getItem('imei');
			return imei;
		}
		if(name == 'iOS'){
			var NSUUID = plus.ios.importClass('NSUUID');  
			var UIDevice = plus.ios.importClass("UIDevice");  
			var currentDevice = UIDevice.currentDevice()  
			var identifierForVendor = currentDevice.identifierForVendor().UUIDString();  

			var ASIdentifierManager = plus.ios.importClass('ASIdentifierManager');  
			var sharedManager = ASIdentifierManager.sharedManager();  
			var IDFA = sharedManager.advertisingIdentifier().UUIDString();  
			console.log('IDFA:'+IDFA);
			return IDFA;
		}
	}
	
	return '';
	
}

function gettype(){
	if(window.plus){
		var name = plus.os.name; 
		if(name == 'Android'){
			return 0;
		}
		if(name == 'iOS'){
			return 1;
		}
	}
	
	return 0;
	
}

function getUrlKey(name,url){
　　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

}
 
export {
	getidfa,
	getUrlKey,
	gettype
}