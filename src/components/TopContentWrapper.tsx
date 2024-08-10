export const TopContentWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return <div className="sm:w-3/5 mx-auto px-5 sm:px-0">{props.children}</div>;
};
