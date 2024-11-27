import SectionTitle from "../SectionTitle/SectionTitle";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AddReviews = () => {
    const [rating, setRating] = useState(0);
    const {user} = useAuth();
    const name = user.displayName;
    const email = user.email;
    const image = user.photoURL;
    const axiosPublic = useAxiosPublic();

    const handleAddReview = e =>{
        e.preventDefault();
        const details = e.target.details.value;
        const reviewData = {
            email,
            name,
            image,
            rating,
            details
        };
        axiosPublic.post('/reviews', reviewData)
        .then(res =>{
            if(res.data.insertedId){
                e.target.details.value = '';
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Your review has been added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    } 

    return (
        <div>
            <SectionTitle
            subHeading={'Are you satisfied?'}
            heading={'give us your reviw'}
            ></SectionTitle>
            <form className="space-y-4" onSubmit={handleAddReview}>
            <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
            <textarea className="textarea textarea-bordered textarea-lg w-full" name="details" placeholder="Your comment" id=""></textarea>
            <button className="btn py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">Add Review</button>
            </form>
        </div>
    );
};

export default AddReviews;