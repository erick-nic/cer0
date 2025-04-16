import React, { useEffect, useState } from "react";
import { IProducts } from "../../types/interface.products";
import style from "../../styles/navbar/products.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "../../components/labels";
import { pageBack } from "../../utils/handlers";
import { useProductNavigation } from "../../utils/nav-routes";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const location = useLocation();
  const {
    navigateToDetails,
    navigateToCreateProduct,
    navigateToUpdateProduct,
    navigateToDeleteProduct,
    navigateToReport,
    navigateToCreateCategory,
  } = useProductNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/get-products/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: IProducts[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className={style[ 'loading' ]}>Loading...</div>;
  if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;
  const isDetailsPage = location.pathname.includes('details');

  return (
    <div className={style[ 'products-page' ]}>
      {!isDetailsPage && (
        <div>
          <div className={style[ 'sub-menu' ]}>
            <Button onClick={() => navigateToCreateProduct(undefined)} value="Create Product" />
            <Button onClick={navigateToCreateCategory} value="Create category" />
            <Button onClick={navigateToReport} value="Report XLSX" />
            <Button onClick={pageBack} value="Back" />
          </div>
          <div className={style[ 'products-cards' ]}>
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  <img
                    src={product.images ? product.images[ 0 ] : undefined}
                    alt={product.description}
                    onClick={() => navigateToDetails(product?._id)}
                  />
                  <p>Name: {product.name}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Price: ${product.price}</p>
                  <div className={style[ 'buttons' ]}>
                    <Button onClick={() => navigateToUpdateProduct(product?._id)} value="Update" />
                    <Button onClick={() => navigateToDeleteProduct(product?._id)} value="Delete" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Products;