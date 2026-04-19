import type { ComponentProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

type QueryErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

export function QueryErrorBoundary({ onReset, ...props }: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          {...props}
          onReset={details => {
            onReset?.(details);
            reset();
          }}
        />
      )}
    </QueryErrorResetBoundary>
  );
}
