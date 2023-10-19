

const AddProducts = () => {

    const handleAddProduct = e =>{

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
    }

    return (
        <div className="my-20 w-3/4 p-4 bg-[#ff81c0] rounded-lg mx-auto text-center">

            <h2 className="text-3xl font-bold my-10 text-[#ffedc0]">Add Your Products</h2>

            <form onSubmit={handleAddProduct}>
                <input type="text" name="productImg" className="
                border mx-auto p-4 block my-4 w-3/4" placeholder="Product's Image URL" id="" />
                <br />
                <input type="text" name="name" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Product's name" id="" />
                <br />
                <input type="text" name="brand_name" className="border mx-auto p-4 block my-4 w-3/4" 
                placeholder="Brand Name" id="" />
                <br />
                <input type="text" name="type" className="border mx-auto p-4 block my-4 w-3/4"  placeholder="Type: lipstick, perfume etc" id="" />
                <br />
                <input type="number" name="price" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Price" id="" />
                <br />
                <input type="text" name="description" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Short description" id="" />
                <br />
                <input type="number" name="rating" className="border mx-auto p-4 block my-4 w-3/4" placeholder="Rating" id="" />
                <br />
                <input className="btn bg-[#ffedc0]" type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProducts;