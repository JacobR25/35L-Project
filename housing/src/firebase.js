import { initializeApp } from 'firebase/app';
import {collection, getDocs,getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth"
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_ySNv0_q_bf3sqsS7Bq1mo6Ka0ttjJww",
    authDomain: "l-final-proj.firebaseapp.com",
    databaseURL: "https://l-final-proj-default-rtdb.firebaseio.com",
    projectId: "l-final-proj",
    storageBucket: "l-final-proj.appspot.com",
    messagingSenderId: "900709889315",
    appId: "1:900709889315:web:7714069b42ae875730c896",
    measurementId: "G-2JBEXBMVCQ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export async function getUser(){
    let user = null;
    const users = await getDocs(collection(db,"Users"));
    const authUID = auth.currentUser.uid;
    users.forEach((userIter)=>{
        if(userIter.data().UID === authUID){
            user = userIter.data();
        }
    });
    console.log("User is" + user.UID);
    return user;

}

const test_data = await getDocs(collection(db, "test"));
const snapshot = test_data.docs.map(doc => doc.data());
console.log(snapshot);
export{app,db, auth};