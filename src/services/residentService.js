// services/residentService.js
export function mockRegisterResident(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const residentNumber = `RES-${Date.now()}`; // unique number
      resolve({
        residentNumber,
        resident: { ...data, residentNumber } // <-- add residentNumber to resident
      });
    }, 1200);
  });
}
