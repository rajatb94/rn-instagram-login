# rn-instagram-login
Can be easily integrated to perform implicit Instagram authentication including Instagram's Facebook 
login option.
## Installation
Enter it in to the terminal being in the project directory. ```npm install rn-instagram-login 
--save```
## Importing
```js 
var InstagramLogin = require("rn-instagram-login") 
```
## Login and get access token
You can now track which item has just entered the visible area using ``` onCurrentItemChanged``` 
listiner
### example:
```js
	<InstagramLogin
            clientId='CLIENT_ID'
            scopes={['PERMISSION_1', 'PERMISSION_2']}
            redirectUrl='REDIRECT_URL'
            isOpen={isOpenLogin}
            onClosed={()=>{
            	//triggered on close of login page
            }}
            onSuccess={(accessToken)=>{
            	//triggered on successfull login
            }}/>
```
### Props:
#### ```clientId
Client ID provided by Instagram Developer Console.
#### ```scopes```
It must be of type Array and each entry must conatin valid permission name (list of all permissions 
is available in Instagram Developer Docs). e.g. **['public_content', 'follower_list']**
#### ```redirectUrl```
Must be the redirect URL registered in Instagram Developer Settings.
#### ```isOpen```
Must be a Boolean type variable. Whenever you want to open login page, just make its value true.
#### ```onClosed```--- Optional
Must be a function. This would be called once the Login Page is closed. Login page can be closed in 2 
ways. User presses the back key or User is logged in successfully.
#### ```onSuccess```
Must be a function. This would be called with a accessToken parameter once the Login is successfull.
