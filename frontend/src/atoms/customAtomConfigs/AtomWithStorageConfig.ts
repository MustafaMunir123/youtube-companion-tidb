import { isLocalStorageAvailable } from "@/utils/helpers";
import { AsyncStorage } from "jotai/vanilla/utils/atomWithStorage";

export class AtomWithStorageConfig<T> implements AsyncStorage<T> {
  getItem(key: string, initialValue: T) {
    try {
      if (isLocalStorageAvailable()) return JSON.parse(localStorage.getItem(key) ?? '')
    } catch {
      return initialValue
    }
  }
  setItem(key: string, newValue: T): any {
    if (isLocalStorageAvailable()) localStorage.setItem(key, JSON.stringify(newValue))
  }
  removeItem(key: string): any {
    if (isLocalStorageAvailable()) localStorage.removeItem(key)
  }
  subscribe(key: string, callback: (value: T) => void, initialValue: T): any {
    if (
      typeof window === 'undefined' ||
      typeof window.addEventListener === 'undefined' ||
      !isLocalStorageAvailable()
    ) {
      return;
    }
    window.addEventListener('storage', (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        let newValue
        try {
          newValue = JSON.parse(e.newValue ?? '')
        } catch {
          newValue = initialValue
        }
        callback(newValue)
      }
    });
  }
};
