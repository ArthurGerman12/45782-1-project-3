import './Footer.css';

export default function Footer() {

    return (
        <div className='Footer'>
            (c) copyrights Vacation!!!!! |Server address: {import.meta.env.VITE_REST_SERVER_URL}
        </div>
    );
}