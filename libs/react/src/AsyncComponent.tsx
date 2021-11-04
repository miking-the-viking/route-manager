import React, { lazy, Suspense } from 'react';

const AsyncComponent: React.FC<{
  Component: ReturnType<typeof lazy>;
}> = ({ Component, ...props }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  );
};

export default AsyncComponent;
