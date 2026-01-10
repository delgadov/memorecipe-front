import { type Ref, onMounted, onUnmounted } from 'vue';

export const useHorizontalScroll = (el: Ref<HTMLElement | null>) => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleWheel = (e: WheelEvent) => {
        if (!el.value) return;
        if (e.deltaY !== 0) {
            e.preventDefault();
            el.value.scrollLeft += e.deltaY;
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        if (!el.value) return;
        isDown = true;
        startX = e.pageX - el.value.offsetLeft;
        scrollLeft = el.value.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDown || !el.value) return;
        e.preventDefault();
        const x = e.pageX - el.value.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier: 2 = faster scroll
        el.value.scrollLeft = scrollLeft - walk;
    };

    onMounted(() => {
        const container = el.value;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
    });

    onUnmounted(() => {
        const container = el.value;
        if (!container) return;

        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
    });
};