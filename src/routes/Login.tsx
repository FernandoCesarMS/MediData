import * as C from '../App.styles'
import React, { useState, ChangeEvent } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import logotype from '../assets/logotype.png'
import { getUser, getUserByUid } from '../services/DatabaseService';

type LoginPageProps = {
    authService: AuthService;
}

const Login = (props: LoginPageProps) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const login = async () => {
        setShowLoading(true);

        try {
            const user = await props.authService.login(form.email, form.password);
            const geted = await getUserByUid(user.user.uid);
            setShowLoading(false);

            const usuario = {
                id: geted.id,
                email: geted.email ?? "",
                type: geted.type,
            };

            console.log(user);
            console.log(geted);
            
            if (usuario.type === "Médico") {
                navigate('/medic/home', { state: { usuario } });
            } else if (usuario.type === "Paciente") {
                navigate('/patient/home', { state: { usuario } });
            } else {
                navigate('/', { state: { usuario } });
            }

        } catch (error) {
            setShowLoading(false);
            setError(error);
        }
    }

    const register = () => {
        navigate('/register');
    }

    const recoverPassword = () => {
        setShowLoading(true);
        props.authService.recoverPassword(
            form.email
        ).then(() => {
            setShowRecoverPasswordMessage(true);
            setShowLoading(false);
        })
    }

    const navigate = useNavigate();

    const [error, setError] = useState(null as any);
    const [showLoading, setShowLoading] = useState(false);
    const [showRecoverPasswordMessage, setShowRecoverPasswordMessage] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        const isValid = validateEmail(email);
        setIsEmailValid(isValid);
        setForm({
            ...form,
            email: email,
        });
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setIsPasswordValid(validatePassword(newPassword));
        setForm({
            ...form,
            password: newPassword,
        });
    };
    return (
        <C.BodyLogin>
            <C.ImagemLogin>
                <img src={logotype} alt="logotype" />
            </C.ImagemLogin>
            <C.Form>
                <C.RegisterTitle>Login</C.RegisterTitle>
                <C.RegisterMessage>
                    Entre na sua conta para acessar todas as funcionalidades do nosso aplicativo.
                </C.RegisterMessage>
                <C.FlexColumn>
                    <label>Email</label>
                </C.FlexColumn>
                <C.InputForm>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                    <C.Input placeholder="Insira o seu email" type="text" value={form.email} onChange={handleEmailChange} />
                </C.InputForm>

                <C.FlexColumn>
                    <label>Senha</label>
                </C.FlexColumn>
                <C.InputForm>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                    <C.Input placeholder="Insira a sua senha" type="password" value={form.password} onChange={handlePasswordChange} />
                </C.InputForm>

                <C.FlexRow>
                    <div>
                        <input type="radio" />
                        <label>Lembrar-me</label>
                    </div>
                    <C.Span onClick={recoverPassword}>Esqueceu sua senha?</C.Span>
                </C.FlexRow>

                <C.ButtonSubmit type="button" onClick={login}>Entrar</C.ButtonSubmit>

                <C.P>
                    Não tem uma conta? <C.Span onClick={register}>Cadastre-se</C.Span>
                </C.P>
                {showLoading && <Loading />}
                {showRecoverPasswordMessage && <C.NotificationsContainer>
                    <C.SuccessAlert>
                        <C.Flex>
                            <C.FlexShrink>
                                <C.SuccessSvg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </C.SuccessSvg>
                            </C.FlexShrink>
                            <C.ErrorPromptContainer>
                                <C.SuccessPromptHeading>Verifique sua caixa de email</C.SuccessPromptHeading>
                            </C.ErrorPromptContainer>
                        </C.Flex>
                    </C.SuccessAlert>
                </C.NotificationsContainer>}

            </C.Form>
        </C.BodyLogin>
    );
};

export default Login;
