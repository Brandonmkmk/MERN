
import axios from "./axios"


/*user se va a pasar como segundo valor, que es el cuerpo de la solicitud, que practicamente 
son los valores de los inputs del formulario, cuando se use esta funcion se registraran los usuarios*/
export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user)=> axios.post(`/login`,user)

/*Funcion para verificar el token del usuario*/
export const verifyTokenRequest = ()=>axios.get('/verify')
