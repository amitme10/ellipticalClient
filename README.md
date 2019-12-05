# ellipticalClient
This is the client side of the application (the server side is implemnted by NodeJS connecting to Google Firebase and can be found in my profile)

# Navigation

Under the folder *navigation* we can see the file *AppNavigator.js* that defines SwitchNavigator
that using the HomeStack form *MainTabNavigator.js* which defines the specified routes.
and will bring the ability to move between screens at every part in the program.
as we can see (in its configuration) the initail route is *LoadingScreen*

# LoadingScreen.js

When we open the app this screen will try to validate if the user is signed in, if so it will take it to the app (to the screen *Main*)
which means it will let the user get in the app.
Otherwise it  will take the user to a *SignUp* page .

# SignUp.js

At this page we will use the abilties of FIrebase authentication system to sign up a new user
Or we will transform the user to the loging in page *LoginScreen* to validate wheather  he already has an account .

# Main.js

The main page of the app 
config
