import styled, { keyframes , css} from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const fadeAndSlideLeft = css`
  animation: ${fadeIn} 0.3s ease-in-out, ${slideInLeft} 0.3s ease-in-out;
`;


export const fadeAndSlideRight = css`
  animation: ${fadeIn} 0.3s ease-in-out, ${slideInRight} 0.3s ease-in-out;
`;

export const Container = styled.div`
    width: 100vw !important;
    height: 110vh !important;
    font-family: 'Nunito Sans', sans-serif;
    padding: 10px;
    background: linear-gradient(to top, #ffffff, #e1f4f6); /* Cor de fundo do corpo */
    ${fadeAndSlideRight}; /* Aplica fadeIn e slideInRight à tela HomePatient */
`;

export const ContainerConfig = styled.div`
    width: 100vw !important;
    height: 110vh !important;
    font-family: 'Nunito Sans', sans-serif;
    padding: 10px;
    background: linear-gradient(to top, #ffffff, #e1f4f6); /* Cor de fundo do corpo */
    ${fadeAndSlideLeft}; /* Aplica fadeIn e slideInLeft à tela ConfigPatient */
  `;

export const Header = styled.div`
    display: flex;
`;

export const HeaderAceno = styled.div`
    width: 20px;
    height: 20px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        margin-top: -10px;
    }
`;

export const HeaderAcenoImagem = styled.div`
    width: 100%;
    height: 100%;
    margin-top: -10px;
`;

export const HeaderHello = styled.div`
    font-size: 14px;
    font-weight: 700;
    margin-left: 5px;
`;

export const HeaderName = styled.div`
    font-size: 28px;
    font-weight: 700;
`;

export const HeaderAluno = styled.div`
    width: 50%;
    overflow: hidden;
    img {
        width: 55px;
        height: 55px;
        float: right;
        border-radius: 20px;
        border: 1px solid black;
        cursor: pointer;
    }
`;

export const BarraPesquisa = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    background-color: #EEF6FC;
    border-radius: 20px;
    padding: 5px;
    position: relative;

    input {
        padding: 8px;
        padding-left: 30px; /* Ajuste o valor conforme necessário */
        width: 100%;
        border: none;
        background-color: #EEF6FC;
        border-radius: 10px;
      }
`;

export const HeaderHistoricoMedico = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const ContainerHeaderHistoricoMedico = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const HistoricoMedico = styled.div`
    overflow: hidden;

     img {
        width: 75px;
        height: 75px;
        border-radius: 20px;
        cursor: pointer;
    }
`;

export const QuadradoArredondado = styled.div`
    width: 90vw;
    height: 200px;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 20px;

    img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`;

export const MedicosFavoritos = styled.div`

`;

export const MedicoFavorito = styled.div`
    background-color: #ffffff;
    width: 90vw;
    height: 90px;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 1.5vh;
    cursor: pointer;
    
    img {
        width: 70px;
        height: 75%;
        border-radius: 20px;
        cursor: pointer;
    };

    h1 {
        margin-top: 10px;
        font-size: 20px;
        margin-left: 20px;
    };

    h2 {
        margin-top: -5px;
        font-size: 14px;
        margin-left: 20px;
    };
`;

export const FavoritePatient = styled.div`
    background-color: #ffffff;
    width: 90vw;
    height: 90px;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 1.5vh;
    
    img {
        width: 70px;
        height: 75%;
        border-radius: 20px;
        cursor: pointer;
    };

    h1 {
        margin-top: 10px;
        font-size: 20px;
        margin-left: 20px;
    };

    h2 {
        margin-top: -5px;
        font-size: 14px;
        margin-left: 20px;
    };
`;

export const ConfigPatientHeader = styled.div`
    margin-top: 150px;
    margin-bottom: 20px;
    text-align: center;
    overflow: hidden;

    img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        cursor: pointer;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    h1 {
        margin-top: 10px;
        font-size: 28px;
        font-weight: 700;
    }
`;

export const ConfigPatientModel = styled.div`
    width: 90%;
    height: 60px;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 20px;
        cursor: pointer;
    }

    h1 {
        margin-top: 10px;
        font-size: 18px;
        margin-left: 20px;
    }
`;

export const Body = styled.div`
    margin: auto;
    max-width: 980px;
    margin-bottom: 50px;
`;

export const Form = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #e1f4f6;
  width: 80vw; /* Alterado para ocupar a largura total */
  border-radius: 20px;
  padding: 5%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  button {
    align-self: flex-end;
  }

  &::placeholder {
    font-family: inherit;
  }
`;

export const InputForm = styled.div`
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  width: 90%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;

  &:focus-within {
    border: 1.5px solid #2d79f3;
  }
`;

export const Input = styled.input`
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;

  > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
`;

export const Span = styled.span`
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
`;

export const ButtonSubmit = styled.button`
  margin: 20px auto 10px auto;
  background-color: #165a74;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 50vw;
  cursor: pointer;
`;

export const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export const ButtonSubmitCenter = styled.button`
  margin: 20px auto 10px auto;
  background-color: #165a74;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 50vw;
  cursor: pointer;
`;

export const P = styled.p`
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
`;

export const Button = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    border: 1px solid #2d79f3;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: #151717;
    font-weight: 600;
  }
`;

export const BodyLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh; /* Garante que o corpo ocupe pelo menos 100% da altura da tela */
background: linear-gradient(to bottom, #165a74, #e1f4f6); /* Cor de fundo do corpo */
`;

export const NotificationsContainer = styled.div`
  min-width: 320px;
  max-width: 320px;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexShrink = styled.div`
  flex-shrink: 0;
`;

export const ErrorAlert = styled.div`
border-radius: 0.375rem;
padding: 0.5rem;
background-color: rgb(254, 242, 242);
z-index: 1000;
position: fixed;
top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const SuccessAlert = styled.div`
border-radius: 0.375rem;
padding: 0.5rem;
background-color: rgb(242, 254, 242);
z-index: 1000;
position: fixed;
top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const ErrorSvg = styled.div`
  color: #f87171;
  width: 1.25rem;
  height: 1.25rem;
`;

export const SuccessSvg = styled.div`
  color: #71f871;
  width: 1.25rem;
  height: 1.25rem;
`;

export const ErrorPromptHeading = styled.div`
  color: #991b1b;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
`;

export const SuccessPromptHeading = styled.div`
  color: #1b991b;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
`;

export const ErrorPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

export const ErrorPromptWrap = styled.div`
  margin-top: 0.5rem;
  color: #b91c1c;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const ErrorPromptList = styled.ul`
  padding-left: 1.25rem;
  margin-top: 0.25rem;
  list-style-type: disc;
`;

export const ImagemLogin = styled.div`
    img {
        width: 200px;
        height: 200px;
        z-index: 999;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const RegisterForm = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw; /* Alterado para ocupar a largura total */
  background-color: #e1f4f6;
  padding: 5%;
  border-radius: 20px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const pulse = keyframes`
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
`;

export const RegisterTitle = styled.div`
  font-size: 28px;
  color: #165a74;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;

  &::before, &::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #165a74;
  }

  &::before {
    width: 18px;
    height: 18px;
    background-color: #165a74;
  }

  &::after {
    width: 18px;
    height: 18px;
    animation: ${pulse} 1s linear infinite;
  }
`;

export const RegisterMessage = styled.div`
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
`;

export const RegisterSignin = styled.div`
  text-align: center;

  a {
    color: royalblue;

    &:hover {
      text-decoration: underline royalblue;
    }
  }
`;

export const RegisterFlex = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

export const RegisterLabel = styled.label`
  position: relative;

  .input {
    width: 90%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .input:focus + span, .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input:valid + span {
    color: green;
  }
`;

export const RegisterSubmit = styled.button`
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transition: 0.3s ease;

  &:hover {
    background-color: rgb(56, 90, 194);
  }
`;

export const RegisterRadioInputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 350px;
`;

export const RegisterRadioTile = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  min-height: 80px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #2260ff;
  }
`;

export const RegisterRadioTileWithMarginRight = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  min-height: 80px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
  margin-right: 10px;

  &:hover {
    border-color: #2260ff;
  }
`;

export const RegisterRadioTileIcon = styled.div`
  width: 2rem;
  height: 2rem;

  svg {
    width: 100%;
    height: 100%;
    fill: #494949;
  }
`;

export const RegisterRadioLabel = styled.span`
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
  font-size: 13px;
`;

export const RegisterRadioInput = styled.input`
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const RegisterRadioTileCheck = styled(RegisterRadioInput)`
  &:checked + ${RegisterRadioTile} {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
  }

  &:checked + ${RegisterRadioTile}::before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
  }

  &:checked + ${RegisterRadioTile} ${RegisterRadioTileIcon} svg {
    fill: #2260ff;
  }

  &:checked + ${RegisterRadioTile} ${RegisterRadioLabel} {
    color: #2260ff;
  }

  &:focus + ${RegisterRadioTile} {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
  }

  &:focus + ${RegisterRadioTile}::before {
    transform: scale(1);
    opacity: 1;
  }
`;

export const RegisterRadioTileBefore = styled.div`
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
`;

export const RegisterRadioTileHover = styled(RegisterRadioTile)`
  &:hover::before {
    transform: scale(1);
    opacity: 1;
  }
`;

export const LoadingSpinnerOverlay = styled.div`
position: fixed;
background: rgba(0,0,0,0.4);
top: 0;
left: 0;
width: 100%;
height: 100%;
color: white;
z-index: 1000;

display: flex;
align-items: center;
justify-content: center;
`;

export const LoadingSpinnerContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin: 30px auto;
  overflow: hidden;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  width: calc(100% - 9.9px);
  height: calc(100% - 9.9px);
  border: 5px solid transparent;
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 5s cubic-bezier(0.17, 0.49, 0.96, 0.79) infinite;
`;

export const NavBarButtonContainer = styled.div`
  display: flex;
  background-color: #165a74;
  width: 70vw;
  height: 5vh;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px, #165a74 5px 10px 15px;
  
  z-index: 999;
  position: fixed;
  bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);
`;

export const NavBarButton = styled.button`
  outline: 0 !important;
  border: 0 !important;
  width: 3vh;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all ease-in-out 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const NavBarIcon = styled.div`
  font-size: 20px;
`;

export const MedicList = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%; /* Alterado para ocupar a largura total */
  max-height: 205px;
  overflow: auto;
  background-color: #165a74;
  padding: 5%;
  border-radius: 20px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const RadioList = styled.div`
  .container {
    form {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }

    label {
      display: flex;
      cursor: pointer;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      margin-bottom: 0.375em;

      input {
        position: absolute;
        left: -9999px;
      }

      input:checked + span {
        background-color: #e1f4f6;
        color: #165a74;

        &:before {
          box-shadow: inset 0 0 0 0.4375em #165a74;
        }
      }

      span {
        display: flex;
        align-items: center;
        padding: 0.375em 0.75em 0.375em 0.375em;
        border-radius: 99em;
        transition: 0.25s ease;
        color: #e1f4f6;

        &:before {
          display: flex;
          flex-shrink: 0;
          content: "";
          background-color: #ffffff;
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          margin-right: 0.375em;
          transition: 0.25s ease;
          box-shadow: inset 0 0 0 0.125em #00005c;
        }
      }
    }
  }
`;

export const Vacina = styled.div`
    display: flex;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.375em;
    background-color: #e1f4f6;
    color: #165a74;
    padding: 0.375em 0.75em 0.375em 0.375em;
    max-width: fit-content;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    div {
      margin-left: 5px;
    }
`;

export const BodyPatientData = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh; /* Garante que o corpo ocupe pelo menos 100% da altura da tela */
background: linear-gradient(to bottom, #165a74, #e1f4f6); /* Cor de fundo do corpo */
padding-top: 4vh;
`;

export const ContainerPatientData = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%; /* Alterado para ocupar a largura total */
  overflow: auto;
  max-height: 510px;
  background-color: #165a74;
  padding: 5%;
  border-radius: 20px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const ListPatientsData = styled.div`
  .container {
    form {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }

    label {
      display: flex;
      cursor: pointer;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      margin-bottom: 0.375em;

      input {
        position: absolute;
        left: -9999px;
      }

      input:checked + span {
        background-color: #e1f4f6;
        color: #165a74;

        &:before {
          box-shadow: inset 0 0 0 0.4375em #165a74;
        }
      }

      span {
        display: flex;
        align-items: center;
        padding: 0.375em 0.75em 0.375em 0.375em;
        border-radius: 99em;
        transition: 0.25s ease;
        color: #e1f4f6;

        &:before {
          display: flex;
          flex-shrink: 0;
          content: "";
          background-color: #ffffff;
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          margin-right: 0.375em;
          transition: 0.25s ease;
          box-shadow: inset 0 0 0 0.125em #00005c;
        }
      }
    }
  }
`;

export const RegisterFormPatientData = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw; /* Alterado para ocupar a largura total */
  background-color: #e1f4f6;
  padding: 5%;
  padding-top: 2%;
  padding-bottom: 5%;
  border-radius: 20px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-top: 20px;
`;

export const Title = styled.div`
  font-size: 28px;
  color: #e1f4f6;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

export const TitlePatientData = styled.div`
  font-size: 20px;
  color: #165a74;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
`;


export const Data = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: -7%;
`;