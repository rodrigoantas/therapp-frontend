import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  is_therapist: boolean;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().min(6, 'No mínimo 6 digitos.'),
        });

        const is_therapist = inputRef.current?.checked;

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataTotal = { ...data, is_therapist };
        await api.post('/users', dataTotal);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const getErrors = getValidationErrors(err);

          formRef.current?.setErrors(getErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <h1>Therapp</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="Email" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <label htmlFor="is_therapist">
              {' '}
              voce é terapeuta?
              <input
                ref={inputRef}
                type="checkbox"
                name="is_therapist"
                id="is_therapist"
              />
            </label>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
