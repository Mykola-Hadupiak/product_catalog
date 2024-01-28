export const getLink = (
  color :string,
  category: string,
  id: string,
  capacity :string,
) => {
  const path = `/${category}/`;
  const lastPart = `${id}-${capacity
    .toLowerCase()}-${color.split(' ').join('-')}`;

  return path + lastPart;
};
