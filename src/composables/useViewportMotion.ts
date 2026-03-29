import { computed, onBeforeUnmount, onMounted, ref, type CSSProperties, type Ref } from 'vue';

interface ViewportMotionState {
  readonly motionRef: Ref<HTMLElement | null>;
  readonly motionStyle: Readonly<Ref<CSSProperties>>;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const useViewportMotion = (): ViewportMotionState => {
  const motionRef = ref<HTMLElement | null>(null);
  const opacity = ref(1);
  const translateY = ref(0);
  const scale = ref(1);
  const isReducedMotionPreferred = ref(false);
  let animationFrameId = 0;

  const updateMotionState = (): void => {
    const element = motionRef.value;

    if (!element || typeof window === 'undefined') {
      return;
    }

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const normalizedDistance = clamp(Math.abs(elementCenter - viewportCenter) / (viewportHeight * 0.8), 0, 1);
    const direction = elementCenter >= viewportCenter ? 1 : -1;

    opacity.value = 1 - normalizedDistance * 0.6;
    translateY.value = normalizedDistance * 48 * direction;
    scale.value = 1 - normalizedDistance * 0.04;
  };

  const queueMotionUpdate = (): void => {
    if (animationFrameId !== 0) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(() => {
      animationFrameId = 0;
      updateMotionState();
    });
  };

  onMounted(() => {
    if (typeof window === 'undefined') {
      return;
    }

    isReducedMotionPreferred.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotionPreferred.value) {
      return;
    }

    updateMotionState();
    window.addEventListener('scroll', queueMotionUpdate, { passive: true });
    window.addEventListener('resize', queueMotionUpdate);
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('scroll', queueMotionUpdate);
    window.removeEventListener('resize', queueMotionUpdate);

    if (animationFrameId !== 0) {
      window.cancelAnimationFrame(animationFrameId);
    }
  });

  const motionStyle = computed<CSSProperties>(() => {
    if (isReducedMotionPreferred.value) {
      return {};
    }

    return {
      opacity: String(opacity.value),
      transform: `translate3d(0, ${translateY.value}px, 0) scale(${scale.value})`,
      transition: 'opacity 180ms linear, transform 180ms linear',
      willChange: 'opacity, transform'
    };
  });

  return {
    motionRef,
    motionStyle
  };
};
