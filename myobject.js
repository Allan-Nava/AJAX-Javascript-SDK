/**
 *  MyObject.js
 *  Allan Nava 2020-09-15
 *  Allan Nava 2020-09-15
 *
 *  Created by [ Allan Nava ].
 *  Updated by [ Allan Nava ]
 *  Copyright © 2020 [ Allan Nava ]. All rights reserved.
 * 
 * 
 *  Required JQuery + JQuery cookie
 *  
*/
let MyObject = {
  refresh: false,
  api_url: window.base_api_url != "" ? window.api_url : "https://api.url.it/api/v1/en",
  ajax: {
        post: function( url, data, callback, errorCallback, button, custom_config) {
            if (button){
                var buttonText = button.html();
            }
            var headers = {}
            if ($.cookie("access_token")){
                headers = {
                    "Authorization": "Bearer " + $.cookie("access_token")
                }
            }

            var config =  {
                type: "POST",
                url: url,
                data: data,
                headers: headers,
                beforeSend: function(){
                    if (button){
                        button.attr("disabled", "disabled");
                        button.html('<i class="fas fa-spinner rotating"></i>')
                    }
                },
                success: function( data ,status, request) {
                    if (request.getResponseHeader("last-modified") == "true"){
                        if (!MyObject.refresh){
                            MyObject.refresh = true
                            MyObject.ajax.post(window.base_api_url + "/api/v1/refresh", {"token": $.cookie("refresh_token")}, function(data){
                                if (data.success){
                                    var access_token = data.data.access_token;
                                    var refresh_token = data.data.refresh_token;
                                    $.cookie("access_token", access_token, {"path": "/"})
                                    $.cookie("refresh_token", refresh_token, {"path": "/"})
                                }
                            }, function(a,s,d){
                                console.log(a)
                                console.log(s)
                                console.log(d)
                            }, null, {"dataType": "json"})
                        }
                    }
                    if ( callback ) {
                        callback( data )
                    } else {
                        console.log( data );
                    }
                },
                error: function( a,s,d ) {
                    if ( errorCallback ) {
                        errorCallback( a, s, d )
                    } else {
                        console.log(a);
                        console.log(s);
                        console.log(d);
                    }
                },
                complete: function(){
                    if (button){
                        button.removeAttr("disabled");
                        button.html(buttonText)
                    }
                }
            }
            if (custom_config){
                $.extend(config, custom_config)
            }
            $.ajax(config)
        },
        get: function( url, data, callback, errorCallback, button, custom_config ){
            if (button){
                var buttonText = button.html();
            }

            var headers = {}
            if ($.cookie("access_token")){
                headers = {
                    "Authorization": "Bearer " + $.cookie("access_token")
                }
            }

            var config = {
                type: "GET",
                url: url,
                headers: headers,
                data: data,
                beforeSend: function(){
                    if (button){
                        button.attr("disabled", "disabled");
                        button.html('<i class="fas fa-spinner rotating"></i>')
                    }
                },
                success: function( data, status, request ) {
                    
                    if (request.getResponseHeader("last-modified") == "true"){
                        if (!MyObject.refresh){
                            MyObject.refresh = true
                            MyObject.ajax.post(window.base_api_url + "/api/v1/refresh", {"token": $.cookie("refresh_token")}, function(data){
                                if (data.success){
                                    var access_token = data.data.access_token;
                                    var refresh_token = data.data.refresh_token;
                                    $.cookie("access_token", access_token, {"path": "/"})
                                    $.cookie("refresh_token", refresh_token, {"path": "/"})
                                }
                            }, function(a,s,d){
                                console.log(a)
                                console.log(s)
                                console.log(d)
                            }, null, {"dataType": "json"})
                        }
                    }
                    if ( callback ) {
                        callback( data )
                    }
                },
                error: function( a, s, d ) {
                    if ( errorCallback ) {
                        errorCallback( a )
                    } else {
                        console.log( a );
                        console.log( s );
                        console.log( d );
                    }
                },
                complete: function(){
                    if (button){
                        button.removeAttr('disabled');
                        button.html(buttonText);
                    }
                }
            }
            if (custom_config){
                $.extend(config, custom_config)
            }
            
            $.ajax(config)
        },   
    },
    api: {
        /**  registration */
        signup: function(data,callback,errorCallback,button){
            //console.log(data);
            if (typeof(errorCallback) === undefined){
                var errorCallback = function(a,s,d){
                    console.log(a,s,d);
                }
            }
            MyObject.ajax.post(window.base_url + "/api/auth-register/", data, callback, errorCallback, button);
        },
        /**  login */
        login: function(data,callback,errorCallback,button){
            //console.log(data);
            if (typeof(errorCallback) === undefined){
                var errorCallback = function(a,s,d){
                    console.log(a,s,d);
                }
            }
            MyObject.ajax.post(window.base_url + "/api/auth-login/", data, callback, errorCallback, button);
        },
    }
  //
}
//
