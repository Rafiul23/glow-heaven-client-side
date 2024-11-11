import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from 'react-router-dom';

const UpdateProducts = () => {

    const product = useLoaderData();

    const { _id, productImg, productName, brand_name, productType, price, description, rating } = product;

    const handleUpdateProduct = e =>{

        e.preventDefault();
        const form = e.target;
        const productImg = form.productImg.value;
        const productName = form.name.value;
        const brand_name = form.brand_name.value;
        const productType = form.type.value;
        const price = form.price.value;
        const description = form.description.value;
        const rating = form.rating.value;

        form.productImg.value = '';
        form.name.value = '';
        form.brand_name.value = '';
        form.type.value = '';
        form.price.value = '';
        form.description.value = '';
        form.rating.value = '';

        const updatedProduct = {
            productImg,
            productName,
            brand_name,
            productType,
            price,
            description,
            rating
        }

        fetch(`https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/product/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                toast.success('Product updated successfully');
            }
        })
    }

    return (
        <div className="my-20 w-3/4 p-4 bg-[#ff81c0] rounded-lg mx-auto text-center">

            <h2 className="text-3xl font-bold my-10 text-[#ffedc0]">Update {productName}</h2>

            <form onSubmit={handleUpdateProduct}>
                <input type="text" name="productImg" className="
                border mx-auto p-4 block my-4 w-3/4" defaultValue={productImg} placeholder="Product's Image URL" id="" />
                <br />
                <input type="text" name="name" className="border mx-auto p-4 block my-4 w-3/4" defaultValue={productName} placeholder="Product's name" id="" />
                <br />
                <input type="text" name="brand_name" defaultValue={brand_name} className="border mx-auto p-4 block my-4 w-3/4" 
                placeholder="Brand Name" id="" />
                <br />
                <input type="text" name="type" className="border mx-auto p-4 block my-4 w-3/4" defaultValue={productType} placeholder="Type: lipstick, perfume etc" id="" />
                <br />
                <input type="number" name="price" className="border mx-auto p-4 block my-4 w-3/4" defaultValue={price} placeholder="Price" id="" />
                <br />
                <input type="text" name="description" defaultValue={description} className="border mx-auto p-4 block my-4 w-3/4" placeholder="Short description" id="" />
                <br />
                <input type="number" name="rating" defaultValue={rating} className="border mx-auto p-4 block my-4 w-3/4" placeholder="Rating" id="" />
                <br />
                <input className="btn bg-[#ffedc0]" type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default UpdateProducts;