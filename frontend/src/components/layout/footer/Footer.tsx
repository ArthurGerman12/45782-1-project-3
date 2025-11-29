import './Footer.css';

export default function Footer() {

    return (
        <footer className='Footer'>
            <div className="footer-brand">
                <span className="footer-logo">VACATION!</span>
                <p className="footer-tagline">Made with sun, sea, and clean code.</p>
            </div>
            <div className="footer-meta">
                <span>Server: {import.meta.env.VITE_REST_SERVER_URL}</span>
                <span className="footer-divider">•</span>
                <span>© {new Date().getFullYear()} Vacation</span>
            </div>
        </footer>
    );
}
