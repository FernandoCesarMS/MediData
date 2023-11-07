import React, { useState, useEffect } from 'react';
import * as C from '../App.styles'
import aceno from '../assets/aceno.png';
import imagemAluno from '../assets/imagemAluno.png'
import img1 from '../assets/img1.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserName, getUserInfo } from '../services/DatabaseService';
import Patient from '../components/patient/Patient';

interface PacienteData {
    id: string;
    data: string;
}

function HomeMedic() {
    const location = useLocation();
    const { usuario } = location.state;
    const [userName, setUserName] = useState('');
    const [patients, setPatients] = useState<PacienteData[] | null>(null);

    function navigateToPatientData(id: string) {
        navigate('/medic/view-patient-data', { state: { usuario, userId: id } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = await getUserName(usuario.id);
                const userInfo = await getUserInfo(usuario.id);
                setPatients(userInfo.pacientes);
                setUserName(name);
            } catch (error) {
                console.error('Erro ao obter o nome do usuário:', error);
            }
        };

        fetchData();
    }, [usuario.id]);

    const navigate = useNavigate();
    const explanationRoute = () => {
        navigate('/explanation');
    }

    const configurationNavigate = () => {
        navigate('/medic/config', { state: { usuario } });
    }

    const logoutNavigate = () => {
        navigate('/');
    }

    return (
        <C.Container>
            <C.Header>
                <div>
                    <C.Header>
                        <C.HeaderAceno>
                            <img src={aceno} alt="aceno" />
                        </C.HeaderAceno>
                        <C.HeaderHello>
                            Olá!
                        </C.HeaderHello>
                    </C.Header>
                    <C.HeaderName>
                        {userName}
                    </C.HeaderName>
                </div>
            </C.Header>

            <C.QuadradoArredondado>
                <img src={img1} alt="img1" onClick={explanationRoute} />
            </C.QuadradoArredondado>

            <div>
                <C.HeaderHistoricoMedico>
                    Pacientes
                </C.HeaderHistoricoMedico>
                <C.MedicosFavoritos>
                    {patients && patients.map((patient) => {
                        const handlePatientClick = () => navigateToPatientData(patient.id);
                        return (
                            <Patient key={patient.id} id={patient.id} data={patient.data} onClick={handlePatientClick} />
                        );
                    })}
                </C.MedicosFavoritos>
            </div>
            <C.NavBarButtonContainer>
                <C.NavBarButton onClick={configurationNavigate}>
                    <i className="fa fa-fw fa-gear fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton>
                    <i className="fa fa-fw fa-home fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton onClick={logoutNavigate}>
                    <i className="fa fa-fw fa-sign-out fa-2x"></i>
                </C.NavBarButton>
            </C.NavBarButtonContainer>
        </C.Container>
    );
}

export default HomeMedic;
