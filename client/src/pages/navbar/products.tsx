import React, { useEffect, useState } from "react";
import { IProducts } from "../../types/interface.products";
import style from "../../styles/navbar/products.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/labels";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (id: string | undefined) => {
    navigate(`/products/details/${id}`);
  }

  const createProducts = () => {
    navigate(`/products/create/`);
  }
  const updateProduct = (id: string | undefined) => {
    navigate(`/products/update/${id}`);
  }
  const deleteProduct = (id: string | undefined) => {
    navigate(`/products/delete/${id}`);
  }

  const generateReport = () => {
    navigate(`/products/reports/to-excel`);
  }

  const returnPage = () => {
    window.history.back();
  }

  const createCaregory = () => {
    navigate(`/products/create/category`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      // const getProducts: string = config.getProducts;
      try {
        const response = await fetch('http://localhost:3001/api/v1/get-products');
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
    }

    fetchProducts();
  }, []);

  if (loading) return <div className={style[ 'loading' ]}>Loading...</div>;
  if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;
  const isDetailsPage = location.pathname.includes('details');

  return (
    <div className={style[ 'products-page' ]}>
      {!isDetailsPage && (
        <div>
          <div className={style[ 'sub-menu' ]} >
            <Button
              onClick={createProducts}
              value="Create Product"
            />
            <Button
              onClick={createCaregory}
              value="Create category"
            />
            <Button
              onClick={generateReport}
              value="Create Product"
            />
            <Button
              onClick={returnPage}
              value="Back"
            />
          </div>
          <div className={style[ 'products-cards' ]}>
            <ul>
              {products.map((product) => (
                <li key={product._id} >
                  <img src={product.images ? product.images[ 0 ] : undefined}
                    alt={product.description}
                    onClick={() => handleClick(product?._id)} />
                  <p>Name: {product.name}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Price: ${product.price}</p>
                  <Button
                    onClick={() => updateProduct(product?._id)}
                    value="Update"
                  />
                  <Button
                    onClick={() => deleteProduct(product?._id)}
                    value="Delete"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Products;