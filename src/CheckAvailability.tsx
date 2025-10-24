import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  startOfWeek, endOfWeek, addMonths, subMonths,
  isBefore, startOfToday, isSameMonth, isAfter,
  differenceInCalendarDays, isWithinInterval
} from "date-fns";
type BookingCalendarProps = {
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDatesChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
};
import dayjs from "dayjs";

const BookingCalendar: React.FC = ({ dates, onDatesChange }) => {
  const today = React.useMemo(() => startOfToday(), []);

  const [checkIn, setCheckIn] = useState<Date | null>(
    dates[0] ? dates[0].toDate() : null
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    dates[1] ? dates[1].toDate() : null
  );

  // whenever checkIn/checkOut change, update parent
  useEffect(() => {
    onDatesChange([
      checkIn ? dayjs(checkIn) : null,
      checkOut ? dayjs(checkOut) : null,
    ]);
  }, [checkIn, checkOut]);


  // const nights = differenceInCalendarDays(checkOut, checkIn);
  const handleDateClick = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    const isAvailable = availableDates.includes(dayStr);
    const isPast = isBefore(day, today);

    if (!isAvailable || isPast) return; // skip invalid days

    // Step 1: No check-in yet
    if (!checkIn) {
      setCheckIn(day);
      setCheckOut(null);
    }
    // Step 2: Check-in set, check-out not yet
    else if (checkIn && !checkOut) {
      if (isAfter(day, checkIn)) {
        // ✅ validate all days between checkIn and selected day
        const allDaysBetween = eachDayOfInterval({ start: checkIn, end: day });
        const allAvailable = allDaysBetween.every(d =>
          availableDates.includes(format(d, "yyyy-MM-dd"))
        );

        if (allAvailable) {
          setCheckOut(day);
        } else {
          alert("Some dates between check-in and check-out are unavailable!");
        }
      } else {
        // clicked before check-in → reset and start over
        setCheckIn(day);
        setCheckOut(null);
      }
    }
    // Step 3: both set → start new selection
    else {
      setCheckIn(day);
      setCheckOut(null);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      maxWidth: "980px",
      padding: "40px 40px 60px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    title: {
      fontSize: "32px",
      fontWeight: "500",
      color: "#1a1a1a",
      marginBottom: "40px",
      textAlign: "center",
      letterSpacing: "-0.5px",
    },
    calendarsContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "0px",
      marginBottom: "60px",
    },
    calendarWrapper: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "8px",
      flex: "1",
      minWidth: "320px",
      maxWidth: "380px",
    },
    calendarHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    monthTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1a1a1a",
      margin: 0,
      textAlign: "center",
      flex: 1,
    },
    navButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#1a1a1a",
      padding: "4px 8px",
      lineHeight: "1",
      transition: "color 0.2s ease",
    },
    navButtonDisabled: {
      opacity: 0.3,
      cursor: "not-allowed",
    },
    weekDays: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "6px",
      marginBottom: "10px",
    },
    weekDay: {
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "600",
      color: "#6b7280",
      padding: "6px 0",
    },
    daysGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "6px",
    },
    day: {
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.15s",
      backgroundColor: "#e87c7c",
      color: "#1a1a1a",
      border: "1px solid #e87c7c",
    },
    disabledDay: {
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      borderRadius: "6px",
      backgroundColor: "#f3f4f6",
      color: "#9ca3af",
      border: "1px solid #e5e7eb",
      cursor: "not-allowed",
    },
    emptyDay: {
      aspectRatio: "1",
    },
  };

  const [currentDate, setCurrentDate] = useState(today);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const goToPreviousMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  // Fetch data when currentDate changes
  useEffect(() => {
    const nextMonth = addMonths(currentDate, 1);

    const rangeFromDate = isSameMonth(currentDate, today)
      ? format(today, "yyyy-MM-dd")
      : format(startOfMonth(currentDate), "yyyy-MM-dd");

    const rangeToDate = format(endOfMonth(nextMonth), "yyyy-MM-dd");

    console.log("📡 Fetching availability from", rangeFromDate, "to", rangeToDate);

    setLoading(true);

    axios
      .get("http://localhost:8000/property/api/check-availability", {
        params: {
          range_from: rangeFromDate,
          range_to: rangeToDate,
        },
      })
      .then((res) => {
        setApiData(res.data);

        const pricesArray = res.data?.priceList?.prices?.price || [];
        const uniqueDates = Array.from(
          new Set<string>(pricesArray.map((p: any) => p.checkInDate))
        );

        console.log("✅ Unique Dates Extracted:", uniqueDates);
        setAvailableDates(uniqueDates);
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, [currentDate, today]);

  const renderCalendar = (date: Date, showNext: boolean = false) => {
    // Get all days to display (including days from prev/next month to fill grid)
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const disablePrevButton = !showNext && isSameMonth(date, today);

    return (
      <div style={styles.calendarWrapper}>
        <div style={styles.calendarHeader}>
          {!showNext && (
            <button
              style={{
                ...styles.navButton,
                ...(disablePrevButton ? styles.navButtonDisabled : {}),
              }}
              onClick={!disablePrevButton ? goToPreviousMonth : undefined}
              disabled={disablePrevButton}
            >
              ‹
            </button>
          )}
          <h2 style={styles.monthTitle}>
            {format(date, "MMMM yyyy")}
          </h2>
          {showNext && (
            <button style={styles.navButton} onClick={goToNextMonth}>
              ›
            </button>
          )}
        </div>

        <div>
          <div style={styles.weekDays}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
              <div key={d} style={styles.weekDay}>
                {d}
              </div>
            ))}
          </div>
          <div style={styles.daysGrid}>
            {days.map((day, idx) => {
              const dayString = format(day, "yyyy-MM-dd");
              const isPast = isBefore(day, today);
              const isCurrentMonth = isSameMonth(day, date);
              const isAvailable = availableDates.includes(dayString);

              if (!isCurrentMonth) return <div key={idx} style={styles.emptyDay} />;

              let dayStyle = { ...styles.disabledDay };

              if (!isPast && isAvailable) {
                dayStyle = { ...styles.day, backgroundColor: "#fca5a5", borderColor: "#dc2626" };

                // Highlight check-in and check-out
                if (checkIn && format(day, "yyyy-MM-dd") === format(checkIn, "yyyy-MM-dd")) {
                  dayStyle = { ...dayStyle, backgroundColor: "#e5fca5ff", color: "#1a1a1a" };
                }

                if (checkOut && format(day, "yyyy-MM-dd") === format(checkOut, "yyyy-MM-dd")) {
                  dayStyle = { ...dayStyle, backgroundColor: "#e5fca5ff", color: "#1a1a1a" };
                }

                // Highlight the range in between
                if (checkIn && checkOut && isWithinInterval(day, { start: checkIn, end: checkOut })) {
                  dayStyle = { ...dayStyle, backgroundColor: "#e5fca5ff", borderColor: "#34d399" };
                }
              }

              return (
                <div
                  key={idx}
                  style={dayStyle}
                  onClick={() => handleDateClick(day)}
                  title={isAvailable ? "Available" : "Unavailable"}
                >
                  {format(day, "d")}
                </div>
              );
            })}


          </div>
        </div>
      </div>
    );
  };

  const nextMonth = addMonths(currentDate, 1);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Check Availability and Book</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {checkIn && !checkOut && <p>Check-in: {format(checkIn, "dd MMM yyyy")}</p>}
        {checkIn && checkOut && (
          <p>
            🏨 {format(checkIn, "dd MMM")} → {format(checkOut, "dd MMM")}
            {" — "} {differenceInCalendarDays(checkOut, checkIn)} nights
          </p>
        )}
      </div>


      {loading && <p>Loading availability...</p>}
      {apiData && (
        <p>
          ✅ Data fetched successfully for {format(currentDate, "MMMM")} -{" "}
          {format(nextMonth, "MMMM")}
        </p>
      )}

      <div style={styles.calendarsContainer}>
        {renderCalendar(currentDate, false)}
        {renderCalendar(nextMonth, true)}
      </div>
    </div>
  );
};

export default BookingCalendar;