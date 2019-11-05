import Firebase from 'firebase';
let config = {
    apiKey: 'AIzaSyAgwUK7-jO5Lbln1COw39gG_Lxhka3NWLk',
    authDomain: 'helpital-1278a.firebaseapp.com',
    databaseURL: 'https://helpital-1278a.firebaseio.com',
    projectId: 'helpital-1278a',
    storageBucket: 'helpital-1278a.appspot.com',
    messagingSenderId: '260720885799',
};
let app = Firebase.initializeApp(config);
export const db = app;