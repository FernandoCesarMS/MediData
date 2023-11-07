import React, { useState, useEffect } from 'react';
import { FavoritePatient } from '../../App.styles'
import { getUserName } from '../../services/DatabaseService';
import remedio from '../../assets/remedio.jpg'


interface PatientProps {
    id: string;
}

function Medic({ id }: PatientProps) {
    const [userName, setUserName] = useState('');

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

    return (
        <FavoritePatient>
            <img src={remedio} alt="remedio" />
            <div>
                <h1>{userName}</h1>
            </div>
        </FavoritePatient>
    )
}

export default Medic;