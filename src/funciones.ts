import { ValidacionClave } from "./modelo";

// Función para inicializar la validación
const iniciarValidacion = (): ValidacionClave => ({
  esValida: true,
  error: undefined,
});

// Función para agregar un error a la validación
const agregarError = (mensaje: string, validacion: ValidacionClave): void => {
  validacion.esValida = false;
  validacion.error = mensaje;
};

// La clave debe tener mayúsculas y minúsculas.
const tieneMayusculasYMinusculas = (
  clave: string,
  validacion: ValidacionClave
): void => {
  if (!(/[a-z]/.test(clave) && /[A-Z]/.test(clave))) {
    agregarError("La clave debe tener mayúsculas y minúsculas", validacion);
  }
};

// La clave debe tener números.
const tieneNumeros = (clave: string, validacion: ValidacionClave): void => {
  if (!/\d/.test(clave)) {
    agregarError("La clave debe tener números", validacion);
  }
};

// La clave debe tener caracteres especiales (@,#,+, _, ...)
const tieneCaracteresEspeciales = (
  clave: string,
  validacion: ValidacionClave
): void => {
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(clave)) {
    agregarError("La clave debe tener caracteres especiales", validacion);
  }
};

// La clave debe tener una longitud mínima de 8 caracteres.
const tieneLongitudMinima = (
  clave: string,
  validacion: ValidacionClave
): void => {
  if (clave.length < 8) {
    agregarError(
      "La clave debe tener una longitud mínima de 8 caracteres",
      validacion
    );
  }
};

// La clave no debe tener el nombre del usuario.
const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string,
  validacion: ValidacionClave
): void => {
  if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
    agregarError("La clave no debe tener el nombre del usuario", validacion);
  }
};

// La clave no debe contener palabras comunes.
const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[],
  validacion: ValidacionClave
): void => {
  if (
    commonPasswords.some((p) => clave.toLowerCase().includes(p.toLowerCase()))
  ) {
    agregarError("La clave no debe contener palabras comunes", validacion);
  }
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const validacion = iniciarValidacion();

  tieneMayusculasYMinusculas(clave, validacion);
  tieneNumeros(clave, validacion);
  tieneCaracteresEspeciales(clave, validacion);
  tieneLongitudMinima(clave, validacion);
  tieneNombreUsuario(nombreUsuario, clave, validacion);
  tienePalabrasComunes(clave, commonPasswords, validacion);

  return validacion;
};
