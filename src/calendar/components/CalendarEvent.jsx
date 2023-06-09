import { useMemo } from "react";

export const CalendarEvent = ({ event }) => {


  const { title, user } = useMemo(()=> event);

  return (
    <>
      <strong>{title}</strong>
      <br/>
      <strong> - Creado por: {user.name}</strong>
    </>
  );
};
