"use client";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react"
import dayjs from 'dayjs'
import { Dayjs } from "dayjs"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimeReserve({ onDateTimeChange }: { onDateTimeChange: Function }) {

    const [reserveDateTime, setReserveDateTime] = useState<Dayjs>(dayjs())


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
          label="Select Date and Time"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          orientation="landscape"
          onChange={(value) => { setReserveDateTime(value as Dayjs); onDateTimeChange(value as Dayjs) }}
          disablePast
          sx={{ 
            width: '40%' ,
            

        }}
        />
        </LocalizationProvider>
    );
}
