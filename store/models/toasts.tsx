import { Toast } from '@types';
import { generateRandomString } from '@core/helpers/generateRandomString';

export type ToastsState = Array<Toast>;
type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastsModel = {
  state: ToastsState;
  reducers: {
    show: (
      state: ToastsState,
      toast: {
        content: string;
        variant: ToastType;
        tryAgain?: any;
        label?: string;
      }
    ) => ToastsState;
    hide: (state: ToastsState, id: string) => ToastsState;
    hideAll: (state: ToastsState) => ToastsState;
  };
};

export const toasts: ToastsModel = {
  state: [],
  reducers: {
    show: (
      state: any,
      toast: {
        content: string;
        variant: string;
        tryAgain?: any;
        label?: string;
      }
    ) => {
      const { content, variant = 'error', tryAgain, label = '' } = toast;

      return [
        ...state,
        {
          variant,
          content,
          id: generateRandomString(12),
          duration: 4000,
          tryAgain,
          label,
        },
      ];
    },
    hide: (state, id: string) => state.filter(t => t.id !== id),
    hideAll: () => [],
  },
};
