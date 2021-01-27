import styled from 'styled-components';
import { shade } from 'polished';

interface HourProps {
  available: boolean;
  selected: boolean;
}

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #0b212b;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff7f39 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const HourSection = styled.div``;
export const HourSectionTitle = styled.h2`
  color: #ff7f39;
  margin: 12px 0;
`;
export const HourSectionContent = styled.div``;
export const HourButton = styled.button<HourProps>`
  box-shadow: 1px 1px 1px black;
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin-right: 20px;
  color: white;
  opacity: ${props => (props.available ? 1 : 0.3)};
  background: ${props => (props.selected ? '#FF7F39' : '#0B212B')};
`;

export const CreateAppointmentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
export const ContentUpperside = styled.div`
  display: flex;
  max-width: 930px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const ContentDownside = styled.div``;

export const Profile = styled.div`
  display: flex;

  > div {
    margin-right: 30px;
  }

  p {
    margin-top: 15px;
  }

  span {
    color: black;
    padding: 5px;
    background-color: #9fd356;
    border: 1px solid white;
  }
`;

export const CreateAppointmentButton = styled.button`
  margin-top: 50px;
  padding: 15px;

  border: none;
  width: 300px;
  align-self: center;
  background: #ff7f39;
  transition: 0.5s;
  border-radius: 3px;
  &:hover {
    background: ${shade(0.2, '#FF7F39')};
  }
`;
