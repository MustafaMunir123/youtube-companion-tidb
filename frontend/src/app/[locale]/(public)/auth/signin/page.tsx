import { LeftPanel } from '@/ui-components';
import { AuthLayout } from '@/ui-layouts';

import { Signin } from '@/components';


export default async function Page() {
  return (
    <AuthLayout
      leftSide={<LeftPanel description={'Welcome To Youtube Companion, your personalized youtube study companion.'} />}
      rightSide={<Signin />}
    />
  );
}
