import { useNavigate } from 'react-router-dom';

interface NavigateOptions {
    route: string;
    params?: string;
    query?: Record<string, string>;
}

export const useNav = () => {
    const navigate = useNavigate();

    const navigateTo = ({ route, params, query }: NavigateOptions) => {
        let path = route;

        if (params) {
            path += `/${params}`;
        }

        if (query) {
            const queryString = new URLSearchParams(query).toString();
            path += `?${queryString}`;
        }

        navigate(path);
    };

    return navigateTo;
};
