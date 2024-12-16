import SectionTitle from "../SectionTitle/SectionTitle";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://glow-heaven-server.vercel.app/products").then((res) =>
        res.json()
      ),
  });

  const handleDeleteItem = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        subHeading={"Update or delete?"}
        heading={"Manage your products"}
      ></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#ffdbac] text-[#800]">
            <tr>
              <th>SL No.</th>
              <th>Image</th>
              <th>Name of Item</th>
              <th>Price</th>
              <th>Update Product</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.productImg} alt="product" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.productName}</td>
                <td>$ {item.price}</td>
                <td>
                  <Link to={`/dashboard/updateProduct/${item?._id}`}>
                    <button className="btn bg-[#ffdbac] text-[#800]">
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn text-red-500"
                  >
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
