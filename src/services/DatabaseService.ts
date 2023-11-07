import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from '../FirebaseConfig';

export async function addUser(id: string, email: string, name: string, type: string, uid: string) {
    try {
        await setDoc(doc(firestore, "users", id), {
            id: id,
            uid: uid,
            email: email,
            name: name,
            type: type
        });
        console.log("Documento adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar documento: ", error);
        throw error;
    }
}


export async function getUser(id: string): Promise<string> {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().type;
    } else {
        console.log("No such document!");
        return "Médico";
    }
}

export async function getUserByUid(uid: string): Promise<UserData> {
    try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const medicos: UserData[] = [];

        usersSnapshot.forEach((doc) => {
            const userData = doc.data() as UserData;

            if (userData.uid === uid) {
                medicos.push(userData);
            }
        });

        return medicos[0];
    } catch (error) {
        console.error("Erro ao obter usuários:", error);
        throw error;
    }
}

export async function getUserName(id: string): Promise<string> {
    try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData && userData.name) {
                return userData.name;
            } else {
                throw new Error("Nome de usuário não encontrado.");
            }
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao obter nome do usuário:", error);
        throw error;
    }
}

export async function getMedicList(id: string): Promise<string[]> {
    try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData && userData.name) {
                return userData.medicos;
            } else {
                throw new Error("Nome de usuário não encontrado.");
            }
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao obter nome do usuário:", error);
        throw error;
    }
}

interface PacienteData {
    id: string;
    data: string;
    info: string[];
}

interface UserData {
    email: string;
    name: string;
    type: string;
    pacientes: PacienteData[];
    medicos: string[];
    id: string;
    uid: string;
}


export async function getUserInfo(id: string): Promise<UserData> {
    try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;
            if (userData) {
                return userData;
            } else {
                throw new Error("Dados do usuário não encontrados.");
            }
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
        throw error;
    }
}

export async function getAllUsers(): Promise<UserData[]> {
    try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const medicos: UserData[] = [];

        usersSnapshot.forEach((doc) => {
            const userData = doc.data() as UserData;
            userData.id = doc.id;
            if (userData.type === "Médico") {
                medicos.push(userData);
            }
        });

        return medicos;
    } catch (error) {
        console.error("Erro ao obter usuários:", error);
        throw error;
    }
}
interface FormData {
    vacinas: boolean;
    medicacoes: boolean;
    resultados: boolean;
    [key: string]: boolean;
}

export async function updateUserData(id: string, idPatient: string, formData: FormData): Promise<void> {
    try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;
            console.log(userData);
            
            if (userData) {
                userData.pacientes = userData.pacientes ?? [];
                
                userData.pacientes = userData.pacientes.filter(patient => patient.id !== idPatient);
                
                userData.pacientes.push({
                    id: idPatient, // id do paciente
                    data: new Date().toISOString(), // data atual
                    info: Object.keys(formData).filter((key) => formData[key]) // informações selecionadas
                });

                // Atualize os dados do usuário
                await setDoc(docRef, userData);
                console.log("Dados do usuário atualizados com sucesso!");
            } else {
                throw new Error("Dados do usuário não encontrados.");
            }
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
        throw error;
    }
}

export async function updatePatientData(id: string, idPatient: string): Promise<void> {
    try {
        const docRef = doc(firestore, "users", idPatient);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data() as UserData;
            console.log(userData);
            
            if (userData) {
                userData.medicos = userData.medicos ?? [];
                
                userData.medicos = userData.medicos.filter(medico => medico !== id);

                userData.medicos.push(id);

                // Atualize os dados do usuário
                await setDoc(docRef, userData);
                console.log("Dados do usuário atualizados com sucesso!");
            } else {
                throw new Error("Dados do usuário não encontrados.");
            }
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
        throw error;
    }
}