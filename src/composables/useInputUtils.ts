export const useInputUtils = () => {
    const errorMessage = ref<string | null>(null);
    const previousValue = ref<any | null>(null);

    const selectAll = (event: FocusEvent | MouseEvent) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        if (target && typeof target.select === 'function') {
            target?.select();
        }
    }

    const sanitizeNumeric = (event: Event) => {
        const target = event.target as HTMLInputElement;

        let cleaned = target.value.replace(/[^0-9]/g, '');

        if (target.value !== cleaned) {
            target.value = cleaned;
            target.dispatchEvent(new Event('input'));
        }
    };

    const checkMinimum = (event: Event, min: number, message: string) => {
        const target = event.target as HTMLInputElement;

        let cleaned = target?.value.replace(/[^0-9]/g, '');
        let num = parseInt(cleaned);
        if (num < min) {
            event.preventDefault();
            errorMessage.value = message;
        }
    }

    const checkMaximum = (event: Event, max: number, message: string) => {
        const target = event.target as HTMLInputElement;
        const key = (event as KeyboardEvent).key;

        if (key === 'Backspace' || key === 'Delete') {
            errorMessage.value = null;
            return;
        }

        const currentValue = target.value;
        const selectionStart = target.selectionStart || 0;
        const selectionEnd = target.selectionEnd || 0;

        let newValue: string;
        if (key && key.length === 1) {
            newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
        } else {
            return;
        }

        const cleaned = newValue.replace(/[^0-9]/g, '');
        const num = parseInt(cleaned);

        if (!isNaN(num) && num > max) {
            event.preventDefault();
            errorMessage.value = message;
        } else {
            errorMessage.value = null;
        }
    }

    const checkMinimum = (event: Event, min: number, message: string) => {
        const target = event.target as HTMLInputElement;
        const key = (event as KeyboardEvent).key;

        if (key === 'Backspace' || key === 'Delete') {
            errorMessage.value = null;
            return;
        }

        const currentValue = target.value;
        const selectionStart = target.selectionStart || 0;
        const selectionEnd = target.selectionEnd || 0;

        let newValue: string;
        if (key && key.length === 1) {
            newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
        } else {
            return;
        }

        const cleaned = newValue.replace(/[^0-9]/g, '');
        const num = parseInt(cleaned);

        if (!isNaN(num) && num > min) {
            event.preventDefault();
            errorMessage.value = message;
        } else {
            errorMessage.value = null;
        }
    }


    const scientificNotation = ['e', 'E'];
    const signs = ['+', '-'];
    const blockNonNumeric = (event: any) => {
        const val = event.key || event.data;
        if (val && (scientificNotation.includes(val) || signs.includes(val))) {
            event.preventDefault();
        }
    }

    return {
        selectAll,
        sanitizeNumeric,
        blockNonNumeric,
        checkMinimum,
        checkMaximum,
        errorMessage,
    };
}