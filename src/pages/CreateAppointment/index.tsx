import React, { useCallback, useState, useEffect, useMemo } from 'react';

import { format } from 'date-fns';

import { useHistory, useLocation } from 'react-router-dom';

import DayPicker, { DayModifiers } from 'react-day-picker';
import PrincipalHeader from '../../components/Header';
import 'react-day-picker/lib/style.css';

import {
  Calendar,
  HourSection,
  HourSectionContent,
  HourSectionTitle,
  HourButton,
  Content,
  ContentDownside,
  ContentUpperside,
  CreateAppointmentButton,
  CreateAppointmentSection,
  Profile,
} from './styles';

import avatarnull from '../../assets/avatar-null.jpg';

import api from '../../services/api';

interface RouteParams {
  therapist: {
    id: string;
    avatar_url: string;
    name: string;
    price: string;
    description: string;
  };
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface DayAvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const history = useHistory();

  const { state } = useLocation<RouteParams>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [availability, setAvailability] = useState<DayAvailabilityItem[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${state.therapist.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, state.therapist.id]);

  useEffect(() => {
    api
      .get(`providers/${state.therapist.id}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, state.therapist.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const date = new Date(year, month, monthDay.day);
        return date;
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: state.therapist.id,
        date,
      });

      const location = {
        pathname: '/appointmentcreated',
        state: date.getTime(),
      };

      history.push(location);
    } catch {
      // eslint-disable-next-line no-alert
      alert('Erro ao criar agendamento.');
    }
  }, [selectedDate, selectedHour, state, history]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  return (
    <>
      <PrincipalHeader />
      <Content>
        <CreateAppointmentSection>
          <ContentUpperside>
            <Profile>
              <div>
                <img
                  src={
                    state.therapist.avatar_url
                      ? state.therapist.avatar_url
                      : avatarnull
                  }
                  alt={state.therapist.name}
                />
              </div>
              <div>
                <h1>{state.therapist.name}</h1>
                <p>{state.therapist.description}</p>
                <p>
                  Preço por hora: &nbsp;
                  <span> RS$ {state.therapist.price}</span>
                </p>
              </div>
            </Profile>

            <Calendar>
              <DayPicker
                weekdaysShort={['D', 'S', 'T', 'q', 'Q', 'S', 'S']}
                fromMonth={new Date()}
                disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                modifiers={{
                  available: { daysOfWeek: [1, 2, 3, 4, 5] },
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                onMonthChange={handleMonthChange}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ]}
              />
            </Calendar>
          </ContentUpperside>
          <ContentDownside>
            <HourSection>
              <h1>Horários</h1>
              <HourSectionTitle>Manhã</HourSectionTitle>
              <HourSectionContent>
                {morningAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <HourButton
                      disabled={!available}
                      selected={selectedHour === hour}
                      available={available}
                      onClick={() => handleSelectHour(hour)}
                      key={hourFormatted}
                    >
                      {hourFormatted}
                    </HourButton>
                  ),
                )}
              </HourSectionContent>
            </HourSection>
            <HourSection>
              <HourSectionTitle>Tarde</HourSectionTitle>
              <HourSectionContent>
                {afternoonAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <HourButton
                      disabled={!available}
                      selected={selectedHour === hour}
                      available={available}
                      onClick={() => handleSelectHour(hour)}
                      key={hourFormatted}
                    >
                      {hourFormatted}
                    </HourButton>
                  ),
                )}
              </HourSectionContent>
            </HourSection>
          </ContentDownside>
          <CreateAppointmentButton
            type="button"
            onClick={() => handleCreateAppointment()}
          >
            Criar Agendamento
          </CreateAppointmentButton>
        </CreateAppointmentSection>
      </Content>
    </>
  );
};

export default CreateAppointment;
