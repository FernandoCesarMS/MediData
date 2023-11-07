import React, { useState, useEffect } from 'react';
import * as C from '../App.styles';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import { addUser } from '../services/DatabaseService';
import { MedplumClient } from '@medplum/core';

type RegisterPageProps = {
    authService: AuthService;
}

function Register(props: RegisterPageProps) {
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [ultimoNome, setUltimoNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailValido, setEmailValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true);
    const [camposValidos, setCamposValidos] = useState(true);
    const [tipoUsuario, setTipoUsuario] = useState('Paciente');
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const medplum = new MedplumClient();

    const validarEmail = (inputEmail: string): boolean => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(inputEmail);
    };

    const loginNavigate = () => {
        navigate('/');
    }

    const handleCadastro = async () => {
        setShowLoading(true);
        const emailEhValido = validarEmail(email);
        const nomeNaoVazio = primeiroNome.trim() !== '';
        const sobrenomeNaoVazio = ultimoNome.trim() !== '';
        const senhaValida = senha.length >= 8;

        if (emailEhValido && nomeNaoVazio && sobrenomeNaoVazio && senhaValida) {
            setEmailValido(true);
            setSenhaValida(true);
            setCamposValidos(true);

            await medplum.startClientLogin("b067b74c-3e5c-4aca-99e9-e81005ce21ed", "535171d12e309be55db26d00f338a8558c452cd12be9a08db711ed3fb0f154ac");
            const patient = await medplum.createResource({
                resourceType: tipoUsuario === 'Paciente' ? 'Patient' : 'Practitioner',
                name: [{
                    given: [primeiroNome],
                    family: ultimoNome
                }],
                id: ''
            });

            console.log(patient.id);
            props.authService.register(email, senha).then(user => {
                addUser(patient.id, email, primeiroNome + " " + ultimoNome, tipoUsuario, user.uid);
                setShowLoading(false);
                navigate('/');
            }).catch(error => {
                setShowLoading(false);
                console.error('Erro durante o registro:', error);
            }
            );
        } else if (!emailEhValido) {
            setEmailValido(false);
        } else if (!senhaValida) {
            setSenhaValida(false);
        } else {
            setCamposValidos(false);
        }
    };

    return (
        <C.BodyLogin>
            {!emailValido && <C.NotificationsContainer>
                <C.ErrorAlert>
                    <C.Flex>
                        <C.FlexShrink>
                            <C.ErrorSvg>
                                <svg
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </C.ErrorSvg>
                        </C.FlexShrink>
                        <C.ErrorPromptContainer>
                            <C.ErrorPromptHeading>Email inválido</C.ErrorPromptHeading>
                        </C.ErrorPromptContainer>
                    </C.Flex>
                </C.ErrorAlert>
            </C.NotificationsContainer>}

            {!senhaValida && <C.NotificationsContainer>
                <C.ErrorAlert>
                    <C.Flex>
                        <C.FlexShrink>
                            <C.ErrorSvg>
                                <svg
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </C.ErrorSvg>
                        </C.FlexShrink>
                        <C.ErrorPromptContainer>
                            <C.ErrorPromptHeading>Senha com menos de 8 caracteres</C.ErrorPromptHeading>
                        </C.ErrorPromptContainer>
                    </C.Flex>
                </C.ErrorAlert>
            </C.NotificationsContainer>}

            {!camposValidos && <C.NotificationsContainer>
                <C.ErrorAlert>
                    <C.Flex>
                        <C.FlexShrink>
                            <C.ErrorSvg>
                                <svg
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </C.ErrorSvg>
                        </C.FlexShrink>
                        <C.ErrorPromptContainer>
                            <C.ErrorPromptHeading>Um ou mais campos estão inválidos</C.ErrorPromptHeading>
                        </C.ErrorPromptContainer>
                    </C.Flex>
                </C.ErrorAlert>
            </C.NotificationsContainer>}


            <C.RegisterForm>
                <C.RegisterTitle>Cadastro</C.RegisterTitle>
                <C.RegisterMessage>
                    Registre-se agora e tenha acesso completo ao nosso aplicativo.
                </C.RegisterMessage>
                <C.RegisterLabel>
                    <input
                        required
                        placeholder=""
                        type="text"
                        className="input"
                        value={primeiroNome}
                        onChange={(e) => setPrimeiroNome(e.target.value)}
                    />
                    <span>Primeiro Nome</span>
                </C.RegisterLabel>

                <C.RegisterLabel>
                    <input
                        required
                        placeholder=""
                        type="text"
                        className="input"
                        value={ultimoNome}
                        onChange={(e) => setUltimoNome(e.target.value)}
                    />
                    <span>Último Nome</span>
                </C.RegisterLabel>

                <C.RegisterLabel>
                    <input
                        required
                        placeholder=""
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>Email</span>
                </C.RegisterLabel>

                <C.RegisterLabel>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <span>Senha</span>
                </C.RegisterLabel>

                <C.RegisterRadioInputs>
                    <C.RegisterRadioTileWithMarginRight>
                        <C.RegisterRadioInput type="radio" name="engine" value="Paciente" checked={tipoUsuario === 'Paciente'} onChange={() => setTipoUsuario('Paciente')} />
                        <C.RegisterRadioTileCheck type="radio" name="engine" checked={tipoUsuario === 'Paciente'} onChange={() => setTipoUsuario('Paciente')} />
                        {/* <C.RegisterRadioTileIcon>
                            <svg
                                stroke="currentColor"
                                xmlSpace="preserve"
                                viewBox="0 0 493.407 493.407"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                fill="none"
                            >
                                <path d="M488.474,270.899c-12.647-37.192-47.527-62.182-86.791-62.182c-5.892,0-11.728,0.749-17.499,1.879l-34.324-100.94 c-1.71-5.014-6.417-8.392-11.721-8.392H315.02c-6.836,0-12.382,5.547-12.382,12.382c0,6.836,5.545,12.381,12.382,12.381h14.252 l12.462,36.645H206.069v-21.998l21.732-2.821c3.353-0.434,6.135-3.079,6.585-6.585c0.54-4.183-2.402-8.013-6.585-8.553l-68.929-8.94 c-1.362-0.168-2.853-0.185-4.281,0c-9.116,1.186-15.55,9.537-14.373,18.653c1.185,9.118,9.537,15.55,18.653,14.364l22.434-2.909 v26.004l-41.255,52.798c-14.059-8.771-30.592-13.93-48.349-13.93C41.135,208.757,0,249.885,0,300.443 c0,50.565,41.135,91.7,91.701,91.7c44.882,0,82.261-32.437,90.113-75.095h33.605v12.647h-5.909c-4.563,0-8.254,3.693-8.254,8.254 c0,4.563,3.691,8.254,8.254,8.254h36.58c4.563,0,8.254-3.691,8.254-8.254c0-4.561-3.691-8.254-8.254-8.254h-5.908v-12.647h5.545 c3.814,0,7.409-1.756,9.755-4.756l95.546-122.267l9.776,28.729c-17.854,8.892-32.444,22.965-41.409,41.168 c-10.825,21.973-12.438,46.842-4.553,70.034c12.662,37.201,47.55,62.189,86.815,62.189c10.021,0,19.951-1.645,29.519-4.9 c23.191-7.885,41.926-24.329,52.744-46.302C494.746,318.966,496.367,294.09,488.474,270.899z M143.46,258.542 c7.698,9.488,12.776,21.014,14.349,33.742h-40.717L143.46,258.542z M91.701,367.379c-36.912,0-66.938-30.026-66.938-66.936 c0-36.904,30.026-66.923,66.938-66.923c12.002,0,23.11,3.427,32.864,8.981l-42.619,54.54c-2.917,3.732-3.448,8.794-1.378,13.05 c2.08,4.256,6.4,6.957,11.134,6.957h64.592C148.861,345.906,122.84,367.379,91.701,367.379z M239.69,292.284h-56.707 c-1.839-20.667-10.586-39.329-23.868-53.782l22.191-28.398v32.47c0,6.836,5.545,12.381,12.381,12.381 c6.836,0,12.382-5.545,12.382-12.381v-55.138h115.553L239.69,292.284z M383.546,285.618l6.384,18.79 c1.75,5.151,6.562,8.392,11.721,8.392c1.321,0,2.667-0.21,3.99-0.661c6.471-2.201,9.93-9.23,7.729-15.711l-6.336-18.637 c7.731,1.838,14.221,7.312,16.855,15.083c2.024,5.94,1.613,12.309-1.161,17.935c-2.773,5.626-7.569,9.835-13.509,11.858 c-12.068,4.078-25.716-2.717-29.785-14.671C376.735,300.055,378.597,291.689,383.546,285.618z M461.712,329.994 c-7.908,16.042-21.579,28.044-38.507,33.808c-6.997,2.378-14.244,3.578-21.547,3.578c-28.664,0-54.129-18.249-63.374-45.399 c-5.757-16.926-4.571-35.081,3.328-51.112c6.047-12.27,15.494-22.112,27.165-28.666l8.981,26.416 c-13.414,10.108-19.644,27.931-13.954,44.691c5.522,16.227,20.732,27.124,37.853,27.124c4.378,0,8.707-0.725,12.882-2.145 c10.108-3.434,18.282-10.607,22.999-20.184c4.723-9.585,5.425-20.435,1.982-30.551c-5.545-16.299-21.57-26.787-38.289-26.818 l-8.997-26.472c3.128-0.453,6.28-0.783,9.448-0.783c28.658,0,54.112,18.242,63.351,45.399 C470.788,295.799,469.613,313.96,461.712,329.994z"></path>
                            </svg>
                        </C.RegisterRadioTileIcon> */}
                        <C.RegisterRadioLabel>Paciente</C.RegisterRadioLabel>
                    </C.RegisterRadioTileWithMarginRight>
                    <C.RegisterRadioTile>
                        <C.RegisterRadioInput type="radio" name="engine" value="Médico" checked={tipoUsuario === 'Médico'} onChange={() => setTipoUsuario('Médico')} />
                        <C.RegisterRadioTileCheck type="radio" name="engine" checked={tipoUsuario === 'Médico'} onChange={() => setTipoUsuario('Médico')} />
                        {/* <C.RegisterRadioTileIcon>
                            <svg
                                stroke="currentColor"
                                xmlSpace="preserve"
                                viewBox="0 0 467.168 467.168"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                fill="none"
                            >
                                <path d="M488.474,270.899c-12.647-37.192-47.527-62.182-86.791-62.182c-5.892,0-11.728,0.749-17.499,1.879l-34.324-100.94 c-1.71-5.014-6.417-8.392-11.721-8.392H315.02c-6.836,0-12.382,5.547-12.382,12.382c0,6.836,5.545,12.381,12.382,12.381h14.252 l12.462,36.645H206.069v-21.998l21.732-2.821c3.353-0.434,6.135-3.079,6.585-6.585c0.54-4.183-2.402-8.013-6.585-8.553l-68.929-8.94 c-1.362-0.168-2.853-0.185-4.281,0c-9.116,1.186-15.55,9.537-14.373,18.653c1.185,9.118,9.537,15.55,18.653,14.364l22.434-2.909 v26.004l-41.255,52.798c-14.059-8.771-30.592-13.93-48.349-13.93C41.135,208.757,0,249.885,0,300.443 c0,50.565,41.135,91.7,91.701,91.7c44.882,0,82.261-32.437,90.113-75.095h33.605v12.647h-5.909c-4.563,0-8.254,3.693-8.254,8.254 c0,4.563,3.691,8.254,8.254,8.254h36.58c4.563,0,8.254-3.691,8.254-8.254c0-4.561-3.691-8.254-8.254-8.254h-5.908v-12.647h5.545 c3.814,0,7.409-1.756,9.755-4.756l95.546-122.267l9.776,28.729c-17.854,8.892-32.444,22.965-41.409,41.168 c-10.825,21.973-12.438,46.842-4.553,70.034c12.662,37.201,47.55,62.189,86.815,62.189c10.021,0,19.951-1.645,29.519-4.9 c23.191-7.885,41.926-24.329,52.744-46.302C494.746,318.966,496.367,294.09,488.474,270.899z M143.46,258.542 c7.698,9.488,12.776,21.014,14.349,33.742h-40.717L143.46,258.542z M91.701,367.379c-36.912,0-66.938-30.026-66.938-66.936 c0-36.904,30.026-66.923,66.938-66.923c12.002,0,23.11,3.427,32.864,8.981l-42.619,54.54c-2.917,3.732-3.448,8.794-1.378,13.05 c2.08,4.256,6.4,6.957,11.134,6.957h64.592C148.861,345.906,122.84,367.379,91.701,367.379z M239.69,292.284h-56.707 c-1.839-20.667-10.586-39.329-23.868-53.782l22.191-28.398v32.47c0,6.836,5.545,12.381,12.381,12.381 c6.836,0,12.382-5.545,12.382-12.381v-55.138h115.553L239.69,292.284z M383.546,285.618l6.384,18.79 c1.75,5.151,6.562,8.392,11.721,8.392c1.321,0,2.667-0.21,3.99-0.661c6.471-2.201,9.93-9.23,7.729-15.711l-6.336-18.637 c7.731,1.838,14.221,7.312,16.855,15.083c2.024,5.94,1.613,12.309-1.161,17.935c-2.773,5.626-7.569,9.835-13.509,11.858 c-12.068,4.078-25.716-2.717-29.785-14.671C376.735,300.055,378.597,291.689,383.546,285.618z M461.712,329.994 c-7.908,16.042-21.579,28.044-38.507,33.808c-6.997,2.378-14.244,3.578-21.547,3.578c-28.664,0-54.129-18.249-63.374-45.399 c-5.757-16.926-4.571-35.081,3.328-51.112c6.047-12.27,15.494-22.112,27.165-28.666l8.981,26.416 c-13.414,10.108-19.644,27.931-13.954,44.691c5.522,16.227,20.732,27.124,37.853,27.124c4.378,0,8.707-0.725,12.882-2.145 c10.108-3.434,18.282-10.607,22.999-20.184c4.723-9.585,5.425-20.435,1.982-30.551c-5.545-16.299-21.57-26.787-38.289-26.818 l-8.997-26.472c3.128-0.453,6.28-0.783,9.448-0.783c28.658,0,54.112,18.242,63.351,45.399 C470.788,295.799,469.613,313.96,461.712,329.994z"></path>

                            </svg>
                        </C.RegisterRadioTileIcon> */}
                        <C.RegisterRadioLabel>Médico</C.RegisterRadioLabel>
                    </C.RegisterRadioTile>
                </C.RegisterRadioInputs>

                <C.ButtonSubmit onClick={handleCadastro}>Cadastrar-se</C.ButtonSubmit>

                <C.P>
                    Já possui uma conta? <C.Span onClick={loginNavigate}>Entre</C.Span>
                </C.P>
                {showLoading && <Loading />}
            </C.RegisterForm>
        </C.BodyLogin>
    );
}

export default Register;
