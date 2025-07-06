export function useScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const lastScrollY = ref(0);
    const showScrollToTop = ref(false);

    function handleScroll() {
        let scrollY = window.scrollY;
        showScrollToTop.value = scrollY > 50;
        lastScrollY.value = scrollY;
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    return {
        scrollToTop,
        showScrollToTop
    }
}