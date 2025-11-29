import { useEffect, useState } from 'react';
import './Feed.css';
import Spinner from '../../common/spinner/Spinner';
import useTitle from '../../hooks/use-title';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import { init } from '../../../redux/feed-slice';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import useService from '../../hooks/use-service';
import FeedService from '../../../services/auth-aware/FeedService';
import Vacation from '../vacation/vacation';
import FollowingService from '../../../services/auth-aware/FollowingService';
import { init as feedInit } from "../../../redux/feed-slice";
import { init as followingInit } from "../../../redux/following-slice";


export default function Feed() {

    useTitle('Feed');

    const feedService = useService(FeedService);

    const feed = useAppSelector(state => state.feedSlice.vacations);
    const isNewContentAvailable = useAppSelector(state => state.feedSlice.isNewContentAvailable);
    const dispatch = useAppDispatcher();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const followingService = useService(FollowingService);



useEffect(() => {
    (async () => {
        try {
            // load feed as usual
            if (feed.length === 0) {
                const feedFromServer = await feedService.getFeed();
                dispatch(feedInit(feedFromServer));
            }

            const followedVacations = await followingService.getFollowing();

            const followedIds = followedVacations.map(v => v.vacationId);

            dispatch(followingInit(followedIds));
            
        } catch (e) {
            console.log(e);
        }
    })();
}, [dispatch, feed.length]);



    async function refresh() {
        try {
            setIsRefreshing(true);
            const feedFromServer = await feedService.getFeed();
            dispatch(init(feedFromServer));
        } catch (e) {
            alert(e);
        } finally {
            setIsRefreshing(false);
        }
    }

    return (
        <div className='Feed'>
            {feed.length > 0 && <>

                {isNewContentAvailable && <div className='info-box'>
                    you have new content available, please refresh <SpinnerButton
                        buttonText='refresh'
                        loadingText='refreshing'
                        onClick={refresh}
                        isSubmitting={isRefreshing}
                    />
                </div>}

                {feed.map(vacation => <Vacation
                    key={vacation.vacationId}
                    vacation={vacation}
                />)}
            </>}

            {feed.length === 0 && <Spinner />}
        </div>
    );
}