import { useEffect } from 'react';

const LinkedInWidget = ({ integrationRequest }: any) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'IN/UJPWidget';
    script.setAttribute('data-onintegrate', `${integrationRequest}`);
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default LinkedInWidget;
