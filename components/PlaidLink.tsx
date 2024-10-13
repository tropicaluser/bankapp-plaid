import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { Button } from "@/components/ui/button";
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })

    router.push('/');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const config: PlaidLinkOptions = {
    onSuccess,
    token,
  };

  const { open, ready } = usePlaidLink(config);


  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button onClick={() => open()} className="plaidlink-ghost">
          Connect bank
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          Connect bank
        </Button>
      )
    }
    </>
  );
};

export default PlaidLink;
