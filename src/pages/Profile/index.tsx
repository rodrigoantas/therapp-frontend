import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { AvatarInput, Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import avatarnull from '../../assets/avatar-null.jpg';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  price: string;
  description: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();
  const avatar = user.avatar_url ? user.avatar_url : avatarnull;

  useEffect(() => {
    if (user.is_therapist && inputRef.current) {
      inputRef.current.checked = true;
    }
  }, [user.is_therapist, inputRef]);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const is_therapist = inputRef.current?.checked;

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail válido.'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
          description: Yup.string(),
          price: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          price: data.price || undefined,
          is_therapist,
          description: data.description || undefined,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso.!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const getErrors = getValidationErrors(err);

          formRef.current?.setErrors(getErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do pefil..',
          description:
            'Ocorreu um erro ao realziar a atualização! Tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado',
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            description: user.description || '',
            price: user.price || '',
            is_therapist: user.is_therapist,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={avatar} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="Email" />

          <div className="is_therapist">
            <label htmlFor="is_therapist">
              Você é terapeuta?
              <input
                ref={inputRef}
                type="checkbox"
                name="is_therapist"
                id="is_therapist"
              />
            </label>
          </div>

          {user.is_therapist && (
            <>
              <Input name="description" placeholder="Descrição" />
              <Input name="price" placeholder="Preço" />
            </>
          )}

          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            type="password"
            placeholder="Senha atual"
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
          />

          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirmar nova senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
