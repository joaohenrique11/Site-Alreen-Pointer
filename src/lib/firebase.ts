import admin from 'firebase-admin';
import serviceAccount from '../../firebase-admin.json';

// Inicializa o Firebase apenas se ainda não estiver inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    // O 'as any' ajuda a evitar problemas de tipagem com o arquivo JSON importado
    credential: admin.credential.cert(serviceAccount as any),
  });
  console.log('[Firebase] Inicializado com sucesso!');
}

export const db = admin.firestore();
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;