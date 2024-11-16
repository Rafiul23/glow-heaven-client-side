import { FaTrashCan } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const { cart, refetch } = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart?.reduce((sum, item)=> sum = sum + parseFloat(item.price), 0 );

  const handleDeleteItem = (_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.delete(`/carts/${_id}`)
          .then(res =>{
              if(res.data.deletedCount > 0){
                  refetch();
                  Swal.fire({
                      title: "Deleted!",
                      text: "Your item has been deleted.",
                      icon: "success"
                    });
              }
          })
        
      }
    });
  }

  return (
    <>
    <h2 className="text-4xl text-center my-2 font-bold">My Cart</h2>
      <div className="my-4 flex justify-between p-4 bg-base-200">
        <h2 className="text-4xl text-center font-medium">
          Total Items: {cart?.length}
        </h2>
        <h2 className="text-4xl text-center font-medium">
          Total Price: ${totalPrice}{" "}
        </h2>
       {
         cart?.length ?  <Link to='/dashboard/payment'>
         <button className="btn bg-[#ffdbac] text-[#800]">Pay</button>
         </Link> :
        <button disabled className="btn bg-[#ffdbac] text-[#800]">Pay</button>
        
       }
      </div>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#ffdbac] text-[#800]">
            <tr>
              <th>
                SL No.
              </th>
              <th>Name of Item</th>
              <th>Customer Eamil</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.productImg} alt="product" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.productName}</div>
                    </div>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>$ {item.price}</td>
                <td>
                  <button onClick={()=> handleDeleteItem(item._id)} className="btn text-red-500">
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCart;
