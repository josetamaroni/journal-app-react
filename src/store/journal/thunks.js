import { FirebaseDB } from "../../firebase/config"
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./"

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( savingNewNote() );
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        const setDocResp = await setDoc( newDoc, newNote );
        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe')
        console.log({uid})

        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`  );
        const docs = await getDocs( collectionRef );

        const notes = [];
        docs.forEach((doc)=>{
            notes.push({ id: doc.id, ...doc.data() })
        });
        console.log(notes)

        dispatch( setNotes(notes) );
    }
}