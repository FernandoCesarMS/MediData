import React, { useState, useEffect, ChangeEvent } from 'react';
import * as C from '../App.styles'
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserName, getAllUsers, updateUserData, updatePatientData } from '../services/DatabaseService';

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
}

function Explanation() {
    const location = useLocation();
    const { usuario } = location.state;
    const [userName, setUserName] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [medics, setMedics] = useState<UserData[] | null>(null);
    const [medicsListName, setMedicsListName] = useState<string[] | null>(null);
    const [selectedMedic, setSelectedMedic] = useState<string>('');
    const [formData, setFormData] = useState({
        idPaciente: '', // Defina o id do paciente conforme necessário
        data: new Date().toISOString().slice(0, 10), // Obtém a data atual no formato 'YYYY-MM-DD'
        selectedCheckboxes: {
            medicacoes: false,
            resultados: false,
            vacinas: false
        }
    });

    const navigate = useNavigate();

    const configurationNavigate = () => {
        navigate('/patient/config', { state: { usuario } });
    }

    const homeNavigate = () => {
        navigate('/patient/home', { state: { usuario } });
    }

    const logoutNavigate = () => {
        navigate('/');
    }

    const sendData = () => {
        const objectMedicSelected = medics && medics.find((user) => user.name === selectedMedic);
        if (objectMedicSelected) {
            formData.idPaciente = objectMedicSelected.id;
        }

        updateUserData(formData.idPaciente,usuario.id, formData.selectedCheckboxes);
        updatePatientData(formData.idPaciente,usuario.id);
        navigate('/patient/home', { state: { usuario } });
    }

    const handleMedicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMedic(event.target.value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            selectedCheckboxes: {
                ...prevData.selectedCheckboxes,
                [name]: checked
            }
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);
            try {
                const name = await getUserName(usuario.id);
                const allUsers = await getAllUsers();
                setMedics(allUsers);
                setMedicsListName(allUsers.map((user) => user.name));
                setUserName(name);
                setShowLoading(false);
            } catch (error) {
                setShowLoading(false);
                console.error('Erro ao obter o nome do usuário:', error);
            }
        };

        fetchData();
    }, [usuario.id]);

    return (
        <C.BodyLogin>
            <C.RegisterForm>
                <C.RegisterTitle>Tipos de Dados</C.RegisterTitle>
                <C.RegisterMessage>
                    Escolha os tipos de dados a serem enviados.
                </C.RegisterMessage>
                <C.MedicList>
                    <C.RadioList>
                        <div className="container">
                            <form>
                                <label>
                                    <input type="checkbox" name="medicacoes" checked={formData.selectedCheckboxes.medicacoes} onChange={handleCheckboxChange} />
                                    <span>Medicações</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="resultados" checked={formData.selectedCheckboxes.resultados} onChange={handleCheckboxChange} />
                                    <span>Resultados</span>
                                </label>
                                <label>
                                    <input type="checkbox" name="vacinas" checked={formData.selectedCheckboxes.vacinas} onChange={handleCheckboxChange} />
                                    <span>Vacinas</span>
                                </label>
                            </form>
                        </div>
                    </C.RadioList>
                </C.MedicList>
                <C.RegisterTitle>Médico</C.RegisterTitle>
                <C.RegisterMessage>
                    Escolha o médico no qual as informações vão ser enviadas.
                </C.RegisterMessage>
                <C.MedicList>
                    <C.RadioList>
                        <div className="container">
                            <form>
                                {medicsListName && medicsListName.map((name) => (
                                    <label>
                                        <input
                                            type="radio"
                                            name="radio"
                                            value={name}
                                            checked={selectedMedic === name}
                                            onChange={handleMedicChange}
                                        />
                                        <span>{name}</span>
                                    </label>
                                ))}
                            </form>
                        </div>
                    </C.RadioList>
                </C.MedicList>
                <C.ButtonSubmit type="button" onClick={sendData}>Enviar</C.ButtonSubmit>
            </C.RegisterForm>
            <C.NavBarButtonContainer>
                <C.NavBarButton onClick={configurationNavigate}>
                    <i className="fa fa-fw fa-gear fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton onClick={homeNavigate}>
                    <i className="fa fa-fw fa-home fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton onClick={logoutNavigate}>
                    <i className="fa fa-fw fa-sign-out fa-2x"></i>
                </C.NavBarButton>
            </C.NavBarButtonContainer>
        </C.BodyLogin>
    );
}

export default Explanation;
