import { useEffect, useState } from 'react';
import './Feed.css';
import Spinner from '../../common/spinner/Spinner';
import useTitle from '../../hooks/use-title';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import useService from '../../hooks/use-service';
import FeedService from '../../../services/auth-aware/FeedService';
import Vacation from '../vacation/vacation';
import FollowingService from '../../../services/auth-aware/FollowingService';
import { init as feedInit } from "../../../redux/feed-slice";
import { init as followingInit } from "../../../redux/following-slice";
import useUserRole from '../../hooks/use-user-role';

export default function Feed() {
    useTitle('Feed');

    const feedVersion = useAppSelector(state => state.feedVersion.value);
    const feed = useAppSelector(state => state.feedSlice.vacations);
    const isNewContentAvailable = useAppSelector(state => state.feedSlice.isNewContentAvailable);
    const wholeState = useAppSelector(state => state); 

    const dispatch = useAppDispatcher();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const feedService = useService(FeedService);
    const followingService = useService(FollowingService);
    const role = useUserRole();

    console.log("Redux state:", wholeState);
    console.log("feedVersion:", feedVersion);

    useEffect(() => {
        (async () => {
            try {
                const feedFromServer = await feedService.getFeed();
                dispatch(feedInit(feedFromServer));

                if (role === 'user') {
                    const followedVacations = await followingService.getFollowing();
                    const followedIds = followedVacations.map(v => v.vacationId);
                    dispatch(followingInit(followedIds));
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [feedVersion]);

    async function refresh() {
        try {
            setIsRefreshing(true);
            const feedFromServer = await feedService.getFeed();
            dispatch(feedInit(feedFromServer));
        } catch (e) {
            alert(e);
        } finally {
            setIsRefreshing(false);
        }
    }

    return (
        <div className='Feed'>
            {feed.length > 0 && (
                <>
                    {isNewContentAvailable && (
                        <div className='info-box'>
                            you have new content available, please refresh
                            <SpinnerButton
                                buttonText='refresh'
                                loadingText='refreshing'
                                onClick={refresh}
                                isSubmitting={isRefreshing}
                            />
                        </div>
                    )}

                    {feed.map(vacation => (
                        <Vacation
                            key={vacation.vacationId}
                            vacation={vacation}
                        />
                    ))}
                </>
            )}

            {feed.length === 0 && <Spinner />}
        </div>
    );
}
