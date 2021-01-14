import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';
import PrincipalHeader from '../../components/Header';

const AppointmentCreated: React.FC = () => {
  const { state } = useLocation<number>();
  console.log(state);
  const handleDate = useCallback(() => {
    console.log(state);
  }, [state]);

  const formattedDate = useMemo(() => {
    return format(state, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, [state]);
  return (
    <>
      <PrincipalHeader />
      <button
        type="button"
        onClick={() => {
          handleDate();
        }}
      >
        {formattedDate}
      </button>
    </>
  );
};

export default AppointmentCreated;
