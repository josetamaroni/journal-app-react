import { useEffect, useMemo, useState } from 'react';

// const formValidations = {
//     email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
//     password: [ (value) => value.length >= 6 , 'El password debe tener más de 6 caracter' ],
//     displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio' ]
// }

export const useForm = ( initialForm = {}, formValidations= {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( initialForm );

    useEffect(() => {
      createValidators();
    }, [formState])
    
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation) ) {
            if ( formValidation[formValue] !== null ) { return false; }
        }
        return true;
    },[formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for ( const formField of Object.keys( formValidations ) ) {
            const [ fn, erroMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : erroMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}