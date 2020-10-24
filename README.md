# AJAX-Javascript-SDK

How it works:

```javascript
// for example
let data = new FormData();
data.append('email', 'asd@asd.com');
data.append('password', 'test');
//
MyObject.api.signup(data, function(successData){
  // promise success
}, function(error){
  //promise errorData
}, null);
//

```
