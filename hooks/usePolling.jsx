// // import { useEffect, useState } from "react";

// // const usePolling = (fetchData, interval) => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isPolling, setIsPolling] = useState(true);

// //   useEffect(() => {
// //     const fetchAndUpdate = async () => {
// //       if (!isPolling) return; // Exit if polling is disabled

// //       setLoading(true);
// //       try {
// //         const result = await fetchData();
// //         setData(result);
// //         setError(null); // Reset error on successful fetch
// //       } catch (err) {
// //         setError(err.message || "Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAndUpdate(); // Initial fetch
// //     const pollingInterval = setInterval(fetchAndUpdate, interval);

// //     return () => clearInterval(pollingInterval); // Cleanup on unmount
// //   }, [fetchData, interval, isPolling]);

// //   return { data, loading, error, setIsPolling };
// // };

// // export default usePolling;

// import { useEffect, useState } from "react";

// const usePolling = (fetchData, interval) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPolling, setIsPolling] = useState(true);

//   useEffect(() => {
//     const fetchAndUpdate = async () => {
//       if (!isPolling) return; // Exit if polling is disabled

//       console.log("Fetching data..."); // Log when fetching starts
//       setLoading(true);
//       try {
//         const result = await fetchData();
//         console.log("Data fetched:", result); // Log the fetched data
//         setData(result);
//         setError(null); // Reset error on successful fetch
//       } catch (err) {
//         console.error("Error fetching data:", err); // Log errors
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//         console.log("Loading state:", loading); // Log loading state
//       }
//     };

//     fetchAndUpdate(); // Initial fetch
//     const pollingInterval = setInterval(fetchAndUpdate, interval);

//     return () => {
//       clearInterval(pollingInterval); // Cleanup on unmount
//       console.log("Polling interval cleared"); // Log when interval is cleared
//     };
//   }, [fetchData, interval, isPolling]);

//   return { data, loading, error, setIsPolling };
// };

// export default usePolling;
// import { useEffect, useState } from "react";

// const usePolling = (fetchData, interval) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPolling, setIsPolling] = useState(true);

//   useEffect(() => {
//     let isMounted = true; // Track whether the component is mounted
//     let pollingInterval; // Store the interval ID for cleanup

//     const fetchAndUpdate = async () => {
//       if (!isPolling) return; // Exit if polling is disabled

//       setLoading(true);
//       try {
//         const result = await fetchData();
//         if (isMounted) {
//           // Check if the component is still mounted
//           setData(result);
//           setError(null); // Reset error on successful fetch
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Something went wrong");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAndUpdate(); // Initial fetch
//     pollingInterval = setInterval(fetchAndUpdate, interval);

//     return () => {
//       isMounted = false; // Cleanup function to set isMounted to false
//       clearInterval(pollingInterval); // Cleanup on unmount
//     };
//   }, [fetchData, interval, isPolling]);

//   return { data, loading, error, setIsPolling };
// };

// export default usePolling;

import { useEffect, useState } from "react";

const usePolling = (fetchData, interval) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      if (!isPolling) return; // Exit if polling is disabled

      setLoading(true);
      try {
        const result = await fetchData(); // Call the passed fetch function
        setData(result); // Update the data state
        setError(null); // Reset error on successful fetch
      } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdate(); // Initial fetch
    const pollingInterval = setInterval(fetchAndUpdate, interval); // Set up polling

    return () => {
      clearInterval(pollingInterval); // Cleanup on unmount
    };
  }, [fetchData, interval, isPolling]);

  return { data, loading, error, setIsPolling }; // Return the states and control function
};

export default usePolling;
