import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import "./styles.css";
import {FaBell} from 'react-icons/fa';

export default function Calendar({ value, onChange }) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function buildCalendar(date) {
    const a = [];

    const startDay = date.clone().startOf("month").startOf("week");
    const endDay = date.clone().endOf("month").endOf("week");

    const _date = startDay.clone().subtract(1, "day");

    while (_date.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => _date.add(1, "day").clone())
      );
    }
    return a;
  }

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }

  function installStyles(day) {
    if (isInstall(day)) return "installed";
    if (isNotInstall(day)) return "high";
    return "";
  }

  function hiddenStyles(day) {
    if (ishidden(day)) return "hidden";
    return "";
  }
  function isInstall(day) {
    //return axios if order is made is true , order.appointment_date === "this.day" is true.
  }

  function isNotInstall(day) {
    // return NULL for axios order order.length = 0 is true
  }

  function ishidden(day) {
    // return order.length === 0 on this day, install === 0, 
  }
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  return (
    <div className="calendar">
      <Header value={value} onChange={onChange} />

      <div className="body">
        <div className="day-dee">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => (
              <div
                key={di}
                className="day"
                onClick={() => {
                  if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);
                }}
              >
                <div className={installStyles(day)}>
                <div className="flex-column">
                  <div className={dayStyles(day)}>
                    {day.format("D").toString()}
                  </div> 
                  <div className="flex-container">
                    <div className={hiddenStyles(day)}><button type ="button" className="icon-button">
                      <FaBell />
                      <span className="icon-button_badge">2</span></button>
                    </div>                    
                    <div className={hiddenStyles(day)}><button type ="button" className="icon-button">
                      <FaBell />
                      <span className="icon-button_badge">2</span></button>
                    </div>
                    <div className={hiddenStyles(day)}><button type ="button" className="icon-button">
                      <FaBell />
                      <span className="icon-button_badge">2</span></button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
