import { useCallback } from "preact/hooks";

/**
 * Hook to focus element when it is mounted or if `shouldFocus` changes.
 *
 * @param shouldFocus - Whether to focus the element automatically.
 * @returns CallbackRef for the input or textarea element.
 *
 * ```tsx
 * const MyComponent = () => {
 *   const callbackRef = useFocus(true);
 *   return <input ref={callbackRef} type="text" />
 * }
 * ```
 */
export const useFocus = (shouldFocus: boolean) => {
  return useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (el && shouldFocus) {
        el.focus();
      }
    },
    [shouldFocus],
  );
};
