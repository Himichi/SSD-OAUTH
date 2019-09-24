$(document).ready(function(){
    
    const urlParams = new URLSearchParams(window.location.search);
	
    const code = urlParams.get('code');
    const redirectUri = "http://localhost/oauth/upload.html" 
    const scope = "https://www.googleapis.com/auth/drive";
    var access_token= "";
	
    var clientId = "772943993552-r9g625mejovg478ofi73ma5ft3eh3f4c.apps.googleusercontent.com"
    const clientSecret = "bbVYPPa1h06z7B-H8sgOwvFv";

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {
			code:code,
            redirect_uri:redirectUri,
            client_secret:clientSecret,
			client_id:clientId,
			scope:scope,
			grant_type:"authorization_code"
			},
        dataType: "json",
		
        success: function(data) {
 
           localStorage.setItem("accessToken",data.access_token);
           localStorage.setItem("refreshToken",data.refreshToken);
           localStorage.setItem("expires_in",data.expires_in);
           
        }
  });

	
    var Upload = function (file) {
        this.file = file;
    };
    
   
     Upload.prototype.getFileSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    }; 
    Upload.prototype.getFileName = function() {
        return this.file.name;
    };
    Upload.prototype.uploadFile = function () {
        var that = this;
        var form_data = new FormData();
  
        form_data.append("file", this.file, this.getFileName());
        form_data.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };   
    $("#confirm").on("click", function (e) {
        var file = $("#fileSec")[0].files[0];
        var upload = new Upload(file);

        upload.uploadFile();
    });
    
});
