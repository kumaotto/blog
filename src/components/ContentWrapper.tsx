export const ContentWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return <div className="sm:w-4/5 mx-auto px-5 sm:px-0">{props.children}</div>;
};
