import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type VacationModel from '../../../models/Vacation';
import './vacation.css';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import { follow, unfollow } from '../../../redux/following-slice';
import useService from '../../hooks/use-service';
import FollowService from '../../../services/auth-aware/FollowingService';
import AdminService from '../../../services/auth-aware/AdminService';
import { deleteVacation } from '../../../redux/admin-slice';
import { bump } from '../../../redux/feedVersion-slice';
import useUserRole from '../../hooks/use-user-role';
import Swal from "sweetalert2";

interface VacationProps {
    vacation: VacationModel;
    isNew?: boolean;
}

export default function Vacation(props: VacationProps) {
    const { vacation } = props;
    const {
        vacationId,
        description,
        destination,
        startDate,
        endDate,
        price,
        image,
        likesCount
    } = vacation;

    const role = useUserRole();
    const isEditAllowed = role === "admin";

    const navigate = useNavigate();
    const dispatch = useAppDispatcher();
    const followService = useService(FollowService);
    const adminService = useService(AdminService);

    const following = useAppSelector(state => state.followingSlice.following);
    const isFollowed = following.includes(vacationId);
    const [likes, setLikes] = useState(isEditAllowed ? 0 : likesCount);

    async function toggleFollow() {
        if (isEditAllowed) return;

        const delta = isFollowed ? -1 : 1;
        setLikes(prev => Math.max(0, prev + delta));

        try {
            if (isFollowed) {
                await followService.unfollow(vacationId);
                dispatch(unfollow(vacationId));
            } else {
                await followService.follow(vacationId);
                dispatch(follow(vacationId));
            }
        } catch (e: any) {
            setLikes(prev => Math.max(0, prev - delta));
            if (e.response?.status === 422 && e.response.data.message === "follow already exists") {
                dispatch(follow(vacationId));
            }
            console.log(e);
        }
    }

    function editMe() {
        navigate(`/edit-vacation/${vacationId}`);
    }



    async function deleteMe() {
        const res = await Swal.fire({
            title: "Delete Vacation?",
            text: `Are you sure you want to delete “${destination}”?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Delete",
        });

        if (res.isConfirmed) {
            await adminService.remove(vacationId);
            dispatch(deleteVacation(vacationId));
            dispatch(bump());
            Swal.fire("Deleted!", "The vacation was removed.", "success");
        }
    }


    return (
        <div className="vacation-card">
            <div className="vacation-media">
                {image ? (
                    <img src={`${image}?v=${Date.now()}`} alt={destination} loading="lazy" />
                ) : (
                    <div className="vacation-media__placeholder">
                        <span>No image available</span>
                    </div>
                )}
            </div>

            <div className="vacation-content">
                <div className="vacation-header">
                    <div>
                        <p className="vacation-destination">{destination}</p>
                        <p className="vacation-dates">
                            {new Date(startDate).toLocaleDateString()} –{' '}
                            {new Date(endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="vacation-price">{price}$</div>
                </div>

                <p className="vacation-description">{description}</p>

                <div className="vacation-actions">

                    {!isEditAllowed && (
                        <button
                            className={`chip like-button ${isFollowed ? 'liked' : ''}`}
                            onClick={toggleFollow}
                        >
                            <span className="heart" aria-hidden="true">&#10084;</span>
                            <span className="likes-count">{likes}</span>
                        </button>
                    )}

                    {isEditAllowed && (
                        <div className="edit-actions">
                            <button className="ghost delete-button" onClick={deleteMe}>Delete</button>
                            <button className="ghost" onClick={editMe}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
