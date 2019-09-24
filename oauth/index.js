$(document).ready(function(){
     
     var clientId = "772943993552-r9g625mejovg478ofi73ma5ft3eh3f4c.apps.googleusercontent.com";
     var redirect_uri = "http://localhost/oauth/upload.html";
     var scope = "https://www.googleapis.com/auth/drive";
     var url = "";

	 
     $("#uploadButton").click(function(){
        signIn(clientId,redirect_uri,scope,url);
     });

	 
     function signIn(clientId,redirect_uri,scope,url){
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri +
		"&prompt=consent&response_type=code&client_id="+clientId+
		"&scope="+scope +
		"&access_type=offline";
		
        window.location = url;
     }

});

