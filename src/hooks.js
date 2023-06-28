import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParamsWithLocal(initialValue = {}, localStorageKey) {
  function setInitialDate() {
    const dateFromLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    return dateFromLocalStorage || initialValue;
  }

  const [searchParams, setSearchParams] = useSearchParams(setInitialDate());

  useEffect(() => {
    const newObject = Array.from(searchParams.entries()).reduce(
      (acc, element) => {
        return { ...acc, [element[0]]: element[1] };
      },
      {}
    );

    localStorage.setItem(localStorageKey, JSON.stringify(newObject));
  }, [localStorageKey, searchParams]);

  return [searchParams, setSearchParams];
}

export function useLocalStorage(initialValue = {}, localStorageKey) {
  function setInitialDate() {
    const dateFromLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    return dateFromLocalStorage || initialValue;
  }

  const [value, setValue] = useState(setInitialDate());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
}
