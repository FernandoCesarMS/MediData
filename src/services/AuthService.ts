import * as firebaseAuth from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default class AuthService {
  register(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Se o registro for bem-sucedido, você pode acessar o usuário assim:
        const user = userCredential.user;
        console.log('Usuário registrado:', user);
        return user;
      })
      .catch(error => {
        // Se houver algum erro durante o registro
        console.error('Erro durante o registro:', error);
        return Promise.reject(error);
      });
  }

  login(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(
      auth, email, password
    ).then(user => {
      console.log(user);
      return user;
    })
      .catch(error => {
        console.log('error', error);
        return Promise.reject(error);
      });
  }

  recoverPassword(email: string) {
    return firebaseAuth.sendPasswordResetEmail(auth, email);
  }
}