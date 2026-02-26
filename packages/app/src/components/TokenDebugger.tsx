import { useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { keycloakAuthApiRef } from '../apis';

export const TokenDebugger = () => {
  const auth = useApi(keycloakAuthApiRef);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const idToken = await auth.getIdToken();
        if (idToken) {
          setTimeout(() => {
            console.log(idToken);
          }, 1000);
        }
      } catch (error) {
        console.error('Token fetch failed:', error);
      }
    };

    fetchToken();
  }, [auth]);

  return null;
};
