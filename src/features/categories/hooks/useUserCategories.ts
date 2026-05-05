"use client";

import { useEffect, useState } from "react";
import getCategories from "../actions/getCategories";
import { UserCategory } from "../types";

export function useUserCategories() {
  const [categories, setCategories] = useState<UserCategory[]>([]);

  useEffect(() => {
    let cancelled = false;
    getCategories().then((res) => {
      if (!cancelled) setCategories(res.categories);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return categories;
}
