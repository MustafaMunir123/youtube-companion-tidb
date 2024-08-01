import { redirect } from 'next/navigation';

import { publicRoutes } from '@/utils/routes';

// CAN REDITRCT TO LANDING PAGE IF WE HAVE IT READY
import { Landing } from '@/components';

export default async function Page() {
  redirect(`${publicRoutes.AUTH_SIGNIN}`);
  return <></>;
}
