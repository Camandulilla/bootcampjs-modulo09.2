import { validarClave } from "./funciones";
import { commonPasswords } from "./modelo";

const nombreUsuario: string = "Paco";
const clave: string = "";

const comprobacionClave = validarClave(nombreUsuario, clave, commonPasswords);
console.log(comprobacionClave);
