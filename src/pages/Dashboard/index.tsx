import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import PrincipalHeader from '../../components/Header';

export interface Therapist {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setTherapists(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <PrincipalHeader />
      <h1>Teste</h1>
      {therapists.map(therapist => {
        const location = {
          pathname: '/createappointment',
          state: { therapist },
        };
        return (
          <Link key={therapist.id} to={location}>
            <div>
              <p>{therapist.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Dashboard;
