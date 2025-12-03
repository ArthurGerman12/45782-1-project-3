import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import '../login/Login.css';
import './signup.css';
import type SignUpData from '../../../models/SignUp';
import authService from '../../../services/auth';
import AuthContext from '../auth/AuthContext';
import UserContext from '../../../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import type { UserJwtPayload } from '../../../models/UserJwtPayload';

type SignUpFormData = SignUpData & { confirmPassword: string };

export default function SignUp() {
    const { setUser } = useContext(UserContext)!;
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<SignUpFormData>();

    const authContext = useContext(AuthContext);

    function handleInvalid() {
        setErrorMessage('Please complete all required fields.');
    }

    async function submit(form: SignUpFormData) {
        if (form.password !== form.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage(null);
            const { confirmPassword, ...payload } = form;
            const { jwt } = await authService.signup(payload);
            authContext?.newJwt(jwt);
            const decoded = jwtDecode<UserJwtPayload>(jwt);
            setUser(decoded);
            navigate('/feed');
        } catch (e: any) {
            const message = e?.response?.data?.message || 'Sign up failed. Please try again.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='Login Signup relative min-h-screen overflow-y-auto'>
            <div className='login-aurora login-aurora-one' aria-hidden />
            <div className='login-aurora login-aurora-two' aria-hidden />
            <div className='login-grid' aria-hidden />

            <div className='relative z-10 flex min-h-screen items-center justify-center px-6 py-10'>
                <div className='w-full max-w-5xl grid gap-10 lg:grid-cols-2 glass-wrapper'>
                    <section className='glass-card text-slate-50 space-y-6'>
                        <div className='inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 border border-white/20 text-sm tracking-wide backdrop-blur'>
                            <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                            New here? Join the crew
                        </div>

                        <div>
                            <p className='text-sm uppercase tracking-[0.35em] text-emerald-200'>
                                design your escape
                            </p>
                            <h1 className='mt-3 text-4xl font-semibold leading-tight lg:text-5xl'>
                                Build your travel profile and unlock curated adventures.
                            </h1>
                            <p className='mt-4 text-lg text-slate-200/80 leading-relaxed'>
                                Create an account to save itineraries, follow destinations, and get live alerts
                                tailored to the way you wander.
                            </p>
                        </div>

                        <div className='grid gap-3 sm:grid-cols-3'>
                            <div className='highlight-tile'>
                                <p className='text-xs text-emerald-200 uppercase tracking-wide'>Destinations</p>
                                <p className='text-3xl font-semibold'>120+</p>
                                <p className='text-sm text-slate-200/70'>fresh drops weekly</p>
                            </div>
                            <div className='highlight-tile'>
                                <p className='text-xs text-emerald-200 uppercase tracking-wide'>Travelers</p>
                                <p className='text-3xl font-semibold'>48k</p>
                                <p className='text-sm text-slate-200/70'>community members</p>
                            </div>
                            <div className='highlight-tile'>
                                <p className='text-xs text-emerald-200 uppercase tracking-wide'>Savings</p>
                                <p className='text-3xl font-semibold'>18%</p>
                                <p className='text-sm text-slate-200/70'>avg. per trip</p>
                            </div>
                        </div>
                    </section>

                    <section className='glass-card form-card'>
                        <div className='flex items-start justify-between gap-3'>
                            <div>
                                <p className='text-xs uppercase tracking-[0.3em] text-emerald-200'>
                                    sign up
                                </p>
                                <h2 className='text-2xl font-semibold text-white mt-1'>
                                    Start planning with us
                                </h2>
                            </div>
                            <div className='badge-pill'>Secure</div>
                        </div>

                        <form onSubmit={handleSubmit(submit, handleInvalid)} className='mt-6 space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <label className='block space-y-2'>
                                    <span className='text-sm text-slate-200/80'>First name</span>
                                    <input
                                        placeholder='Ava'
                                        className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                        {...register('firstName', { required: true })}
                                    />
                                </label>
                                <label className='block space-y-2'>
                                    <span className='text-sm text-slate-200/80'>Last name</span>
                                    <input
                                        placeholder='Rivera'
                                        className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                        {...register('lastName', { required: true })}
                                    />
                                </label>
                            </div>

                            <label className='block space-y-2'>
                                <span className='text-sm text-slate-200/80'>Email</span>
                                <input
                                    placeholder='you@example.com'
                                    className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                    {...register('email', { required: true })}
                                />
                            </label>

                            <label className='block space-y-2'>
                                <span className='text-sm text-slate-200/80'>Password</span>
                                <input
                                    placeholder='Create a password'
                                    type='password'
                                    className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                    {...register('password', { required: true })}
                                />
                            </label>

                            <label className='block space-y-2'>
                                <span className='text-sm text-slate-200/80'>Confirm password</span>
                                <input
                                    placeholder='Re-enter your password'
                                    type='password'
                                    className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                    {...register('confirmPassword', { required: true })}
                                />
                            </label>

                            <div className='flex items-center justify-between text-sm text-slate-200/80'>
                                <div className='inline-flex items-center gap-2'>
                                    <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                                    <span>Early alerts, curated for you</span>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => navigate('/')}
                                    className='font-semibold text-emerald-200 hover:text-white transition-colors'
                                >
                                    Back to login
                                </button>
                            </div>

                            {errorMessage && (
                                <div className='error-banner' role='alert'>
                                    {errorMessage}
                                </div>
                            )}

                            <SpinnerButton
                                buttonText='Create account'
                                loadingText='Creating'
                                isSubmitting={isSubmitting}
                                className='w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-4 py-3 font-semibold text-slate-900 shadow-[0_16px_70px_-30px_rgba(16,185,129,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_90px_-30px_rgba(14,165,233,0.85)] focus:outline-none focus:ring-4 focus:ring-emerald-200/60 active:translate-y-0'
                            />
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
