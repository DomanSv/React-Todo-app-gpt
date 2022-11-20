export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const RESPONSE_DELAY = import.meta.env.MODE !== "test" ? Number(import.meta.env.REACT_APP_MOCK_RESPONSE_DELAY) : 0;
