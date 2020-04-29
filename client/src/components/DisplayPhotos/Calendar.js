import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const Calendar = (props) => {
  const searchByDateQuery = useSelector((state) => state.searchByDate);
  const { setDate } = props;

  useEffect(() => {
    if (searchByDateQuery) {
      setDate([searchByDateQuery.query[0], searchByDateQuery.query[1]]);
    }
  }, [searchByDateQuery, setDate]);

  function clearDate() {
    props.setDate(new Date());
    props.clear();
  }
  return (
    <>
      <Flatpickr
        placeholder="Search by date taken"
        value={props.date}
        onChange={(date) => {
          props.updateCalendar(date);
        }}
        options={{
          mode: "range",
          maxDate: "today",
          altInput: true,
          dateFormat: "Y-m-d",
          disableMobile: "true",
        }}
      />
      <div className="ui small button" onClick={() => clearDate()}>
        <i className="close icon" />
      </div>
    </>
  );
};

export default Calendar;
/* 
<input
              type="date"
              value={searchByDate}
              onChange={(e) => updateCalendar(e)}
            />
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

class Calendar extends Component {
  state = {
    date: [new Date(), new Date()],
  };
  

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <DateRangePicker onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}

export default Calendar;
 */
