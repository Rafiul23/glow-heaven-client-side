
import { useLoaderData } from 'react-router-dom';

const ProductDetails = () => {

    const product = useLoaderData();

    const { productImg, productName, brand_name, productType, price, description, rating } = product;

    return (
        <div className="card card-side bg-base-100 p-4 shadow-xl">
            <div className='flex-1'>
            <figure><img src={productImg} /></figure>
            </div>
            <div className="flex-1 card-body">
                <h2 className="card-title">{productName}</h2>
                <p>{brand_name}</p>
                <p>{productType}</p>
                <p>{description}</p>
                <p>Rating: {rating} / 5</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-[#ff81c0] w-full">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;