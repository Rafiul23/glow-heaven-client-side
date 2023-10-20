

const ProductCard = ({ product }) => {

    const { productImg, productName, brand_name, productType, price, description, rating } = product;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={productImg} className="w-[300px] h-[300px] mt-4"  /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p>Brand Name: {brand_name}</p>
                <p>Type: {productType}</p>
                <p>{description.slice(0,50)}</p>
                <p>Price: {price}</p>
                <p>Rating: {rating} / 5</p>
                <div className="card-actions">
                    <button className="btn bg-[#ff81c0]">Details</button>
                    <button className="btn bg-[#36aabe]">Update</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;