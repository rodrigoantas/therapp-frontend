import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Container type="button" {...props}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default button;