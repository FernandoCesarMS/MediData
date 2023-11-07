import React, { useState, useEffect } from 'react';
import { MedicoFavorito } from '../../App.styles'
import { getUserName } from '../../services/DatabaseService';
import imagemAluno from '../../assets/imagemAluno.png'
import { useNavigate } from 'react-router-dom';


interface PatientProps {
    id: string;
    data: string;
    onClick?: () => void;
}

function Patient({ id, data, onClick }: PatientProps) {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = await getUserName(id);
                setUserName(name);
            } catch (error) {
                console.error('Erro ao obter o nome do usuário:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
        {userName && <MedicoFavorito key={id} onClick={handleClick}>
            <img src={imagemAluno} alt="imagemAluno" />
            <div>
                <h1><b>{userName}</b></h1>
                <h2>Último Compartilhamento: {data}</h2>
            </div>
        </MedicoFavorito>}
        </>
    )
}


export default Patient;