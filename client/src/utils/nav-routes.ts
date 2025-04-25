import { useNav } from "../hooks/useNav";

export const useProductNavigation = () => {
  const navigateTo = useNav();

  const navigateToDetails = (id: string | undefined) => {
    navigateTo({ route: '/products/details', params: id });
  };

  const navigateToCreateProduct = (id: string | undefined) => {
    navigateTo({ route: '/products/create', params: id });
  };

  const navigateToUpdateProduct = (id: string | undefined) => {
    navigateTo({ route: '/products/update', params: id });
  };

  const navigateToDeleteProduct = (id: string | undefined) => {
    navigateTo({ route: '/products/delete', params: id });
  };

  const navigateToReport = () => {
    navigateTo({ route: '/products/reports/' });
  };

  const navigateToCreateCategory = () => {
    navigateTo({ route: '/products/create/category' });
  };

  return {
    navigateToDetails,
    navigateToCreateProduct,
    navigateToUpdateProduct,
    navigateToDeleteProduct,
    navigateToReport,
    navigateToCreateCategory,
  };
};