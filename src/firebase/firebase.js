import firebase from 'firebase';
const config = {
	apiKey: "AIzaSyDWs73DcMpmGoctEAduonhgqND-bhmH5Os",
	authDomain: "reactmovies-6dd7d.firebaseapp.com",
	databaseURL: "https://reactmovies-6dd7d.firebaseio.com",
	projectId: "reactmovies-6dd7d",
	storageBucket: "reactmovies-6dd7d.appspot.com",
	messagingSenderId: "817662408691"
};
export const base = firebase.initializeApp(config);
export const database = firebase.database();
