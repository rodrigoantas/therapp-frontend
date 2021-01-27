import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import PrincipalHeader from '../../components/Header';

import { Content, ContentTitle, Therapist, TherapistList } from './styles';

import avatarnull from '../../assets/avatar-null.jpg';

export interface Therapist {
  id: string;
  name: string;
  avatar_url: string;
  price: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setTherapists(response.data);
    });
  }, []);
  return (
    <>
      <PrincipalHeader />
      <Content>
        <TherapistList>
          <ContentTitle>
            Encontre um terapeuta que seja a sua cara!
          </ContentTitle>
          {therapists.map(therapist => {
            const location = {
              pathname: '/createappointment',
              state: { therapist },
            };
            const avatar = therapist.avatar_url
              ? therapist.avatar_url
              : avatarnull;
            return (
              <Therapist to={location} key={therapist.id}>
                <div>
                  <img src={avatar} alt={therapist.name} />
                </div>
                <div>
                  <h2>{therapist.name}</h2>
                  <p>{therapist.description}</p>
                  {therapist.price && (
                    <span>
                      <p>Preço/hora: R${therapist.price}</p>
                    </span>
                  )}
                </div>
                <div>
                  <span>Agendar</span>
                </div>
              </Therapist>
            );
          })}
        </TherapistList>
      </Content>
    </>
  );
};

export default Dashboard;
