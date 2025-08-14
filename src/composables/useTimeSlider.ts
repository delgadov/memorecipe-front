export function useTimeSlider(min: number, max: number, step: number, modelValueInit: number = 0) {
    const currentTimeValue = ref(modelValueInit);
    const numberOfLabels = computed(() => {
        const result = [];
        for (let i = min; i <= max; i += step) {
            result.push(i);
        }
        return result;
    });

    watch(currentTimeValue, (newCurrentTime) => {
        if (newCurrentTime > max) currentTimeValue.value = max;
        else if (newCurrentTime < min) currentTimeValue.value = min;
    });

    return {
        currentTimeValue,
        numberOfLabels,
    }
}