import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCR1AYbrkMCiBuSCbNpXuS1QFJstO1Bwc8',
  authDomain: 'commentup-prod.firebaseapp.com',
  projectId: 'commentup-prod',
  storageBucket: 'commentup-prod.appspot.com',
  messagingSenderId: '708476305260',
  appId: '1:708476305260:web:8c29e38c8c66d4297e3d49',
  measurementId: 'G-Z1M1GRP71G',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, storage };
