import React from 'react';

import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Container, Header, HeaderContent, Profile, Buttons } from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import avatarnull from '../../assets/avatar-null.jpg';

const PrincipalHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const avatar = user.avatar_url ? user.avatar_url : avatarnull;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <img src={logoImg} alt="GoBarber" />
          </Link>

          <Profile>
            <img src={avatar} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <Buttons>
            {user.is_therapist && (
              <Link to="/appointments">
                <button type="button">
                  <FaRegCalendarAlt />
                </button>
              </Link>
            )}
            <Link to="/profile">
              <button type="button">
                <CgProfile />
              </button>
            </Link>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Buttons>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default PrincipalHeader;
