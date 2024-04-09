'use client'
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react"
import dayjs from 'dayjs'
import { Dayjs } from "dayjs"

export default function DateTimeReserve({ onDateTimeChange }: { onDateTimeChange: Function }) {

    const [reserveDateTime, setReserveDateTime] = useState<Dayjs>(dayjs())

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                value={reserveDateTime}
                onChange={(value) => { setReserveDateTime(value as Dayjs); onDateTimeChange(value as Dayjs) }}
            />
        </LocalizationProvider>
    );
}