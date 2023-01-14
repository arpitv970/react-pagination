import { useEffect, useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const mxProdPerPage = 10;
    const totalPages = products.length / mxProdPerPage;

    const fetchProducts = async () => {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();

        if (data && data.products) {
            setProducts(data.products);
        }
    };

    const updatePage = (currentPage) => {
        if (
            currentPage >= 1 &&
            currentPage <= products.length &&
            currentPage !== page
        ) {
            setPage(currentPage);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className='text-center'>
            <h1 className='font-bold text-5xl'>Products</h1>
            {products.length > 0 && (
                <div className='grid grid-cols-3 gap-1'>
                    {products
                        .slice((page - 1) * mxProdPerPage, page * mxProdPerPage)
                        .map((prods) => {
                            return (
                                <div className='rounded-3xl m-auto mt-8 w-[60%] h-max cursor-pointer border-2 border-black hover:rounded-md transition-all duration-200 ease-in-out'>
                                    <img
                                        className='w-[80%] h-[15rem] mt-2 object-cover items-center justify-center m-auto'
                                        src={prods.thumbnail}
                                        alt={prods.description}
                                    />
                                    <p className='font-bold'>{prods.title}</p>
                                </div>
                            );
                        })}
                </div>
            )}
            {products.length > 0 && (
                <div className='flex flex-row w-[80%] justify-evenly items-center my-5 mx-auto'>
                    <span
                        className={
                            page === 1
                                ? 'scale-0 origin-center transition-all duration-100 ease'
                                : 'scale-100 origin-center transition-all duration-100 ease'
                        }
                    >
                        <BsArrowLeftCircle
                            className='cursor-pointer'
                            onClick={() => updatePage(page - 1)}
                            size='30'
                        />
                    </span>
                    {[...Array(totalPages)].map((_, i) => {
                        return (
                            <div
                                onClick={() => {
                                    updatePage(i + 1);
                                }}
                                className={`w-8 h-8 cursor-pointer border-2 border-black flex items-center justify-center my-auto rounded-md hover:rounded-xl transition-all duration-200 ease-in-out ${
                                    page === i + 1
                                        ? 'bg-gray-700 rounded-xl text-white'
                                        : ''
                                }`}
                                key={i}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                    <span
                        className={
                            page === totalPages
                                ? 'scale-0 origin-center transition-all duration-100 ease'
                                : 'scale-100 origin-center transition-all duration-100 ease'
                        }
                    >
                        <BsArrowRightCircle
                            className='cursor-pointer'
                            onClick={() => updatePage(page + 1)}
                            size='30'
                        />
                    </span>
                </div>
            )}
        </div>
    );
};

export default Product;
