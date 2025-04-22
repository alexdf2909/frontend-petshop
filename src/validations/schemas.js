// schemas.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  correo: Yup.string().email('Correo inválido').required('Correo es obligatorio'),
  contrasena: Yup.string().required('Contraseña es obligatoria'),
});

export const registerSchema = Yup.object({
  nombre: Yup.string().required('Nombre obligatorio'),
  correo: Yup.string().email('Correo inválido').required('Correo obligatorio'),
  contrasena: Yup.string()
    .required('Contraseña obligatoria')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[a-z]/, 'Debe contener una minúscula')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/\d/, 'Debe contener un número')
    .matches(/[@$!%*?&]/, 'Debe contener un carácter especial'),
  confirmarContrasena: Yup.string()
    .oneOf([Yup.ref('contrasena')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});