import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useProductNavigation } from "../../utils/nav-routes";
import style from "../../styles/pages/pages.module.css";
import { Button } from "../../components/labels";
import { pageBack } from "../../utils/handlers";
import useFetchData from "../../hooks/useFetchData";
import { IProducts } from "../../types/interface.products";
import Cards from "../../components/cards";

const Products: React.FC = () => {
    const location = useLocation();
    const isDetailsPage = location.pathname.includes('details');
    const isReportPage = location.pathname.includes('report');
    const {
        navigateToDetails,
        navigateToCreateProduct,
        navigateToUpdateProduct,
        navigateToDeleteProduct,
        navigateToReport,
        navigateToCreateCategory,
    } = useProductNavigation();

    const { data, error, loading } = useFetchData<IProducts>('http://localhost:3001/api/v1/get-products/');

    return (
        <div className={style[ 'pages' ]}>
            {!isDetailsPage && !isReportPage && !isReportPage && (
                <div>
                    <div>
                        <Button onClick={() => navigateToCreateProduct(undefined)} value="Create Product" />
                        <Button onClick={navigateToCreateCategory} value="Create category" />
                        <Button onClick={navigateToReport} value="Report XLSX" />
                        <Button onClick={pageBack} value="Back" />
                    </div>
                    {loading && (
                        <Cards>
                            <p>Loading...</p>
                        </Cards>
                    )}
                    {error && (
                        <Cards>
                            {error}
                        </Cards>
                    )}
                    {data && (
                        <div className={style[ 'cards-container' ]}>
                            {data.map((data: IProducts) => (
                                <Cards key={data._id}>
                                    <img
                                        src={data.images ? data.images[ 0 ] : undefined}
                                        alt={data.description}
                                        onClick={() => navigateToDetails(data?._id)}
                                    />
                                    <p>{data.name}</p>
                                    <p>${data.price}</p>
                                    <div className={style[ 'buttons' ]}>
                                        <Button onClick={() => navigateToUpdateProduct(data?._id)} value="Update" />
                                        <Button onClick={() => navigateToDeleteProduct(data?._id)} value="Delete" />
                                    </div>
                                </Cards>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default Products;