
/**
 *  MyObject.js
 *  Allan Nava 2020-09-15
 *  Allan Nava 2020-09-15
 *
 *  Created by [ Allan Nava ].
 *  Updated by [ Allan Nava ]
 *  Copyright © 2020 [ Allan Nava ]. All rights reserved.
 *  *  
*/
window.MyObject = {
	api_url: apiUrl,
	get: function( url, p, callback, obj, headers ) {
		var params = Object.keys( p ).map( function( k ) {
			return encodeURIComponent( k ) + '=' + encodeURIComponent( p[ k ] )
		} ).join( '&' );
		var http = new XMLHttpRequest();
		http.open( "GET", url + "?" + params, true );
		http.onreadystatechange = function() {
			if ( http.readyState == 4 && http.status == 200 ) {
				if ( obj ) {
					callback( obj, JSON.parse( http.responseText ) );
				} else {
					callback( JSON.parse( http.responseText ) );
				}
			}
		}
		http.send( null );
	},
	postForm: function( url, p, callback, obj, headers , errorCallback ) {
		var http = new XMLHttpRequest();
		var params = Object.keys( p ).map( function( k ) {
			return encodeURIComponent( k ) + '=' + encodeURIComponent( p[ k ] )
		} ).join( '&' );
		var formData = params;
		http.onreadystatechange = function() {
			if ( http.readyState == 4 && http.status == 200 || http.readyState == 4 && http.status == 206 ) {
				try {
					if ( obj ) {
						callback( obj, JSON.parse( http.responseText ) );
					} else {
						callback( JSON.parse( http.responseText ) );
					}
				} catch ( e ) {
					if ( obj ) {
						callback( obj, http.responseText );
					} else {
						callback( http.responseText );
					}
				}
			} else {
				if ( errorCallback ) {
					errorCallback( http )
				}
			}
		}
		http.open( "POST", url );
		http.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		if ( headers ) {
			for ( k in headers ) {
				http.setRequestHeader( k, headers[ k ] );
			}
		}
		http.send( formData );
	},
	postJson: function( url, p, callback, obj, headers ) {
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if ( http.readyState == 4 && http.status == 200 ) {
				if ( obj ) {
					callback( obj, JSON.parse( http.responseText ) );
				} else {
					callback( JSON.parse( http.responseText ) );
				}
			}
		}
		http.open( "POST", url );
		if ( obj ) {
			if ( obj.AccessToken ) {
				http.setRequestHeader( "Authorization", "Bearer " + obj.AccessToken );
				//console.log("accessed");
			}
		}
		http.setRequestHeader( "Content-Type", "application/json" );
		if ( headers ) {
			for ( k in headers ) {
				http.setRequestHeader( k, headers[ k ] );
			}
		}
		http.send( JSON.stringify( p ) );
	},
	post: function( url, p, callback, obj, headers, progress, errorCallback ) {
		var http = new XMLHttpRequest();
		var formData = new FormData();
		for ( k in p ) {
			formData.append( k, p[ k ] );
		}
		http.onreadystatechange = function() {
			if ( http.readyState == 4 ) {
				if ( http.status == 200 ) {
					if ( progress ) {
						obj.progress = 100;
						obj.done = true;
						obj.message = "Upload completed. The result will be sent to the provided sftp storage."
					}
					//console.log( http.responseText );
					if ( obj ) {
						callback( obj, JSON.parse( http.responseText ) );
					} else {
						callback( JSON.parse( http.responseText ) );
					}
				} else {
					if ( errorCallback ) {
						errorCallback( http.status )
					}
				}
			}
		}
		if ( progress ) {
			http.upload.onprogress = function( e ) {
				var done = e.position || e.loaded,
					total = e.totalSize || e.total
				var present = Math.floor( done / total * 98 )
				obj.progress = present;
			}
		}
		http.open( "POST", url );
		if ( headers ) {
			for ( k in headers ) {
				http.setRequestHeader( k, headers[ k ] );
			}
			http.send( formData );
		} else {
			http.send( formData );
		}
	},
}

