import { FirebaseDB } from "../../firebase/config"
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./"
import { fileUpload, deleteImgs } from "../../helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( savingNewNote() );
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
            imageIds: []
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );
        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe')

        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`  );
        const docs = await getDocs( collectionRef );

        const notes = [];
        docs.forEach((doc)=>{
            notes.push({ id: doc.id, ...doc.data() })
        });

        dispatch( setNotes(notes) );
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc(docRef, noteToFireStore, {merge:true})

        dispatch( updateNote(note) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // Para subir todas las imagenes al mismo tiempo uso Promesas
        // En el array guardo todas las funciones y luego hago el disparo con Promise.all()
        // Hasta que no se resuelvan todas las promesas no retorna la respuesta
        // const fileUploadPromises = [];
        const filesUrls = [];
        const imagesIds = [];
        for (const file of files) {
            const { secure_url, public_id } = await fileUpload(file);
            filesUrls.push(secure_url);
            imagesIds.push(public_id);
            // fileUploadPromises.push( fileUpload( file ) );
        }
        // const photoUrls = await Promise.all(fileUploadPromises);

        // dispatch( setPhotosToActiveNote( photoUrls ) );
        dispatch( setPhotosToActiveNote( {"imageUrls":filesUrls,"imageIds":imagesIds} ) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc(docRef);

        dispatch( deleteNoteById(note.id) );
    }
}

export const startDeletingImages = () => {
    return async ( dispatch, getState ) => {
        const {  active: note } = getState().journal;
        for ( const imgId of note.imageIds ) {
            await deleteImgs( imgId )
        }
    }
}