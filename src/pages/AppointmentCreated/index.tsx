import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { format } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';
import { Content } from './styles';

import PrincipalHeader from '../../components/Header';

const AppointmentCreated: React.FC = () => {
  const { state } = useLocation<number>();

  const formattedDate = useMemo(() => {
    return format(state, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, [state]);
  return (
    <>
      <PrincipalHeader />
      <Content>
        <h1>Parabéns!</h1>
        <h2>Você concluiu um agendamento!</h2>
        <h1>Ela será {formattedDate}.</h1>

        <IoMdCheckmarkCircleOutline size={500} color="#9fd356" />

        <Link to="/">
          <button type="button">Voltar para Dashboard</button>
        </Link>
      </Content>
    </>
  );
};

export default AppointmentCreated;
