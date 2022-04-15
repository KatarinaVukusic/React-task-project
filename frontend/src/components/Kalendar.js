import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "./kalendar.css";

const Kalendar = ({ obaveza }) => {
  const locales = {
    hr: require("date-fns/locale/hr"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <Calendar
      localizer={localizer}
      events={obaveza}
      titleAccessor="sadrzaj"
      startAccessor="datum"
      endAccessor="datum"
      views={["month", "agenda"]}
      style={{ height: 500, margin: "50px" }}
    />
  );
};

export default Kalendar;
