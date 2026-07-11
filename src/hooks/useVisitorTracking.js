/**
 * useVisitorTracking — fires once per browser session to count a real visit
 * Uses sessionStorage to avoid double-counting on re-renders / hot reload
 */
import { useEffect } from 'react';
import { recordVisit } from '../utils/api';

const SESSION_KEY = 'nv_visit_recorded';

const useVisitorTracking = () => {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return; // already counted this session
    recordVisit()
      .then(() => sessionStorage.setItem(SESSION_KEY, '1'))
      .catch(() => {}); // silent fail — never break UX
  }, []);
};

export default useVisitorTracking;
