import { useNavigate } from 'react-router-dom';
import type VacationModel from '../../../models/Vacation';
import './feed.css';
// import { useAppDispatcher } from '../../../redux/hooks';
// import { deletePost } from '../../../redux/profile-slice';
// import useService from '../../../hooks/use-service';

interface VacationProps {
    vacation: VacationModel,
    isEditAllowed: boolean
    isNew?: boolean
}

export default function Vacation(props: VacationProps) {

    const {
        description,
        destination,
        startAt,
        endAt,
        price,
        vacationId,
        imageUrl
    } = props.vacation;

    const { isEditAllowed } = props;

    const navigate = useNavigate();

    // const dispatch = useAppDispatcher();

    async function removeMe() {
        ({})
        // try {
        //     // if (confirm('are you sure?')) {
        //     //     await profileService.remove(id);
        //     //     dispatch(deletePost(id));
        //     }
        // } catch (e) {
        //     // alert(e);
        // }
    }

    function editMe() {
        navigate(`/follows/update-vacation/${vacationId}`);
    }

    // const className = `Post ${isNew ? 'new-post' : ''}`;
    const className = `blblb`;

    return (
        <div className={className}>
            <div><h3>{destination}</h3></div>
            <div>{(new Date(startAt)).toLocaleDateString()} - {(new Date(endAt)).toLocaleDateString()}</div>
            <div>{description}</div>
            <div>{price}</div>
            {imageUrl && <div><img src={`${import.meta.env.VITE_S3_URL}${imageUrl}`} /></div>}
            {/* conditional rendering (render something depending on a boolean value):  */}
            {isEditAllowed && <div>
                <button onClick={removeMe}>Delete</button><button onClick={editMe}>Edit</button>
            </div>}
        </div>
    );
}