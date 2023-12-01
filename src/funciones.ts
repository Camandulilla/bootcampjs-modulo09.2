import { ValidacionClave } from "./modelo";

//Nos aseguramos que esta definido antes de usarlo
const validacion: ValidacionClave = {
  esValida: false,
  error: undefined,
};

//La clave debe de tener mayúsculas y minúsculas.
//PODEMOS REFACTORIZAR LAS CONDICIONES DEL IF PONIENDO !(NOT) EN AMBOS .TEST Y CAMBIAR EL esValida A TRUE ARRIBA
const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  if (/[a-z]/.test(clave) && /[A-Z]/.test(clave)) {
    validacion.esValida = true;
  } else {
    validacion.error = "La clave debe de tener mayúsculas y minúsculas";
  }
  return validacion;
};

//La clave debe de tener números.
const tieneNumeros = (clave: string): ValidacionClave => {
  if (/\d/.test(clave)) {
    validacion.esValida = true;
  } else {
    validacion.error = "La clave debe de tener números";
  }
  return validacion;
};

//La clave debe de tener caracteres especiales (@,#,+, _, ...)
const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  if (/[!@#$%^&*(),.?":{}|<>]/.test(clave)) {
    validacion.esValida = true;
  } else {
    validacion.error = "La clave debe de tener caracteres especiales";
  }
  return validacion;
};

//La clave debe de tener una longitud mínima de 8 caracteres.
const tieneLongitudMinima = (clave: string): ValidacionClave => {
  if (clave.length >= 8) {
    validacion.esValida = true;
  } else {
    validacion.error =
      "La clave debe de tener una longitud mínima de 8 caracteres";
  }
  return validacion;
};

//La clave no debe tener el nombre del usuario.
const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): ValidacionClave => {
  if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
    validacion.error = "La clave no debe tener el nombre del usuario";
  } else {
    validacion.esValida = true;
  }
  return validacion;
};

//La clave no debe de contener palabras comunes (le pasaremos un array de palabras comunes).
const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const comprobacion: boolean = commonPasswords.some((p) => {
    clave.toLowerCase().includes(p);
  });

  if (comprobacion) {
    validacion.error = "La clave no debe de contener palabras comunes";
  } else {
    validacion.esValida = true;
  }

  return validacion;
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  validacion.esValida = false;
  validacion.error = undefined;

  tieneMayusculasYMinusculas(clave);
  tieneNumeros(clave);
  tieneCaracteresEspeciales(clave);
  tieneLongitudMinima(clave);
  tieneNombreUsuario(nombreUsuario, clave);
  tienePalabrasComunes(clave, commonPasswords);

  return validacion;
};
