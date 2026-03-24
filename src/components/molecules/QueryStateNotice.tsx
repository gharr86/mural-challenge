type QueryStateNoticeProps = {
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
};

function QueryStateNotice({ isPending, isError, errorMessage }: QueryStateNoticeProps) {
  if (isPending) {
    return (
      <p role="status" aria-live="polite">
        Loading notes...
      </p>
    );
  }

  if (isError) {
    return (
      <p role="alert" aria-live="assertive">
        Failed to load notes: {errorMessage}
      </p>
    );
  }

  return null;
}

export default QueryStateNotice;
