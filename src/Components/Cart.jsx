import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({cart, carts, setCarts}) => {

    const { _id, productImg, productName, brand_name, productType, price, description, rating } = cart;

    const handleDelete = (_id)=>{

        fetch(`http://localhost:5000/carts/${_id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                toast.success('Deleted from cart successfully');
                const remaining = carts.filter(el => el._id !== _id);
                setCarts(remaining);
            }
        })
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={productImg} className="w-[300px] h-[300px] mt-4"  /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p>Brand Name: {brand_name}</p>
                <p>Type: {productType}</p>
                <p>{description.slice(0,50)}</p>
                <p>Price: ${price}</p>
                <p>Rating: {rating} / 5</p>
                <div className="card-actions">
                   
                   <button onClick={()=> handleDelete(_id)} className="btn bg-red-500 w-full">Delete</button>
                   
                   
                </div>
            </div>
        </div>
    );
};

export default Cart;