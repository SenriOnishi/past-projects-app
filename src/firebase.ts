import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAh5SLJoJ0NoQfTSsZq-5IqU4InCzX7x7g',
  authDomain: 'past-projects-e7632.firebaseapp.com',
  projectId: 'past-projects-e7632',
  storageBucket: 'past-projects-e7632.appspot.com',
  messagingSenderId: '657373106870',
  appId: '1:657373106870:web:d9f4ace481490b69fe8c17',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
