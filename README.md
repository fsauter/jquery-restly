jquery-restly
=============

A small REST framework/helper for jQuery.

## Declare endpoint

``` javascript
$(function() {
    $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
    $.fn.restly.defaults.resource = 'users';
    // All requests will end at: http://myapidomain/api/v1/users...
});
```

## List Example

``` javascript
$(function() {
    $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
    $.fn.restly.get({
        resource: 'users',
        success: 'doSomethingCoolCallback'
    });
});

function doSomethingCoolCallback(users) {
    $.each(users, function(index, user) {
       //...
    });
}
```

## Get Example

``` javascript
$(function() {
    $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
    $.fn.restly.get({
        resource: 'users',
        'id': 1,
        success: 'doSomethingCoolCallback'
    });
});
```

## Delete Example

``` javascript
$(function() {
    $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
    $.fn.restly.delete({
        resource: 'users',
        'id': 1,
        success: 'doSomethingCoolCallback'
    });
});
```

## Post Example

``` html
<script>
    $(function() {
        $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
        $.fn.restly.post({
            resource: 'users',
            fields: 'nameField,lastNameField' // Will be used as data
            success: 'doSomethingCoolCallback'
        });
    });
</script>
<input name="nameField" value="myName" />
<input name="lastNameField" value="myName" />
```

## Put Example

``` html
<script>
    $(function() {
        $.fn.restly.defaults.endpoint = 'http://myapidomain/api/v1';
        $.fn.restly.post({
            resource: 'users',
            id: 1,
            fields: 'nameField,lastNameField' // Will be used as data
            success: 'doSomethingCoolCallback'
        });
    });
</script>
<input name="nameField" value="myName" />
<input name="lastNameField" value="myName" />
```

## HTML Post Example

``` html
<script>
    $(function() {
        $('button').restly(endpoint: 'http://myapidomain/api/v1');
    });
</script>
<button type="button" class="btn"
        data-method="post"
        data-resource="users"
        data-fields="nameField,lastNameField"
        data-success="aCallbackFunction">
        <i class="icon-trash"></i>
    </button>
<input name="nameField" value="myName" />
<input name="lastNameField" value="myName" />
```

## HTML Advanced Callback example

``` html
<script>
    $(function() {
        $('button').restly(endpoint: 'http://myapidomain/api/v1');
    });
</script>
<button type="button" class="btn"
	data-resource="users"
	data-success="aCallbackFunction"
	data-error="aErrorCallbackFunction">
    <i class="icon-trash"></i>
</button>
```

## HTML Confirm example (using bootbox)

``` html
<script>
    $(function() {
        $('button').restly(endpoint: 'http://myapidomain/api/v1');
    });
</script>
<button type="button" class="btn"
	data-id="1"
	data-confirm="Really?"
	data-method="delete"
	data-resource="users"
	data-success="aCallbackFunction">
    <i class="icon-trash"></i>
</button>
```

## HTML Redirect example

``` html
<script>
    $(function() {
        $('button').restly(endpoint: 'http://myapidomain/api/v1');
    });
</script>
<button type="button" class="btn"
	data-id="1"
	data-method="delete"
	data-resource="users"
	data-redirect="http://google.de">
    <i class="icon-trash"></i>
</button>
```