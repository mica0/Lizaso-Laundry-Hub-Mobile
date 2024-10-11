import React, { useState } from "react";

export const useLoading = () => {
  const [customLoading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { customLoading, startLoading, stopLoading };
};
