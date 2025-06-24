export const useTimeFormat = () => {
    const formatMinutesAsHoursAndMinutes = (minutes: number): string => {
        const hours = Math.floor((minutes / 60));

        if (hours == 0) {
            return minutes + "m";
        }

        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
            return hours + "h";
        }

        return hours + "hr " + remainingMinutes + "min";
    }

    return {
        formatMinutesAsHoursAndMinutes
    }
}