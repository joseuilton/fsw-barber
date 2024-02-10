import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function getListHours(startTime: string, endTime: string, interval: number) {
    const startTimeSplit = startTime.split(":");
    const endTimeSplit = endTime.split(":");

    const startDate = setMinutes(
        setHours(new Date(), Number(startTimeSplit[0])),
        Number(startTimeSplit[1])
    );

    const endDate = setMinutes(
        setHours(new Date(), Number(endTimeSplit[0])),
        Number(endTimeSplit[1])
    );

    const hours = [];
    let currentTime = startDate;

    while (currentTime <= endDate) {
        hours.push(format(currentTime, "HH':'mm"));
        currentTime = addMinutes(currentTime, interval)
    }

    return hours;
}