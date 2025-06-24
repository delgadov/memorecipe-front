export function usePagination<T>(data: Ref<T[]>, itemsPerPage: number, maxButtonsVisible: number, currentPage: Ref<number>) {
    const totalPages = computed(() => {
        return Math.ceil(data.value.length / itemsPerPage);
    });

    const paginationRange = computed(() => {
        const maxButtons = maxButtonsVisible;
        const current = currentPage.value;
        const total = totalPages.value;

        let start = Math.max(1, current - Math.floor(maxButtons / 2));
        let end = start + maxButtons - 1;

        if (end > total) {
            end = total;
            start = Math.max(1, end - maxButtons + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    });

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return data.value.slice(start, start + itemsPerPage)
    });

    const goToPage = (page: number): void => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    }

    return {
        paginationRange,
        paginatedItems,
        goToPage,
    }
}