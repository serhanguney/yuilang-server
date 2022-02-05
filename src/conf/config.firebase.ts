import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export let app;
export let db;
export let auth;

export async function startFirebase() {
	app = await initializeApp(firebaseConfig);
	db = getFirestore(app);
	auth = getAuth();
}

type TypeLiterals = 'word' | 'sentence';

interface PhraseModel {
	phrase: string;
	inEnglish: string;
	practiceCount: number;
	type: TypeLiterals;
	dateAdded: Date | null;
}
export interface PhraseType {
	[uuid: string]: PhraseModel;
}
export interface CategoryType {
	[key: string]: {
		phrases: PhraseType | {};
		practiceCount: number;
	};
}

export interface DatabaseModel {
	categories: CategoryType;
	practiceCount: number;
}
