import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { tw } from 'twind';
import { useCookies } from 'react-cookie';

interface TiktokRespnse {
  open_id: string;
  scope: string;
  access_token: string;
  expires_in: number;
  refresh_token: number;
  refresh_expires_in: number;
}

const Tiktok = () => {
  const router = useRouter();
  const { code } = router.query;

  const saveToken = (res: TiktokRespnse) => {
    const [cookies] = useCookies(['commentup_tk']);

    axios(`${process.env.API_URL}/v1/tiktok/add-token`, {
      method: 'post',
      headers: {
        Authorization: cookies.commentup_tk,
      },
      data: {
        id: res.open_id,
        token: res.access_token,
        refreshToken: res.refresh_token,
      },
    })
      .then((response: any) => response.json())
      .then((json) => {
        console.log('RESPONSE SAVE TOKEN ', json);
      });
  };

  const getToken = async () => {
    let url_access_token = 'https://open-api.tiktok.com/oauth/access_token/';
    url_access_token += `?client_key=${process.env.CLIENT_KEY}`;
    url_access_token += `&client_secret=${process.env.CLIENT_SECRET}`;
    url_access_token += `&code=${code}`;
    url_access_token += '&grant_type=authorization_code';

    const tokenResponse = await axios.post(url_access_token);
    console.log('tokenResponse ', tokenResponse);
    saveToken(tokenResponse.data);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <section className={tw('bg-white pb-6')}>
      <div className={tw('max-w-7xl mx-auto p-4 sm:p-6 lg:p-8')}>
        <div className={tw('container mx-auto px-6 p-6 bg-white')}>
          <div className={tw('mb-16 text-center')}>
            <h4 className={tw('text-base text-indigo-600 font-semibold tracking-wide uppercase')}>CommentUp</h4>
            <p className={tw('mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900')}>
              Tiktok was connected! please return to the application
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tiktok;
