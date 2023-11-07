import React, { useState, useEffect } from 'react';
import * as C from '../App.styles'
import aluno1 from '../assets/aluno1.png'
import engrenagem from '../assets/engrenagem.png'
import bussola from '../assets/bussola.png'
import { getUserName } from '../services/DatabaseService';
import { useNavigate, useLocation } from 'react-router-dom';

function ConfigMedic() {
    const location = useLocation();
    const { usuario } = location.state;
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const navigate = useNavigate();

    const homeNavigate = () => {
        navigate('/medic/home', { state: { usuario } });
    }

    const logoutNavigate = () => {
        navigate('/');
    }

    useEffect(() => {
        console.log(usuario);
        const fetchData = async () => {
          try {
            const name = await getUserName(usuario.id);
            setUserName(name);
          } catch (error) {
            console.error('Erro ao obter o nome do usuário:', error);
          }
        };
    
        fetchData();
      }, [usuario.id]);

    return (
        <C.ContainerConfig>
            <C.ConfigPatientHeader>
                <img src={aluno1} alt="imagemAluno" />
                <h1>{userName}</h1>
            </C.ConfigPatientHeader>
            <div>
                <C.ConfigPatientModel>
                    <img src={engrenagem} alt="engrenagem" />
                    <div>
                        <h1><b>Configurações da Conta</b></h1>
                    </div>
                </C.ConfigPatientModel>
                <C.ConfigPatientModel>
                    <img src={bussola} alt="bussola" />
                    <div>
                        <h1><b>Política de Privacidade</b></h1>
                    </div>
                </C.ConfigPatientModel>
            </div>
            <C.NavBarButtonContainer>
                <C.NavBarButton>
                    <i className="fa fa-fw fa-gear fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton  onClick={homeNavigate}>
                    <i className="fa fa-fw fa-home fa-2x"></i>
                </C.NavBarButton>
                <C.NavBarButton onClick={logoutNavigate}>
                    <i className="fa fa-fw fa-sign-out fa-2x"></i>
                </C.NavBarButton>
            </C.NavBarButtonContainer>
        </C.ContainerConfig>
    );
}

export default ConfigMedic;
