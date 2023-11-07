import React, { useState, useEffect } from 'react';
import * as C from '../App.styles'
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo } from '../services/DatabaseService';
import { useMedplum } from '@medplum/react';
import { Immunization, MedicationRequest, DiagnosticReport } from '@medplum/fhirtypes';

function PatientData() {
    const location = useLocation();
    const { usuario, userId } = location.state;
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const medplum = useMedplum();
    const [vaccines, setVaccines] = useState<Immunization[]>([]);
    const [medications, setMedications] = useState<MedicationRequest[]>([]);
    const [results, setResults] = useState<DiagnosticReport[]>([]);
    const [envios, setEnvios] = useState<String[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await medplum.startClientLogin("b067b74c-3e5c-4aca-99e9-e81005ce21ed", "535171d12e309be55db26d00f338a8558c452cd12be9a08db711ed3fb0f154ac");
                const userInfo = await getUserInfo(userId);
                const usuarioInfo = await getUserInfo(usuario.id);
                setUserName(userInfo.name);
                const id = userId === "f374ee27-7250-4f63-8645-4d8c6cce10b6" ? "2fba52a7-c6c8-424c-a841-a2daa8f36367" : userId;
                const patientId = 'patient=' + id;
                const fetchedVaccines = await medplum.searchResources('Immunization', patientId);
                const fetchedMedication = await medplum.searchResources('MedicationRequest', patientId);
                const fetchedResults = await medplum.searchResources('DiagnosticReport', patientId);

                setVaccines(fetchedVaccines);
                setMedications(fetchedMedication);
                setResults(fetchedResults);
                const paciente = usuarioInfo.pacientes.find(paciente => paciente.id === userId);
                setEnvios(paciente?.info);
            } catch (error) {
                console.error('Erro ao obter o nome do usuário:', error);
            }
        };

        fetchData();
    }, [usuario.id]);

    const configurationNavigate = () => {
        navigate('/medic/config', { state: { usuario } });
    }

    const logoutNavigate = () => {
        navigate('/');
    }

    const homeNavigate = () => {
        navigate('/medic/home', { state: { usuario } });
    }

    return (
        <C.BodyPatientData>
            <C.Title>Paciente {userName}</C.Title>
            <C.Data>
                {envios?.find(envio => envio === "medicacoes") && <C.RegisterFormPatientData>
                    <C.RegisterTitle>Medicações</C.RegisterTitle>
                    <MedicationsList medications={medications} />
                </C.RegisterFormPatientData>}
                {envios?.find(envio => envio === "resultados") && <C.RegisterFormPatientData>
                    <C.RegisterTitle>Resultados Laboratoriais</C.RegisterTitle>
                    <ResultsList results={results} />
                </C.RegisterFormPatientData>}
                {envios?.find(envio => envio === "vacinas") && <C.RegisterFormPatientData>
                    <C.RegisterTitle>Vacinas</C.RegisterTitle>
                    <VaccineList vaccines={vaccines} />
                </C.RegisterFormPatientData>}
            </C.Data>
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
        </C.BodyPatientData>
    );
}

function VaccineList({ vaccines }: { vaccines: Immunization[] }): JSX.Element {
    return (
        <>
            {vaccines.length !== 0 && <C.ContainerPatientData>
                <C.ListPatientsData>
                    {vaccines.map((vaccine) => (
                        <Vaccine key={vaccine.id} vaccine={vaccine} />
                    ))}
                </C.ListPatientsData>
            </C.ContainerPatientData>}
            {vaccines.length === 0 && <C.TitlePatientData>Dados referentes as vacinas não foram encontrados</C.TitlePatientData>}
        </>
    );
}

function Vaccine({ vaccine }: { vaccine: Immunization }): JSX.Element {
    return (
        <C.Vacina>
            <div>
                <b>{vaccine.vaccineCode?.text}</b>
            </div>
            <div>
                Local: {vaccine.location?.display}
            </div>
            <div>
                Data de imunização: {vaccine.occurrenceDateTime}
            </div>
        </C.Vacina>
    );
}

function MedicationsList({ medications }: { medications: MedicationRequest[] }): JSX.Element {
    return (
        <>
            {medications.length !== 0 && <C.ContainerPatientData>
                <C.ListPatientsData>
                    {medications.map((medication) => (
                        <Medication key={medication.id} medication={medication} />
                    ))}
                </C.ListPatientsData>
            </C.ContainerPatientData>
            }
            {medications.length === 0 && <C.TitlePatientData>Dados referentes a medicamentos não foram encontrados</C.TitlePatientData>}
        </>

    );
}

function Medication({ medication }: { medication: MedicationRequest }): JSX.Element {
    return (
        <C.Vacina>
            <div>
                <b>
                    {medication?.medicationCodeableConcept?.text}
                </b>
            </div>
            <div>
                Prescrito por: {medication.requester?.display}
            </div>
        </C.Vacina>
    );
}

function ResultsList({ results }: { results: DiagnosticReport[] }): JSX.Element {
    return (
        <>
            {results.length !== 0 && <C.ContainerPatientData>
                <C.ListPatientsData>
                    {results.map((result) => (
                        <Result key={result.id} result={result} />
                    ))}
                </C.ListPatientsData>
            </C.ContainerPatientData>}
            {results.length === 0 && <C.TitlePatientData>Dados referentes a diagnosticos não foram encontrados</C.TitlePatientData>}
        </>
    );
}

function Result({ result }: { result: DiagnosticReport }): JSX.Element {
    return (
        <C.Vacina>
            <div>
                <b>
                    {result.code?.text}
                </b>
            </div>
            <div>
                Data: {result.meta?.lastUpdated}
            </div>
        </C.Vacina>
    );
}

export default PatientData;
