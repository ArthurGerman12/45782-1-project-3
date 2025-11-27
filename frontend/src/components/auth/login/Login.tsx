import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import './Login.css';
import type LoginModel from '../../../models/Login';
import authService from '../../../services/auth';
import AuthContext from '../auth/AuthContext';

export default function Login() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit } = useForm<LoginModel>();

    const authContext = useContext(AuthContext);

    async function submit(login: LoginModel) {
        try {
            setIsSubmitting(true);
            const { jwt } = await authService.login(login);
            authContext?.newJwt(jwt);
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='Login relative min-h-screen overflow-y-auto'>
            <div className='login-aurora login-aurora-one' aria-hidden />
            <div className='login-aurora login-aurora-two' aria-hidden />
            <div className='login-grid' aria-hidden />

            <div className='relative z-10 flex min-h-screen items-center justify-center px-6 py-10'>
                <div className='w-full max-w-5xl grid gap-10 lg:grid-cols-2 glass-wrapper'>
                    <section className='glass-card text-slate-50 space-y-6'>
                        <div className='inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 border border-white/20 text-sm tracking-wide backdrop-blur'>
                            <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                            Welcome back, traveler
                        </div>

                        <div>
                            <p className='text-sm uppercase tracking-[0.35em] text-emerald-200'>
                                plan your next escape
                            </p>
                            <h1 className='mt-3 text-4xl font-semibold leading-tight lg:text-5xl'>
                                Unlock curated trips, smarter budgets, and real-time inspiration.
                            </h1>
                            <p className='mt-4 text-lg text-slate-200/80 leading-relaxed'>
                                Sign in to sync itineraries, track live offers, and keep your favorite spots
                                at your fingertips with our AI-powered travel feed.
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
                                    login
                                </p>
                                <h2 className='text-2xl font-semibold text-white mt-1'>
                                    Continue your journey
                                </h2>
                            </div>
                            <div className='badge-pill'>Secure</div>
                        </div>

                        <form onSubmit={handleSubmit(submit)} className='mt-6 space-y-4'>
                            <label className='block space-y-2'>
                                <span className='text-sm text-slate-200/80'>Email</span>
                                <input
                                    placeholder='you@example.com'
                                    className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                    {...register('email')}
                                />
                            </label>

                            <label className='block space-y-2'>
                                <span className='text-sm text-slate-200/80'>Password</span>
                                <input
                                    placeholder='••••••••'
                                    type='password'
                                    className='w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/70 focus:outline-none transition-all'
                                    {...register('password')}
                                />
                            </label>

                            <div className='flex items-center justify-between text-sm text-slate-200/80'>
                                <div className='inline-flex items-center gap-2'>
                                    <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                                    <span>Stay signed in to sync new alerts</span>
                                </div>
                                <a className='font-semibold text-emerald-200 hover:text-white transition-colors' href='#'>
                                    Forgot?
                                </a>
                            </div>

                            <SpinnerButton
                                buttonText='Sign in'
                                loadingText='logging in'
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
