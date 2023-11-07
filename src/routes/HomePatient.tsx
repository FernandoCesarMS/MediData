import React, { useState, useEffect } from 'react';
import * as C from '../App.styles'
import aceno from '../assets/aceno.png';
import remedio from '../assets/remedio.jpg'
import img1 from '../assets/img1.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserName, getUserInfo } from '../services/DatabaseService';
import Loading from '../components/loading/Loading';
import Medic from '../components/medic/Medic';

function HomePatient() {
  const location = useLocation();
  const { usuario } = location.state;
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const [showLoading, setShowLoading] = useState(false);
  const [medics, setMedics] = useState<string[] | null>(null);
  
  const navigate = useNavigate();

  const configurationNavigate = () => {
    navigate('/patient/config', { state: { usuario } });
  }

  const logoutNavigate = () => {
    navigate('/');
  }

  const sendDataNavigate = () => {
    navigate('/patient/send-data', { state: { usuario } });
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const name = await getUserName(usuario.id);
        const userInfo = await getUserInfo(usuario.id);
        setUserName(name);
        setMedics(userInfo.medicos);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        console.error('Erro ao obter o nome do usuário:', error);
      }
    };

    fetchData();
  }, [usuario.id]);

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
      <C.BarraPesquisa>
        <input type="text" placeholder="Procurar médico" />
      </C.BarraPesquisa>
      <div>
        <C.HeaderHistoricoMedico>
          Histórico médico
        </C.HeaderHistoricoMedico>
        <C.ContainerHeaderHistoricoMedico>
          <C.HistoricoMedico>
            <img src={remedio} alt="remedio" />
          </C.HistoricoMedico>
          <C.HistoricoMedico>
            <img src={remedio} alt="remedio" />
          </C.HistoricoMedico>
          <C.HistoricoMedico>
            <img src={remedio} alt="remedio" />
          </C.HistoricoMedico>
          <C.HistoricoMedico>
            <img src={remedio} alt="remedio" />
          </C.HistoricoMedico>
        </C.ContainerHeaderHistoricoMedico>
      </div>
      <C.QuadradoArredondado>
        <img src={img1} alt="img1" />
      </C.QuadradoArredondado>
      <div>
        {medics && <C.HeaderHistoricoMedico>
          Médicos recentes
        </C.HeaderHistoricoMedico>}
        <C.MedicosFavoritos>
          {medics && medics.slice(-3).reverse().map((medic) => (
            <Medic key={medic} id={medic} />
          ))}
        </C.MedicosFavoritos>
      </div>
      <C.CenterButton>
        <C.ButtonSubmitCenter type="button" onClick={sendDataNavigate}>Enviar dados</C.ButtonSubmitCenter>
      </C.CenterButton>
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
      {showLoading && <Loading />}
    </C.Container>
  );
}

export default HomePatient;
