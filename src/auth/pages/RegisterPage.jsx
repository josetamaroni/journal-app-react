import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// import GoogleIcon from '@mui/icons-material/Google';

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks';
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
  password: [ (value) => value.length >= 6 , 'El password debe tener más de 6 caracter' ],
  displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {
  const dispatch =  useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector( state => state.auth );
  const isChekingAuthentication = useMemo( ()=> status === 'checking', [status] ); // Esto es para deshabilitar el botón
  const { formState, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid } = useForm({ email: '', password: '', displayName: '' }, formValidations );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if( !isFormValid ){ return; }
    // console.log( formState )
    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }
  return (
    <AuthLayout title='Crear cuenta'>
      {/* <h2>FormValid: { isFormValid ? 'Válido' : 'Incorrecto' }</h2> */}
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Nombre completo"
              type='text'
              name='displayName'
              onChange={onInputChange}
              placeholder='Nombre completo'
              fullWidth 
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }/>
          </Grid>
          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Correo"
              type='email'
              name='email'
              onChange={onInputChange}
              placeholder='correo@google.com'
              fullWidth 
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }/>
          </Grid>
          <Grid item xs={12} sx={{ mt:2 }}>
            <TextField
              label="Contraseña"
              type='password'
              name='password'
              onChange={onInputChange}
              placeholder='Contraseña'
              fullWidth autoComplete='false'
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }/>
          </Grid>

          <Grid container spacing={2} sx={{mb:2,mt:1}}>
            <Grid display={ !!errorMessage ? '' : 'none' } item xs={12} sm={12}>
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>          

            <Grid item xs={12} sm={12}>
              <Button disabled = { isChekingAuthentication } type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
